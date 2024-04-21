# SecureSwap

Team Members: Aparna Singh, Ryan Chen, Maisha Miah

Many people turn to Facebook Marketplace, Craigslist, or eBay to sell their used goods. However, there is always a fear of being scammed, either as a buyer or a seller. There are many stories of people who did not receive the product they wanted, or did not receive the money they were owed for the product. It is easy to say that the second-hand exchange market is not very reliable. 

We propose SecureSwap, a secure way of buying and selling goods. SecureSwap would run on a decentralized platform, backed by the Ethereum blockchain. This is a service for both buyers and sellers, ensuring efficient transactions and market agent privacy. With the Ethereum blockchain, we can facilitate issuing payments to sellers and withdrawing money from a buyer’s account. The platform would allow all steps in the buying and selling process to be executed fairly, ensuring that both parties are satisfied with the transaction. 



# To Run Website:

1. cd react-list-products
2. npm install
3. npm start

At this point, the website should be running.


other packages:
npm install path-browserify


# To Run Server

You need to download these 2 package inorder for the server to run

1. npm install express
2. npm install web3
3. node ConnBackend.js


# Next Steps

Our client and server have successfully connected, using Infura to link our server with our Ethereum smart contract. With more time, we would have liked to make the app access the smart contract to complete the transaction. Once the transaction has succeeded, we plan to use the smart contract to list products and fully utilize its capabilities. In the frontend, we want to improve the UI with all the user functionalities. We want to create separate experiences for buyers and sellers so they can fulfill their roles. We also want to explore using an external database to keep track of all transactions and images that are uploaded to the website.

