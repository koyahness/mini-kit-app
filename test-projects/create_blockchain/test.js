// import the Blockchain class from modules.exports = Blockchain; // to be able to access it outside the file

const Blockchain = require("./blockchain")

//will allow to test the code in blockchain.js

//make an instance of the class

let bitcoin = new Blockchain(); // could call it ethereum or any other name

// bitcoin.createNewBlock();

console.log(bitcoin)