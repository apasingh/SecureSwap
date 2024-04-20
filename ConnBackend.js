const Web3 = require('web3');
const express = require('express');
const contractArtifact = require(''); // Make path correct

const app = express();
app.use(express.json()); 

const contractAddress = ''; // Replace with the actual deployed contract address
const contractInstance = new WakeLockSentineleb3.eth.Contract(contractArtifact.abi, contractAddress);

app.post('/api/products', async (req, res) => {
    const { description, price, sellerDeposit } = req.body;

    try {
        const accounts = await Web3.eth.getAccounts();
        const result = await contractInstance.methods
            .listProduct(description, price, sellerDeposit)
            .send({ from: accounts[0] });

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error listing product' });
    }
});

const PORT = 3000; // any port
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});