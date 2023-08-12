let headers = new Headers();
    headers.set('Authorization', "Bearer cqt_rQPkghTgFxgYW478DmRvDGRft49t")

fetch("https://api.covalenthq.com/v1/eth-goerli/address/0x1E117008E1a544Bbe12A2d178169136703430190/balances_nft/?with-uncached=true", {method: 'GET', headers: headers})
  .then((resp) => resp.json())
  .then((data) => console.log(data));