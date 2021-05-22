const SHA256 = require("crypto-js/sha256");

// *** BLOCKS *** //
class Block {
  constructor(timestamp, lastHash, hash, data, validator, signature) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.validator = validator;
    this.signature = signature;
  }

  // *** toString function returns blocks contents *** //
  toString() {
    return `Block - 
      Timestamp : ${this.timestamp}
      Last Hash : ${this.lastHash}
      Hash      : ${this.hash}
      Data      : ${this.data}
      Validator : ${this.validator}
      Signature : ${this.signature}
    `;
  }

  // *** genesis function creates the genesis block *** //
  static genesis() {
    return new this("genesis-", "----", "genesis-hash", "genesis-data");
  }

  // *** hash function creates a hash using the SHA256 hashing algorithm *** //
  static hash(timestamp, lastHash, data) {
    return SHA256(`${timestamp}$${lastHash}${data}`).toString();
  }

  // *** createBlock function creates a new block using a timestamp, the last block's hash, the new block's hash, and the data being stored in the block *** //
  static createBlock(lastBlock, data) {
    let hash;
    let timestamp = Date.now();
    const lastHash = lastBlock.hash;
    hash = Block.hash(timestamp, lastHash, data);

    return new this(timestamp, lastHash, hash, data);
  }
}

module.exports = Block;
