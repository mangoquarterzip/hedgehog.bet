
/// this is working! need to edit so that address is like {} and is gotten from window.ethereum accounts[0]
const apiUrl = 'https://api.covalenthq.com/v1/eth-goerli/address/0x1E117008E1a544Bbe12A2d178169136703430190/balances_nft/?with-uncached=true';
const headers = new Headers();
headers.append('Authorization', 'Bearer cqt_rQPkghTgFxgYW478DmRvDGRft49t');

// Make the API request
fetch(apiUrl, { headers })
  .then(response => response.json())
  .then(data => {
    if (data.data && data.data.items) {
      const nftItems = data.data.items;
      

      // Loop through nft_data and extract token_id and token_url
      for (const nftItem of nftItems) {
        for (const nftData of nftItem.nft_data) {
          const tokenId = nftData.token_id;
          const tokenUrl = nftData.token_url;
          console.log(`Token ID: ${tokenId}, Token URL: ${tokenUrl}`);
        }
      }
    } else {
      console.log('No NFT data found.');
    }
  })
  .catch(error => {
    console.error('Error fetching NFT data:', error);
  });
