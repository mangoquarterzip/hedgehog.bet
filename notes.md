With covalent, should be made clearer in the docs that you have to include Bearer in the API key when making a request

swagger doesnt work

TO do list:

Create express js server, make rq to covalent for the address of window.ethereum, then display that as eligible NFTs to be used, also do for tokens, filter out scam tokens

create deploy page/open a hedge page

i need to get data[0]items[0]]nft_data[i]token_id[i]

cross chain functionality:

Alice deploys contract on Base

Alice locks her funds in holding contract on Base

Bob wants to participate in hedge, but his assets are on Zora

Bob deploys contract on Zora

Bob deposits his assets on Zora, then he calls lock(), but we use our aggregator to determine whichever cross chain call is cheapest to make, # need to consider whether this will increase the contract to deploy cost

lock() is a cross chain call/message, and lets the holding contract on Base know that Bob has locked on Zora

Alice must call the resolve() function on Base

to do list:

rendering them in from an api call using covalent- rendered skeletons on open hedges done

open a hedge button generated seperate page for caller1 to generate a hedge

skeletons on the join bet hedge, and for users to be able to select which nfts and erc20s, first and second box on top containers

box on lower container on what the caller1 has already put in

build out layer zero, ccip, hyperlane cross chain messaging/function calling aggregator

make box 3 on top layer dynamic

link up all buttons to ethers

link up search bar to searching through

bridge some goerli nfts to base, optimism, zora

create express server for yellow left section - do we event need a express server? are we able to do everything on client side?

solve issue of being able to call resolve before the due date has arrived

fix the contract so that u cant deposit anymore after 2 locks have been accepted

fix the issue where anyone can lock anything and then that other person is forced into the lock

1. either generate a password that only can be given to the person to lock? but then that means they could still lock anything

only solution is to change contract and write new function called accept(), both people have to call accept() before you can lock() ? need to think about it
write whitepaper
