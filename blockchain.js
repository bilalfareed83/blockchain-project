const Block = require('./block')
const cryptoHash = require('./crypto-hash')

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()]
  }

  addBlock({ data }) {
    // get blockchain length for prevBlock
    const getPrevBlock = this.chain.length - 1
    // call mineBlock function from block.js
    const newBlock = Block.mineBlock({
      prevBlock: this.chain[getPrevBlock],
      data,
    })
    this.chain.push(newBlock)
  }

  static isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))
      return false

    for (let i = 1; i < chain.length; i++) {
      const { timestamp, prevHash, hash, data } = chain[i]
      const prevBlockHash = chain[i - 1].hash

      if (prevHash !== prevBlockHash) return false

      const validatedHash = cryptoHash(timestamp, prevHash, data)

      //   console.log(validatedHash)
      //   console.log(hash)

      if (hash !== validatedHash) return false
    }
    return true
  }
}

const blockchain = new Blockchain()
blockchain.addBlock({ data: 'block1' })
const result = Blockchain.isValidChain(blockchain.chain)
// console.log(blockchain.chain)
// console.log(result)

module.exports = Blockchain
