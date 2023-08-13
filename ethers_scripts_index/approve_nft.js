//0x576cfd493aB3dB2ED06b107be2f1ec172f45f3BE token
//0x473c35c466506c0e235620f348f7f199182489a7 spender

document.addEventListener('DOMContentLoaded', () => {
    const approveNFTButton = document.getElementById('approve-nft');
    approveNFTButton.addEventListener('click', async () => {
        const nftAddress = '0xaE17BDAf71D5255196267C1b945130111Ac2B00A'; // Replace with actual NFT contract address
        const spenderAddress = '0x1b26f88Dd73bE47Cebe09bA6D3c55b89C3aFC0D5'; // Replace with spender address

        await suggestNFTApproval(nftAddress, spenderAddress);
    });
});

async function suggestNFTApproval(nftAddress, spenderAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const nftContract = new ethers.Contract(nftAddress, ['function approve(address spender, uint256 tokenId)'], provider.getSigner());
    const tokenId = 1; // Replace with the token ID you want to approve

    try {
        // Suggest the NFT approval
        const tx = await nftContract.approve(spenderAddress, tokenId);
        await tx.wait();

        console.log(`Suggested approval of NFT with token ID ${tokenId} for spender ${spenderAddress}`);
    } catch (error) {
        console.error('Error suggesting NFT approval:', error);
    }
}
