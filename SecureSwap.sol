// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.0 <0.9.0;
pragma solidity ^0.8.0;

contract SecureSwap {
    struct Product {
        uint id;
        address payable seller;
        string description;
        uint price;

        /* 
         * This is a security deposit from the seller, which must be higher than the product's price. 
         * This deposit acts as a form of collateral to ensure the seller's commitment to the transaction. 
         */
        uint sellerDeposit; 
        bool isSold;
    }

    uint public productCount = 0;
    mapping(uint => Product) public products;

    mapping(address => uint) public balances;

    /*
     * This event is emitted when a new product is listed in the marketplace.
     * uint id: The unique identifier of the listed product.
     * address seller: The Ethereum address of the seller who listed the product.
     * uint price: The price of the product being listed.
     */
    event ProductListed(uint id, address seller, uint price);

    /*
     * This event is emitted when a product is purchased by a buyer.
     * uint id: The identifier of the product that has been purchased.
     * address buyer: The Ethereum address of the buyer who purchased the product.
     * uint price: The price at which the product was purchased.
     */
    event ProductPurchased(uint id, address buyer, uint price);

     /*
      * This event is Emitted when a transaction is approved, indicating that both parties have agreed and the funds can be transferred to the seller.
      * uint id: The product identifier for which the transaction has been approved.
      * address buyer: The buyer's Ethereum address.
      * address seller: The seller's Ethereum address.
      * uint price: The agreed transaction price.
      */
    event TransactionApproved(uint id, address buyer, address seller, uint price);

    /*
     * This event is emitted in the case of a dispute over a transaction.
     * uint id: The identifier of the disputed product.
     * string reason: A textual description providing the reason for the dispute.
     */
    event TransactionDisputed(uint id, string reason);
}

