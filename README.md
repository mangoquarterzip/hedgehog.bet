# Project Name

A brief description of your project.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## About

Provide a clear and concise overview of your project. Explain its purpose, features, and what problem it solves. Include any relevant context that would help someone unfamiliar with the project understand its significance.

## Single Chain Implementation

startBet(): Alice initiates the bet.

This function sets the status of the bet to ONGOING and assigns Alice (the sender of the transaction) as one of the participants.

depositERC20(tokenAddress, amount) and/or depositNFT(nftAddress, tokenId): Alice deposits assets.

Alice, now having initiated the bet, should deposit her ERC20 or NFT assets as a part of the wager. She can call either function multiple times if depositing different tokens or multiple NFTs.

joinBet(): Bob joins the bet.

Once Alice has initiated the bet and possibly after depositing her assets, Bob can join the bet by calling this function.

depositERC20(tokenAddress, amount) and/or depositNFT(nftAddress, tokenId): Bob deposits assets.

After joining the bet, Bob should deposit his ERC20 or NFT assets as his part of the wager. Like Alice, he can call these functions multiple times if depositing different tokens or multiple NFTs.

lock(): Both Alice and Bob lock their bets.

Once both Alice and Bob have deposited their assets, they must individually call the lock function. This serves as an agreement that both parties are ready to resolve the bet based on the oracle's data.

resolveBet(): Any external actor or one of the participants can now resolve the bet.

This function checks the latest price from the Chainlink oracle. If the price is greater than or equal to the threshold, Bob wins. Otherwise, Alice wins. All deposited assets (both ERC20 tokens and NFTs) are transferred to the winner.

## Cross Chain Implementation

Bet Contract Flow:
This Ethereum smart contract allows for a betting game between Alice and Bob. The bet centers around a prediction on the floor price of NFTs based on Chainlink's oracle. If the floor price exceeds a given threshold, the prediction is considered ABOVE. If it is below the threshold, the prediction is BELOW. The bet operates as follows:

Steps:
Starting a Bet:

Event: startBet(Outcome prediction)
Alice initiates a bet by predicting if the floor price of the NFTs will be ABOVE or BELOW the threshold.
The bet status changes to ONGOING.
Depositing Assets:

Event: depositERC20(address tokenAddress, uint256 amount)
Alice can deposit ERC20 tokens that will be locked in the contract. These tokens will be part of the bet.
Event: depositNFT(address nftAddress, uint256 tokenId)
Alice can also deposit NFTs to be locked as part of the bet.
Locking the Bet:

Event: lock()
After depositing, Alice can lock the bet. This means she's committed, and the assets are now officially in play.
Accepting the Bet from Bob:

Event: handle(uint32 _origin, bytes32 _sender, bytes calldata _data)
Once Alice has locked the bet, Bob's address is set from a cross-chain message (through a different system). Bob's acceptance means he is willing to participate under the conditions Alice set.
After receiving Bob's message, the bet is marked as accepted.
Resolving the Bet:

Event: resolveBet()
Once the bet has been locked and accepted, anyone can call this function to determine the winner.
The Chainlink Oracle provides the latest NFT floor price.
If Alice's prediction is correct, she gets back all her assets. If Bob wins, the assets are transferred to him.
Technical Overview:
Under the hood, the contract uses the following key mechanisms:

Chainlink Oracle: This is used to fetch the latest NFT floor price. It acts as an external data source to make the outcome determination.
OpenZeppelin Libraries: For standard ERC20 and ERC721 (NFT) interfaces and implementations, ensuring safety and compatibility with other Ethereum contracts and applications.
State Management: The contract keeps track of the current bet status, the assets in play, and the addresses of Alice and Bob.
Asset Transfers: The contract ensures that, based on the outcome of the bet, the locked assets are transferred to the appropriate winner.


### Prerequisites

Outline the software, libraries, tools, and configurations that a user needs to have in place before they can use your project.

### Installation

Provide a detailed guide on how to install your project. You can include code snippets and terminal commands to help users understand the installation process.

## Usage

Demonstrate how to use your project once it's set up. Include code examples, screenshots, and explanations to guide users through the different use cases and scenarios.

## Contributing

Explain how others can contribute to your project. Include guidelines for submitting pull requests, reporting bugs, and suggesting new features. Be sure to outline any coding standards or contribution processes you follow.

## License

Indicate the open-source license your project is released under. This section helps others understand how they can use, modify, and distribute your code.

## Contact

Provide a way for users to contact you. This could be an email address, a link to your personal website, or any other method you're comfortable with.
