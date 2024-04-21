const { Web3 } = require('web3');
const express = require('express');
const contractArtifact = require('./SecureSwapABI.json');
const app = express();
app.use(express.json());

// const web3 = new Web3('http://localhost:8545');
const web3 = new Web3("wss://sepolia.infura.io/ws/v3/IWJoVicmKpGRMa3dm5RgX6Gv3wUtQmCeJcONqak7nXpflZDEeStqBg");
const contractAddress = process.env.CONTRACT_ADDRESS || '0xd9145CCE52D386f254917e481eB44e9943F39138';
const contractInstance = new web3.eth.Contract(contractArtifact  , contractAddress);

// Root route handler
app.get('/', (req, res) => {
    res.send('Hello World');
  });

app.post('/api/products', async (req, res) => {
  const { description, price, sellerDeposit } = req.body;

  try {
    const accounts = await web3.eth.getAccounts();
    // Ensure you handle the transaction signing properly here for production
    const result = await contractInstance.methods
      .listProduct(description, web3.utils.toWei(price, 'ether'), sellerDeposit)
      .send({ from: accounts[0] }); // You might want to let the client specify the `from` account

    // Consider just returning the transaction hash immediately
    res.json({ transactionHash: result.transactionHash });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error listing product' });
  }
});

app.get('/', (req, res) => {
    res.send('End World');
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});