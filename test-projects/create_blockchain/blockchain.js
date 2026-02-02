// write code that emulates how blockchains works
// const SHA256 = require ("sha256");

class Blockchain {

    constructor () {
        // runs when you create a new instance
        //constructor initiliases the chain and pendingTransaction array
        this.chain = [this.createGenesisBlock()]; //chain array contains blocks of transactions added to a network. blockchains start with a genesis block hence array contains function that create a genesisBlock. genesis block can be hardcoded into the chain array too.
        this.pendingTransactions = []; // transactions not yet added to a block
    }



//const SHA256 = require ("sha256");

//genesis block function that will execute once in the constructor
createGenesisBlock() {
// function executes once since constructor function runs only once at the begenning of the program
    return {
        index: 1,
        timestamp: Date.now(),
        transactions: [],
        nonce: 0,
        hash: "hash", //only time a randomly calc hash is used or a add previousBlockHash since genesis block does not carry transactions
        previousBlockHash: "previousBlockHash",
    };
}


//function to get last block, will allow to keep track of the previous block hash
getLastBlock() {
    return this.chain[this.chain.length - 1]; //get details of the most recent block, will allow to keep track of the previous block hash
}


//calc hash of a block

generateHash(previousBlockHash, timestamp, pendingTransactions) {

    let hash = "";
    let nonce = 0;
    
    while ((hash.substring(0, 3)) !== "000") { //check if hash starts with a specific number of zeros (difficulty target), if it doesnt miner increments the nonce by 1 and tries again, if it does, they have mined the block, the found solution is broadcast to the network
        //difficult target: control speed of the network. if miners find blocks too fast, network makes puzzle hard. if too slow, network makes makes puzzle easier
        //high target = easy mode
        //low target - hard mode. as targets gets smaller (closer to zero), the miner has to find hash with more leading zeros
        // network has to adjust this target every 2016 blocks (2 weeks for BTC)
        // this is called difficulty adjustment
        //too much hashrate ie blocks found in < 1o minutes ----- lower the target and make it difficult
        //too little hashrate ie blocks found >10 min -------- raise the target and make it easier
    nonce++; //a 32-bit field has max 2**32 = 4.28 billion. in modern mining, hardware is so fast that al 4 billion nonce possibilities will exhaust in a fraction of a second. hence will need to update another part of the blockheader to reset the data and lopp again.
    //update blockheader by updating timestap or incremenr the etxra nonce
    hash = SHA256(previousBlockHash + timestamp + JSON.stringify(pendingTransactions) + nonce).toString();
    }

return {hash, nonce};

}

//merkle root
// 1. start with ids (hashes of all transctions) in the block
// 2. pair up all transaction and hash them together
// 3. keep pairing and hashing the result until get one hash remains at the top. this is the merkle root


// function to create new transactions and add then to list of pending transactions
createNewTransction(amount, sender, recipient) {
    const newTransaction = {
        amount,
        sender,
        recipient,
    };
    this.pendingTransactions.push(newTransaction);
}

// function to create newblocks, allows to add pending transactions to a new block, calc the hash and add block to the chain

createNewBlock() {

    const timestamp = Date.now();
    const transactions = this.pendingTransactions;
    const previousBlockHash = this.getLastBlock().hash; //get hash from previous block
    const generateHash = this.generateHash(previousBlockHash, timestamp, transactions); //calc hash of current block

    const newBlock = { // add details of a new block
        index: this.chain.length + 1,
        timestamp,
        transactions,
        nonce: generateHash.nonce,
        hash: generateHash.hash,
        previousBlockHash,
    };

    this.pendingTransactions = []; // clear the array
    this.chain.push(newBlock); // push new block to the chain

    return newBlock;
}

}

module.exports = Blockchain; // to be able to access it outside the file