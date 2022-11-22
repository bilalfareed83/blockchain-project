const express = require('express')
const Blockchian = require('./blockchain')
const bodyParser = require('body-parser')

const app = express()

const blockchian = new Blockchian()
app.use(bodyParser.json())

app.get('/api/blocks', (req, res) => {
  res.json(blockchian.chain)
})

app.post('/api/mine', (req, res) => {
  const { data } = req.body

  blockchian.addBlock({ data })
  res.redirect('/api/blocks')
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`)
})
