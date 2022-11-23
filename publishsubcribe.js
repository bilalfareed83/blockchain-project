const redis = require('redis')

const CHANNELS = {
  TEST: 'TEST',
  BLOCKCHAIN: 'Blockchain',
}

class Pubsub {
  constructor({ blockchain }) {
    this.blockchain = blockchain
    this.publisher = redis.createClient()
    this.subscriber = redis.createClient()

    this.subscriber.subscribe(CHANNELS.TEST)
    this.subscriber.subscribe(CHANNELS.BLOCKCHAIN)

    this.subscriber.on('message', (channel, message) =>
      this.handleMessage(channel, message),
    )
  }

  handleMessage(channel, message) {
    console.log(`received message, channel ${channel}, Message: ${message}`)
    const parseMessage = JSON.parse(message)
    if (channel === CHANNELS.BLOCKCHAIN) {
      this.blockchain.replaceChain(parseMessage)
    }
  }
  publish({ channel, message }) {
    this.publisher.publish(channel, message)
  }
  broadcastChain() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain),
    })
  }
}

// const checkPubSub = new Pubsub()
// setTimeout(() => checkPubSub.publisher.publish(CHANNELS.TEST, 'hellooo'), 1000)

module.exports = Pubsub
