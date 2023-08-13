// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity >=0.8.0;


import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IMessageRecipient} from "./IMessageRecipient.sol";
import {IInterchainSecurityModule, ISpecifiesInterchainSecurityModule} from "./IInterchainSecurityModule.sol";

contract TestRecipient is
    Ownable,
    IMessageRecipient,
    ISpecifiesInterchainSecurityModule
{
    IInterchainSecurityModule public override interchainSecurityModule;
    bytes32 public lastSender;
    bytes public lastData;

    address public lastCaller;
    string public lastCallMessage;

    event ReceivedMessage(
        uint32 indexed origin,
        bytes32 indexed sender,
        string message
    );

    event ReceivedCall(address indexed caller, uint256 amount, string message);

    function handle(
        uint32 _origin,
        bytes32 _sender,
        bytes calldata _data
    ) external virtual override {
        emit ReceivedMessage(_origin, _sender, string(_data));
        lastSender = _sender;
        lastData = _data;
    }

    function fooBar(uint256 amount, string calldata message) external {
        emit ReceivedCall(msg.sender, amount, message);
        lastCaller = msg.sender;
        lastCallMessage = message;
    }

    function setInterchainSecurityModule(address _ism) external onlyOwner {
        interchainSecurityModule = IInterchainSecurityModule(_ism);
    }

    enum BetStatus { NOT_SET, ONGOING, RESOLVED }
    enum Outcome { ABOVE, BELOW }

    struct Bet {
        address alice;
        address bob;
        Outcome aliceOutcomePrediction;
        BetStatus status;
        bool aliceLocked;
        bool bobLocked;
        bool accepted;
    }

    Bet public currentBet;
    uint256 public THRESHOLD;
    
    mapping(address => mapping(address => uint256)) public deposits; // ERC20 deposits by participant and token
    mapping(address => mapping(address => uint256[])) public nftDeposits; // NFT deposits by participant and token address

    AggregatorV3Interface internal nftFloorPriceFeed;

    address[] public depositedTokens; // track the ERC20 tokens deposited
    address[] public depositedNFTs;   // track the NFT tokens deposited

    constructor(address _chainlinkOracle, uint256 _threshold) {
        nftFloorPriceFeed = AggregatorV3Interface(_chainlinkOracle);
        THRESHOLD = _threshold;
    }

    function startBet(Outcome prediction) external {
        require(currentBet.status == BetStatus.NOT_SET, "Existing bet in progress");
        currentBet.alice = msg.sender;
        currentBet.aliceOutcomePrediction = prediction;
        currentBet.status = BetStatus.ONGOING;
    }

    function joinBet() external {
        require(currentBet.status == BetStatus.ONGOING, "No bet in progress");
        require(currentBet.bob == address(0), "Bob already set");
        currentBet.bob = msg.sender;
    }

    function depositERC20(address tokenAddress, uint256 amount) external {
        require(msg.sender == currentBet.alice || msg.sender == currentBet.bob, "Not a bet participant");
        require(IERC20(tokenAddress).transferFrom(msg.sender, address(this), amount), "Transfer failed");
        deposits[msg.sender][tokenAddress] += amount;

        // Add the token address to our tracking list if not already there
        bool alreadyDeposited = false;
        for (uint i = 0; i < depositedTokens.length; i++) {
            if (depositedTokens[i] == tokenAddress) {
                alreadyDeposited = true;
                break;
            }
        }
        if (!alreadyDeposited) {
            depositedTokens.push(tokenAddress);
        }
    }

    function depositNFT(address nftAddress, uint256 tokenId) external {
        require(msg.sender == currentBet.alice || msg.sender == currentBet.bob, "Not a bet participant");
        IERC721(nftAddress).transferFrom(msg.sender, address(this), tokenId);
        nftDeposits[msg.sender][nftAddress].push(tokenId);

        // Track NFTs as well
        bool alreadyDepositedNFT = false;
        for (uint i = 0; i < depositedNFTs.length; i++) {
            if (depositedNFTs[i] == nftAddress) {
                alreadyDepositedNFT = true;
                break;
            }
        }
        if (!alreadyDepositedNFT) {
            depositedNFTs.push(nftAddress);
        }
    }

    function lock() external {
        require(msg.sender == currentBet.alice || msg.sender == currentBet.bob, "Not a bet participant");
        if(msg.sender == currentBet.alice) {
            currentBet.aliceLocked = true;
        } else {
            currentBet.bobLocked = true;
        }
    }

    function accept() external {
        require(msg.sender == currentBet.alice, "Only Alice can accept the bet");
        currentBet.accepted = true;
    }

    function resolveBet() external {
        require(currentBet.status == BetStatus.ONGOING, "Bet not in progress");
        require(currentBet.aliceLocked && currentBet.bobLocked, "Both participants must lock the bet");
        require(currentBet.accepted, "Bet must be accepted by Alice");
        // this is Alice'sc, need to require that msg that bob has locked has been recieved
        
        int latestPrice = getLatestPrice();
        require(latestPrice > 0, "Invalid price from oracle");

        currentBet.status = BetStatus.RESOLVED;

        address winner;
        if (currentBet.aliceOutcomePrediction == Outcome.ABOVE) {
            winner = uint256(latestPrice) >= THRESHOLD ? currentBet.alice : currentBet.bob;
        } else {
            winner = uint256(latestPrice) < THRESHOLD ? currentBet.alice : currentBet.bob;
        }

        // Transfer ERC20 deposits to winner
        for (uint i = 0; i < depositedTokens.length; i++) {
            address token = depositedTokens[i];
            uint256 amountAlice = deposits[currentBet.alice][token];
            uint256 amountBob = deposits[currentBet.bob][token];

            uint256 totalAmount = amountAlice + amountBob;
            if (totalAmount > 0) {
                require(IERC20(token).transfer(winner, totalAmount), "Failed to transfer ERC20");
                deposits[currentBet.alice][token] = 0;
                deposits[currentBet.bob][token] = 0;
            }
        }
        depositedTokens = new address[](0);  // reset the list

        // Transfer NFT deposits to winner
        for (uint i = 0; i < depositedNFTs.length; i++) {
            address nftToken = depositedNFTs[i];
            uint256[] memory nftListAlice = nftDeposits[currentBet.alice][nftToken];
            for (uint j = 0; j < nftListAlice.length; j++) {
                IERC721(nftToken).transferFrom(address(this), winner, nftListAlice[j]);
            }
            delete nftDeposits[currentBet.alice][nftToken];

            uint256[] memory nftListBob = nftDeposits[currentBet.bob][nftToken];
            for (uint j = 0; j < nftListBob.length; j++) {
                IERC721(nftToken).transferFrom(address(this), winner, nftListBob[j]);
            }
            delete nftDeposits[currentBet.bob][nftToken];
        }
        depositedNFTs = new address[](0); // reset the list

        // Resetting bet
        delete currentBet;
    }

    function getLatestPrice() public view returns (int) {
        (, int price,,,) = nftFloorPriceFeed.latestRoundData();
        return price;
    }

}







