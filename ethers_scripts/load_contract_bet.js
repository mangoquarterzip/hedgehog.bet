// Global variable to store the loaded contract
var LOADED_CONTRACT = "";

// Get references to the button and input elements
var loadContractButton = document.getElementById("accept");
var contractInput = document.getElementById("load-contract-for-accept-resolve");

// Add a click event listener to the button
loadContractButton.addEventListener("click", function() {
    // Store the input value in the global variable
    LOADED_CONTRACT = contractInput.value;
    console.log("Loaded contract address:", LOADED_CONTRACT);
    // You can use LOADED_CONTRACT in any other parts of your code as needed
});