const { GENESIS_DATA, MINE_RATE } = require('./config')
const cryptoHash = require('./crypto-hash')
const hexToBinary = require('hex-to-binary')

class Block {
  constructor({ timestamp, prevHash, hash, data, nonce, difficulty }) {
    ;(this.timestamp = timestamp),
      (this.prevHash = prevHash),
      (this.hash = hash),
      (this.data = data)
    this.nonce = nonce
    this.difficulty = difficulty
  }
  static genesis() {
    return new this(GENESIS_DATA)
  }

  static mineBlock({ prevBlock, data }) {
    let { difficulty } = prevBlock
    let hash, timestamp
    let nonce = 0
    const prevHash = prevBlock.hash

    do {
      nonce++
      timestamp = Date.now()
      difficulty = Block.adjustDifficulty({
        orignalBlock: prevBlock,
        timestamp,
      })
      hash = cryptoHash(prevHash, data, nonce, timestamp, difficulty)
    } while (
      hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty)
    )

    return new this({
      timestamp,
      prevHash,
      data,
      hash,
      nonce,
      difficulty,
    })
  }

  static adjustDifficulty({ orignalBlock, timestamp }) {
    const { difficulty } = orignalBlock
    if (difficulty < 1) return 1
    const diffrence = timestamp - orignalBlock.timestamp
    if (diffrence > MINE_RATE) return difficulty - 1
    return difficulty + 1
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
