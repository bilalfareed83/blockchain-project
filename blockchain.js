const Block = require('./block')
const cryptoHash = require('./crypto-hash')

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()]
  }

  // add new block function

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

  // replace chain with longer chain

  replaceChain(chain) {
    if (chain <= this.chain.lenght) {
      console.error('This incoming chain is no longer')
      return
    }

    if (!Blockchain.isValidChain(chain)) {
      console.error('The incoming chain is not valid')
      return
    }
    this.chain = chain
  }

  static isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))
      return false

    for (let i = 1; i < chain.length; i++) {
      const { timestamp, prevHash, hash, nonce, difficulty, data } = chain[i]
      const prevBlockHash = chain[i - 1].hash
      const lastDifficulty = chain[i - 1].difficulty

      if (prevHash !== prevBlockHash) return false

      const validatedHash = cryptoHash(
        timestamp,
        prevHash,
        nonce,
        difficulty,
        data,
      )

      //   console.log(validatedHash)
      //   console.log(hash)

      if (hash !== validatedHash) return false
      if (Math.abs(lastDifficulty - difficulty) > 1) return false
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
