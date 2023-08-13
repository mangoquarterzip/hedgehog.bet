//0x576cfd493aB3dB2ED06b107be2f1ec172f45f3BE token
//0x473c35c466506c0e235620f348f7f199182489a7 spender

document.addEventListener('DOMContentLoaded', () => {
    const approveTokenButton = document.getElementById('approve-token');
    // change the function name here                    change the id finder here
    approveTokenButton.addEventListener('click', async () => {
        const tokenAddress = '0x576cfd493aB3dB2ED06b107be2f1ec172f45f3BE'; // Replace with actual token address
        const spenderAddress = deployedContractAddress; // Replace with spender address

        await suggestTokenApproval(tokenAddress, spenderAddress);
    });
});

async function suggestTokenApproval(tokenAddress, spenderAddress) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const tokenContract = new ethers.Contract(tokenAddress, ['function approve(address spender, uint256 amount)'], provider.getSigner());
  
    // Set the amount you want to suggest for approval (in Wei)
    const suggestedAmount = ethers.utils.parseUnits('100', 18); // For example, 100 tokens with 18 decimal places
  
    // Suggest the approval
    const tx = await tokenContract.approve(spenderAddress, suggestedAmount);
    await tx.wait();
  
    console.log(`Suggested approval of ${ethers.utils.formatUnits(suggestedAmount, 18)} tokens for spender ${spenderAddress}`);
}
