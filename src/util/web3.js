const { Web3 } = require("web3");
const web3 = new Web3("https://rpc2.sepolia.org");

const { WAVE3_WALLET } = require('../config');


// USDC
const usdcContractAddress = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238';
const USDCABI = require('./USDCABI.json');
const ABI = require ('./wave3ABI.json');
const BYTECODE = require ('./wave3bytecode.json');

const deploy = async ( nombre, descripcion, monto, tasa, tiempo ) => {
    //initialize a wallet(with funds)
    const wallet = web3.eth.wallet.add(WAVE3_WALLET);
  
    //initialize contract
    const myContract = new web3.eth.Contract(ABI);
  
    //create contract deployer
    const deployer = myContract.deploy({
      data: '0x' + BYTECODE,
      arguments: [nombre, descripcion, monto, tasa, tiempo], 
    });
  
    //send transaction to the network
    const txReceipt = await deployer.send({ from: wallet[0].address });
  
    //print deployed contract address
    return { hashAddress: txReceipt.options.address };
  }

const createWallet = async () => {
    return web3.eth.accounts.create();
}

const getUSDCBalance = async ( address ) => {
    const usdcContract = new web3.eth.Contract(USDCABI, usdcContractAddress);
    const balance = await usdcContract.methods.balanceOf(address).call();
    console.log(balance);
}

const getETHBalance = async ( address ) => {
    const balance = await web3.eth.getBalance(address);
    console.log(balance);
}

const transferUSDC = async (toAddress, amount ) => {
    //initialize a wallet(with funds)
    const wallet = web3.eth.wallet.add(WAVE3_WALLET);

    const usdcContract = new web3.eth.Contract(USDCABI, usdcContractAddress);
    const transfer = usdcContract.methods.transfer(toAddress, amount);
    const encodedABI = transfer.encodeABI();
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = await transfer.estimateGas({ from: wallet[0].address });

    console.log(wallet[0])
    const transaction = {
        from: wallet[0].address,
        to: usdcContractAddress,
        data: encodedABI,
        gasPrice: gasPrice
    };

    const signedTransaction = await web3.eth.accounts.signTransaction(
        transaction,
        WAVE3_WALLET
    );

    const receipt = await web3.eth.sendSignedTransaction(
        signedTransaction.rawTransaction
    );

    return { message: 'ok' };
};
  


module.exports = {
    transferUSDC,
    getETHBalance,
    getUSDCBalance,
    createWallet,
    deploy
};

