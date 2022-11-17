const { GENESIS_DATA } = require('./config')
const cryptoHash = require('./crypto-hash')

class Block {
  constructor({ timestamp, prevHash, hash, data }) {
    ;(this.timestamp = timestamp),
      (this.prevHash = prevHash),
      (this.hash = hash),
      (this.data = data)
  }
  static genesis() {
    return new this(GENESIS_DATA)
  }

  static mineBlock({ prevBlock, data }) {
    const timestamp = Date.now()
    const prevHash = prevBlock.hash

    return new this({
      timestamp,
      prevHash,
      data,
      hash: cryptoHash(prevHash, data, timestamp),
    })
  }
}

// const block1 = new Block({
//   timestamp: '17/11/2022',
//   prevHash: '0xabc',
//   hash: '0xccc',
//   data: 'Hello',
// })
// const genesisBlock = Block.genesis()

// const block2 = Block.mineBlock({ prevBlock: block1, data: 'Block2' })

// console.log(block2)

module.exports = Block
