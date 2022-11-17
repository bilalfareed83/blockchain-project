const crypto = require('crypto')

const cryptoHash = (...inputs) => {
  const hash = crypto.createHash('sha256')
  hash.update(inputs.sort().join(''))
  return hash.digest('hex')
}

// const results = cryptoHash('bilal', 'zaheer')

// console.log(results)
module.exports = cryptoHash
