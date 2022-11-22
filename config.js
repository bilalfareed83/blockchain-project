const MINE_RATE = 1000 //1s = 1000ms
const INIT_DIFFICULTY = 2

const GENESIS_DATA = {
  timestamp: '17',
  prevHash: '0x000',
  hash: '0xddc',
  data: [],
  difficulty: INIT_DIFFICULTY,
  nonce: 0,
}

module.exports = { GENESIS_DATA, MINE_RATE }
