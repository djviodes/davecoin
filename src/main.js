const { Blockchain, Transaction } = require("./blockchain");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const myKey = ec.keyFromPrivate(
  "d5a3b98543786b059f474cfdf266f710685ae72b43c663c41e71d3bb293b57af"
);
const myWalletAddress = myKey.getPublic("hex");

let daveCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, "public key goes here", 10);
tx1.signTransaction(myKey);
daveCoin.addTransaction(tx1);

console.log("\n Starting the miner...");
daveCoin.minePendingTransactions(myWalletAddress);

console.log(
  "\nBalance of david is",
  daveCoin.getBalanceOfAddress(myWalletAddress)
);

daveCoin.chain[1].transactions[0].amount = 1;

console.log("Is chain valid?", daveCoin.isChainValid());
