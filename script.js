// Get a reference to the button element
var button = document.getElementById("open-bet-button");

// Check if the button element exists before adding the event listener
if (button) {

    // Add a click event listener to the button
    button.addEventListener("click", function() {
        // Redirect to the new HTML page
        window.location.href = "openBet.html"; // Replace with the actual page URL
    });
}