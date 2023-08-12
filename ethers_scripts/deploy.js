
let deployedContractAddress;
document.addEventListener('DOMContentLoaded', () => {
    const deployButton = document.getElementById('deploy');
    deployButton.addEventListener('click', deployContract);
});

async function deployContract() {
    // Connect to MetaMask's injected web3 provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // Load the contract ABI and bytecode
    const abi = [
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
    ]; // ABI Array
    const bytecode = '60806040523480156200001157600080fd5b5060405162002cb338038062002cb38339818101604052810190620000379190620000b5565b81600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600281905550505062000168565b600081519050620000988162000134565b92915050565b600081519050620000af816200014e565b92915050565b60008060408385031215620000c957600080fd5b6000620000d98582860162000087565b9250506020620000ec858286016200009e565b9150509250929050565b600062000103826200010a565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6200013f81620000f6565b81146200014b57600080fd5b50565b62000159816200012a565b81146200016557600080fd5b50565b612b3b80620001786000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c806393ea51401161008c5780639b5b9b18116100665780639b5b9b1814610211578063abb7a09b1461022d578063d504cb651461025d578063f83d08ba14610281576100ea565b806393ea5140146101a957806397648cee146101c557806397feb926146101f5576100ea565b8063785ffb37116100c8578063785ffb37146101335780638e15f473146101515780638f601f661461016f5780638fced6261461019f576100ea565b80632852b71c146100ef5780633106e50e146100f95780635204472d14610103575b600080fd5b6100f761028b565b005b61010161033d565b005b61011d6004803603810190610118919061223a565b6104dc565b60405161012a919061261a565b60405180910390f35b61013b61051b565b604051610148919061287f565b60405180910390f35b610159610521565b6040516101669190612704565b60405180910390f35b61018960048036038101906101849190612121565b6105d1565b604051610196919061287f565b60405180910390f35b6101a76105f6565b005b6101c360048036038101906101be9190612211565b6114a8565b005b6101df60048036038101906101da919061223a565b61165a565b6040516101ec919061261a565b60405180910390f35b61020f600480360381019061020a91906121ac565b611699565b005b61022b600480360381019061022691906121ac565b611a1b565b005b6102476004803603810190610242919061215d565b611d4e565b604051610254919061287f565b60405180910390f35b610265611d8c565b6040516102789796959493929190612635565b60405180910390f35b610289611e3d565b005b6000800160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461031d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103149061271f565b60405180910390fd5b6001600060010160186101000a81548160ff021916908315150217905550565b60016002811115610377577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600060010160159054906101000a900460ff1660028111156103c2577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b14610402576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103f9906127ff565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff16600060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610496576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161048d9061279f565b60405180910390fd5b33600060010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b600781815481106104ec57600080fd5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60025481565b600080600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663feaf968c6040518163ffffffff1660e01b815260040160a06040518083038186803b15801561058c57600080fd5b505afa1580156105a0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105c49190612263565b5050509150508091505090565b6003602052816000526040600020602052806000526040600020600091509150505481565b60016002811115610630577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600060010160159054906101000a900460ff16600281111561067b577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b146106bb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106b2906127df565b60405180910390fd5b600060010160169054906101000a900460ff1680156106e95750600060010160179054906101000a900460ff165b610728576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161071f9061283f565b60405180910390fd5b600060010160189054906101000a900460ff1661077a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107719061285f565b60405180910390fd5b6000610784610521565b9050600081136107c9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107c09061273f565b60405180910390fd5b6002600060010160156101000a81548160ff02191690836002811115610818577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b02179055506000806001811115610858577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600060010160149054906101000a900460ff1660018111156108a3577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b141561090b576002548210156108de57600060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16610904565b6000800160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff165b9050610968565b600254821061093f57600060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16610965565b6000800160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff165b90505b60005b600680549050811015610d74576000600682815481106109b4577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690506000600360008060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490506000600360008060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905060008183610b3991906128ab565b90506000811115610d5d578373ffffffffffffffffffffffffffffffffffffffff1663a9059cbb87836040518363ffffffff1660e01b8152600401610b7f9291906126db565b602060405180830381600087803b158015610b9957600080fd5b505af1158015610bad573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bd191906121e8565b610c10576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c07906127bf565b60405180910390fd5b6000600360008060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506000600360008060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b505050508080610d6c906129b3565b91505061096b565b50600067ffffffffffffffff811115610db6577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051908082528060200260200182016040528015610de45781602001602082028036833780820191505090505b5060069080519060200190610dfa929190611fc6565b5060005b60078054905081101561136657600060078281548110610e47577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690506000600460008060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805480602002602001604051908101604052809291908181526020018280548015610f6057602002820191906000526020600020905b815481526020019060010190808311610f4c575b5050505050905060005b8151811015611035578273ffffffffffffffffffffffffffffffffffffffff166323b872dd3087858581518110610fca577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101516040518463ffffffff1660e01b8152600401610ff0939291906126a4565b600060405180830381600087803b15801561100a57600080fd5b505af115801561101e573d6000803e3d6000fd5b50505050808061102d906129b3565b915050610f6a565b50600460008060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006110e29190612050565b6000600460008060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208054806020026020016040519081016040528092919081815260200182805480156111ce57602002820191906000526020600020905b8154815260200190600101908083116111ba575b5050505050905060005b81518110156112a3578373ffffffffffffffffffffffffffffffffffffffff166323b872dd3088858581518110611238577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101516040518463ffffffff1660e01b815260040161125e939291906126a4565b600060405180830381600087803b15801561127857600080fd5b505af115801561128c573d6000803e3d6000fd5b50505050808061129b906129b3565b9150506111d8565b50600460008060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006113509190612050565b505050808061135e906129b3565b915050610dfe565b50600067ffffffffffffffff8111156113a8577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280602002602001820160405280156113d65781602001602082028036833780820191505090505b50600790805190602001906113ec929190611fc6565b506000806000820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001820160146101000a81549060ff02191690556001820160156101000a81549060ff02191690556001820160166101000a81549060ff02191690556001820160176101000a81549060ff02191690556001820160186101000a81549060ff021916905550505050565b600060028111156114e2577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600060010160159054906101000a900460ff16600281111561152d577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b1461156d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016115649061281f565b60405180910390fd5b336000800160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600060010160146101000a81548160ff021916908360018111156115fe577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b02179055506001600060010160156101000a81548160ff02191690836002811115611652577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b021790555050565b6006818154811061166a57600080fd5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000800160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614806117475750600060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b611786576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161177d9061277f565b60405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff166323b872dd3330846040518463ffffffff1660e01b81526004016117c3939291906126a4565b602060405180830381600087803b1580156117dd57600080fd5b505af11580156117f1573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061181591906121e8565b611854576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161184b9061275f565b60405180910390fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546118e091906128ab565b925050819055506000805b6006805490508110156119ac578373ffffffffffffffffffffffffffffffffffffffff1660068281548110611949577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561199957600191506119ac565b80806119a4906129b3565b9150506118eb565b5080611a16576006839080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b505050565b6000800160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161480611ac95750600060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b611b08576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611aff9061277f565b60405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff166323b872dd3330846040518463ffffffff1660e01b8152600401611b45939291906126a4565b600060405180830381600087803b158015611b5f57600080fd5b505af1158015611b73573d6000803e3d6000fd5b50505050600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190806001815401808255809150506001900390600052602060002001600090919091909150556000805b600780549050811015611cdf578373ffffffffffffffffffffffffffffffffffffffff1660078281548110611c7c577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415611ccc5760019150611cdf565b8080611cd7906129b3565b915050611c1e565b5080611d49576007839080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b505050565b60046020528260005260406000206020528160005260406000208181548110611d7657600080fd5b9060005260206000200160009250925050505481565b60008060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160149054906101000a900460ff16908060010160159054906101000a900460ff16908060010160169054906101000a900460ff16908060010160179054906101000a900460ff16908060010160189054906101000a900460ff16905087565b6000800160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161480611eeb5750600060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b611f2a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611f219061277f565b60405180910390fd5b6000800160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415611fa5576001600060010160166101000a81548160ff021916908315150217905550611fc4565b6001600060010160176101000a81548160ff0219169083151502179055505b565b82805482825590600052602060002090810192821561203f579160200282015b8281111561203e5782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555091602001919060010190611fe6565b5b50905061204c9190612071565b5090565b508054600082559060005260206000209081019061206e9190612071565b50565b5b8082111561208a576000816000905550600101612072565b5090565b60008135905061209d81612a82565b92915050565b6000815190506120b281612a99565b92915050565b6000813590506120c781612ab0565b92915050565b6000815190506120dc81612ac0565b92915050565b6000813590506120f181612ad7565b92915050565b60008151905061210681612ad7565b92915050565b60008151905061211b81612aee565b92915050565b6000806040838503121561213457600080fd5b60006121428582860161208e565b92505060206121538582860161208e565b9150509250929050565b60008060006060848603121561217257600080fd5b60006121808682870161208e565b93505060206121918682870161208e565b92505060406121a2868287016120e2565b9150509250925092565b600080604083850312156121bf57600080fd5b60006121cd8582860161208e565b92505060206121de858286016120e2565b9150509250929050565b6000602082840312156121fa57600080fd5b6000612208848285016120a3565b91505092915050565b60006020828403121561222357600080fd5b6000612231848285016120b8565b91505092915050565b60006020828403121561224c57600080fd5b600061225a848285016120e2565b91505092915050565b600080600080600060a0868803121561227b57600080fd5b60006122898882890161210c565b955050602061229a888289016120cd565b94505060406122ab888289016120f7565b93505060606122bc888289016120f7565b92505060806122cd8882890161210c565b9150509295509295909350565b6122e381612901565b82525050565b6122f281612913565b82525050565b6123018161298f565b82525050565b612310816129a1565b82525050565b61231f81612945565b82525050565b6000612332601d8361289a565b91507f4f6e6c7920416c6963652063616e2061636365707420746865206265740000006000830152602082019050919050565b600061237260198361289a565b91507f496e76616c69642070726963652066726f6d206f7261636c65000000000000006000830152602082019050919050565b60006123b2600f8361289a565b91507f5472616e73666572206661696c656400000000000000000000000000000000006000830152602082019050919050565b60006123f260158361289a565b91507f4e6f74206120626574207061727469636970616e7400000000000000000000006000830152602082019050919050565b6000612432600f8361289a565b91507f426f6220616c72656164792073657400000000000000000000000000000000006000830152602082019050919050565b600061247260188361289a565b91507f4661696c656420746f207472616e7366657220455243323000000000000000006000830152602082019050919050565b60006124b260138361289a565b91507f426574206e6f7420696e2070726f6772657373000000000000000000000000006000830152602082019050919050565b60006124f260128361289a565b91507f4e6f2062657420696e2070726f677265737300000000000000000000000000006000830152602082019050919050565b600061253260188361289a565b91507f4578697374696e672062657420696e2070726f677265737300000000000000006000830152602082019050919050565b600061257260238361289a565b91507f426f7468207061727469636970616e7473206d757374206c6f636b207468652060008301527f62657400000000000000000000000000000000000000000000000000000000006020830152604082019050919050565b60006125d8601d8361289a565b91507f426574206d75737420626520616363657074656420627920416c6963650000006000830152602082019050919050565b6126148161296f565b82525050565b600060208201905061262f60008301846122da565b92915050565b600060e08201905061264a600083018a6122da565b61265760208301896122da565b6126646040830188612307565b61267160608301876122f8565b61267e60808301866122e9565b61268b60a08301856122e9565b61269860c08301846122e9565b98975050505050505050565b60006060820190506126b960008301866122da565b6126c660208301856122da565b6126d3604083018461260b565b949350505050565b60006040820190506126f060008301856122da565b6126fd602083018461260b565b9392505050565b60006020820190506127196000830184612316565b92915050565b6000602082019050818103600083015261273881612325565b9050919050565b6000602082019050818103600083015261275881612365565b9050919050565b60006020820190508181036000830152612778816123a5565b9050919050565b60006020820190508181036000830152612798816123e5565b9050919050565b600060208201905081810360008301526127b881612425565b9050919050565b600060208201905081810360008301526127d881612465565b9050919050565b600060208201905081810360008301526127f8816124a5565b9050919050565b60006020820190508181036000830152612818816124e5565b9050919050565b6000602082019050818103600083015261283881612525565b9050919050565b6000602082019050818103600083015261285881612565565b9050919050565b60006020820190508181036000830152612878816125cb565b9050919050565b6000602082019050612894600083018461260b565b92915050565b600082825260208201905092915050565b60006128b68261296f565b91506128c18361296f565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156128f6576128f56129fc565b5b828201905092915050565b600061290c8261294f565b9050919050565b60008115159050919050565b600081905061292d82612a5a565b919050565b600081905061294082612a6e565b919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600069ffffffffffffffffffff82169050919050565b600061299a8261291f565b9050919050565b60006129ac82612932565b9050919050565b60006129be8261296f565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8214156129f1576129f06129fc565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60038110612a6b57612a6a612a2b565b5b50565b60028110612a7f57612a7e612a2b565b5b50565b612a8b81612901565b8114612a9657600080fd5b50565b612aa281612913565b8114612aad57600080fd5b50565b60028110612abd57600080fd5b50565b612ac981612945565b8114612ad457600080fd5b50565b612ae08161296f565b8114612aeb57600080fd5b50565b612af781612979565b8114612b0257600080fd5b5056fea26469706673582212209825a5c8458f2c266c12cd047d3fe705a67b264e31fc2f6e9cde10c677ca1e8a64736f6c63430008000033'; // Contract bytecode as a hexadecimal string

    // Create a Contract Factory
    const factory = new ethers.ContractFactory(abi, bytecode, provider.getSigner());

    // Deploy the contract - azuki chainlink address, and the threshsold - need to make these dynamic based on selection from frontend
    const contract = await factory.deploy("0x9F6d70CDf08d893f0063742b51d3E9D1e18b7f74", "4000000000000000000");

    // Wait for the deployment transaction to be mined
    await contract.deployed();
    deployedContractAddress = contract.address;

    console.log('Contract deployed at address:', contract.address);
}