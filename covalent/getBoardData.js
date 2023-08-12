

// Global variable to store the entered value

// Function to update the content of an h1 element
function updateH1Content(id, content) {
    const h1Element = document.getElementById(id);
    if (h1Element) {
      h1Element.textContent = content;
    }
  }
  
  // Function to be called when the button is clicked
  function updateContractAddress() {
    // Update the Contract Address h1 with entered value
    updateH1Content("contract-address", "CA: " + globalEnteredValue);
    updateH1Content("total-nfts", "Total Amount of NFTS: "+ globalNumNfts);
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  // Add a click event listener to the button
  const loadContractButton = document.getElementById('loadContractButton');
  loadContractButton.addEventListener('click', function() {
    // Get the value from the input field
    const inputField = document.getElementById('helper-text');
    globalEnteredValue = inputField.value;
  
    // Perform any actions with the entered value
    console.log('Entered value:', globalEnteredValue);
  
    // Call the function to update Contract Address
  
    let headers = new Headers();
      headers.set('Authorization', "Bearer cqt_rQPkghTgFxgYW478DmRvDGRft49t")
  
      fetch(`https://api.covalenthq.com/v1/base-testnet/address/${globalEnteredValue}/balances_v2/?nft=true`, { method: 'GET', headers: headers })
      .then((resp) => resp.json())
      .then((data) => {
        // Get the number of items in the 'items' array
        const numberOfItems = data.data.items.length;
    
        console.log(`Number of items: ${numberOfItems}`);
    
        // Store the numberOfItems in a variable or perform any other actions
        globalNumNfts = numberOfItems;
    
        // Now you can use 'storedNumberOfItems' for further processing
      });
    updateContractAddress();
  });