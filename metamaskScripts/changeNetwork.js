const polygonButton = document.getElementById('polygon-button');
const modeButton = document.getElementById('mode-button');
const ethereumButton = document.getElementById('ethereum-button');
const baseButton = document.getElementById('base-button');
const optimismButton = document.getElementById('optimism-button');
const zoraButton = document.getElementById('zora-button');

const switchChainsDestination = async (targetNetworkId) => {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: targetNetworkId }],
        });
        // window.location.reload();
    } catch (error) {
        console.error('Error switching network:', error);
    }
};

// Add a click event listener to the Polygon button
polygonButton.addEventListener('click', function() {
    switchChainsDestination('0x13881'); // Replace with the actual network ID for Polygon
});

// Add a click event listener to the Mode button
modeButton.addEventListener('click', function() {
    switchChainsDestination('0x397'); // Replace with the actual network ID for Mode
});

// Add a click event listener to the Ethereum button
ethereumButton.addEventListener('click', function() {
    switchChainsDestination('0x5'); // Replace with the actual network ID for Ethereum
});

// Add a click event listener to the Base button
baseButton.addEventListener('click', function() {
    switchChainsDestination('0x14a33'); // Replace with the actual network ID for Base
});

optimismButton.addEventListener('click', function() {
    switchChainsDestination('0x1a4'); // Replace with the actual network ID for Optimism
});

zoraButton.addEventListener('click', function() {
    switchChainsDestination('0x3E7'); // Replace with the actual network ID for Zora
}); // 