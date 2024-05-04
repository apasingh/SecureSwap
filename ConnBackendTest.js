const Web3 = require('web3');
const contractArtifact = require('./SecureSwapABI.json'); // The ABI of your contract

// Your Infura endpoint for the Sepolia network
const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://sepolia.infura.io/ws/v3/d9fad08e813e4f03baa1b457b7d54173'));

// Your contract's address on the Sepolia network
const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138';
const contractInstance = new web3.eth.Contract(contractArtifact, contractAddress);

// The address from which to conduct the transactions
const fromAddress = '0xYourEthereumAddressHere'; // Replace with your actual Ethereum address

// The private key for the address, without the leading 0x
const privateKey = 'YourPrivateKeyHereWithout0x'; // Replace with your actual private key

async function listProduct(description, price, sellerDeposit) {
    const priceInWei = web3.utils.toWei(price.toString(), 'ether');
    const depositInWei = web3.utils.toWei(sellerDeposit.toString(), 'ether');

    const txObject = {
        from: fromAddress,
        to: contractAddress,
        data: contractInstance.methods.listProduct(description, priceInWei, depositInWei).encodeABI(),
        gas: '2000000',
    };

    const signedTx = await web3.eth.accounts.signTransaction(txObject, '0x' + privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log('Transaction hash:', receipt.transactionHash);
}

listProduct("Test Product", "0.05", "0.01")
    .catch(error => {
        console.error('Error listing the product:', error);
    });
