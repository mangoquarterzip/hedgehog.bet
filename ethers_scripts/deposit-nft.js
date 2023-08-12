//UNDER is represented by 0
//OVER is represented by 1


// total of 3 things to change 
document.addEventListener('DOMContentLoaded', () => {
    const depositNFTButton = document.getElementById('deposit-nft');
    // change the function name here                    change the id finder here
    depositNFTButton.addEventListener('click', depositNFT);
});
async function depositNFT() {
    if (!deployedContractAddress) {
        console.error('Contract address not available');
        return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const contractABI = [
        {
            "inputs": [],
            "name": "accept",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "tokenAddress",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "depositERC20",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "nftAddress",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "depositNFT",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "joinBet",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "lock",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "resolveBet",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "enum PeerToPeerHedging.Outcome",
                    "name": "prediction",
                    "type": "uint8"
                }
            ],
            "name": "startBet",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_chainlinkOracle",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_threshold",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "currentBet",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "alice",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "bob",
                    "type": "address"
                },
                {
                    "internalType": "enum PeerToPeerHedging.Outcome",
                    "name": "aliceOutcomePrediction",
                    "type": "uint8"
                },
                {
                    "internalType": "enum PeerToPeerHedging.BetStatus",
                    "name": "status",
                    "type": "uint8"
                },
                {
                    "internalType": "bool",
                    "name": "aliceLocked",
                    "type": "bool"
                },
                {
                    "internalType": "bool",
                    "name": "bobLocked",
                    "type": "bool"
                },
                {
                    "internalType": "bool",
                    "name": "accepted",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "depositedNFTs",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "depositedTokens",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "deposits",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getLatestPrice",
            "outputs": [
                {
                    "internalType": "int256",
                    "name": "",
                    "type": "int256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "nftDeposits",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "THRESHOLD",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]; // Contract ABI Array
    const contractAddress = deployedContractAddress; // Contract address

    const contract = new ethers.Contract(contractAddress, contractABI, provider.getSigner());

    try {
        const result = await contract.depositNFT("0x5270bfC224357Cbf7EB76C8fbBb5D49fD4b86934","1");
        //change the function anme here
        console.log(result);
    } catch (error) {
        console.error('Error calling contract function:', error);
    }
}