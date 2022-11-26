const express = require('express')
const Blockchain = require('./blockchain')
const bodyParser = require('body-parser')
const PubSub = require('./publishsubcribe')
const request = require('request')

const app = express()
const blockchain = new Blockchain()

const pubSub = new PubSub({ blockchain })
const DEFAULT_PORT = 3000
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`

setTimeout(() => {
  pubSub.broadcastChain()
}, 1000)

app.use(bodyParser.json())

app.get('/api/blocks', (req, res) => {
  res.json(blockchain.chain)
})

app.post('/api/mine', (req, res) => {
  const { data } = req.body

  blockchain.addBlock({ data })
  pubSub.broadcastChain()
  res.redirect('/api/blocks')
})

const syncChain = () => {
  request(
    { url: `${ROOT_NODE_ADDRESS}/api/blocks` },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const rootChain = JSON.parse(body)
        blockchain.replaceChain(rootChain)
      }
    },
  )
}

const PEER_PORT =
  process.env.GENERATE_PEER_PORT === 'true'
    ? DEFAULT_PORT + Math.ceil(Math.random() * 1000)
    : ''

const PORT = PEER_PORT || DEFAULT_PORT

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`)
  syncChain()
})
