const { Web3 } = require("web3");
const web3 = new Web3("https://rpc2.sepolia.org");

// Adress generada
const address = '0xb091605A3d9240e1BF3092D166cd279561B45349';
const privateKey = '0x10d10b82335d21ebaf26676b39934d215e793f2c2b65bf72ead31b4989912d95';
const myAccount = web3.eth.accounts.privateKeyToAccount(privateKey);

// Wallet a enviar
const toAddress = '0x14B4Dea34780ae5322DEc123064Fe651F41fEA98';

// USDC
const usdcContractAddress = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238';
const USDCABI = require('./USDCABI.json');


const createWallet = async () => {
    return web3.eth.accounts.create();
}

const getUSDCBalance = async () => {
    const usdcContract = new web3.eth.Contract(USDCABI, usdcContractAddress);
    const balance = await usdcContract.methods.balanceOf(address).call();
    console.log(balance);
}

const getETHBalance = async () => {
    const balance = await web3.eth.getBalance(address);
    console.log(balance);
}

const transferUSDC = async (toAddress, amount) => {
    amount = amount  * Math.pow(10, 6) // transformacion a formato usdc
    const usdcContract = new web3.eth.Contract(USDCABI, usdcContractAddress);
    const transfer = usdcContract.methods.transfer(toAddress, amount);
    const encodedABI = transfer.encodeABI();
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = await transfer.estimateGas({ from: address });

    const transaction = {
        from: address,
        to: usdcContractAddress,
        gasPrice: gasPrice,
        data: encodedABI
    };

    const signedTransaction = await web3.eth.accounts.signTransaction(
        transaction,
        privateKey
    );

    const receipt = await web3.eth.sendSignedTransaction(
        signedTransaction.rawTransaction
    );

    console.log("Transaction receipt:", receipt);
};
  


module.exports = {
    transferUSDC,
    getETHBalance,
    getUSDCBalance,
    createWallet
};

