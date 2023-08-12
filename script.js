// Get a reference to the button element
var button = document.getElementById("open-bet-button");
let globalEnteredValue;
let globalNumNfts;
// Check if the button element exists before adding the event listener
if (button) {

    // Add a click event listener to the button
    button.addEventListener("click", function() {
        // Redirect to the new HTML page
        window.location.href = "openBet.html"; // Replace with the actual page URL
    });
}

document.addEventListener('DOMContentLoaded', (event) => {
    // Make sure the ethereum provider exists
    if (window.ethereum) {
      document.getElementById('connect-wallet').addEventListener('click', () => {
        window.ethereum
          .request({ method: 'eth_requestAccounts' })
          .then((accounts) => {
            console.log('Connected accounts:', accounts);
          })
          .catch((err) => {
            console.error('Error connecting to wallet:', err);
          });
      });
    } else {
      console.log('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
    }
  });

