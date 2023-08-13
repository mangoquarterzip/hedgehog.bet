The Hedgehog Protocol allows for peer to peer hedging between two users. There are two implementations. It is chain agnostic, and works with any EVM compatible blockchain. The same logic could be applied to non-EVM blockchains as well. Currently on the front end, we allow for usage on Mode, Base, Optimism, Polygon, Ethereum and Zora. 

Hedgehog protocol solves some intrinsically fundamental issues within society right now. The ability to not trust. By ensuring all logic is completed through code and on the blockchain, we can guarantee that a user will be paid out after a bet is made without the use of an intermediary entity.

For example, if Alice wants to bet against Bob that the price of Bitcoin in 2024 will be more than 40,000 USD, but Bob doesn’t agree, both users can deposit as many or as little ERC20s and NFTs in the holding contract as they please. Then, they both confirm that they are happy with each other’s collateral, and when the time comes, anyone is able to call the resolve function; and all of the deposited collateral within the smart contract goes to the winner. 

We revolved the resolution criteria around Chainlink data feed oracles, whereby we can pull an aggregate price from multiple sources for Price Feeds, NFT floor prices, Index prices etc. To implement something that isn’t covered by Chainlink’s data feed oracles, we would have to link up an API to an oracle, however this approach is inherently flawed because the data source isn’t aggregated. What if that single API you are relying on is compromised? This is why, to resolve items not covered by covered by the Data Feeds, we would use something like UMA’s optimistic oracle, where participants are heavily financially incentivized to make the correct comment about the validity of a statement.

For a cross chain implementation any generic cross-chain messaging protocol would work. For this instance, I chose to worth with Hyperlane just because of the simplicity of the Mailbox contracts. The logic behind a cross-chain implementation revolves around the fact that EVM addreses are chain agnostic, meaning that Alice and Bob will have the same address no matter whether they are on chainA or on chainB. This means that Alice can deposit into a smart contract on chainA and Bob can deposit into a smart contract on chainB; and lets suppose that Alice wins the bet, then the assets on chainA will be returned to Alice’s address on chainA, and the assets on chainB will be returned to Alice’s address but on chainB. i.e. Assets are not moving across chains. By using some simple logic like acknowledging that on one chain a user has called locked() and then passing that information using Hyperlane to the other chain and messaging across chains who the winner of the bet was, we can implement this cross-chain.



## Single Chain Implementation

https://github.com/mangoquarterzip/hedgehog.bet/blob/main/contracts/SingleChainHoldingContract.sol


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

https://github.com/mangoquarterzip/hedgehog.bet/blob/main/contracts/MultiChainHoldingContract.sol

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
 users to contact you. This could be an email address, a link to your personal website, or any other method you're comfortable with.
