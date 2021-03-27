const http = require('http')
const WebSocketServer = require('websocket').server

let connection = null

const httpServer = http.createServer((req, res) => {
  console.log('recieved a request')
})

// Handshake
const webSocket = new WebSocketServer({
  httpServer: httpServer,
})

webSocket.on('request', (request) => {
  // Get switching protocol
  connection = request.accept(null, request.origin)

  connection.on('open', () => console.log('Connection opened'))
  connection.on('close', () => console.log('Connection closed'))
  connection.on('message', (message) => {
    console.log(`Recieved message: ${message.utf8Data}`)
  })

  sendEveryFiveSeconds()
})

httpServer.listen(8000, () => {
  console.log('Server listening on port 8000')
})

function sendEveryFiveSeconds() {
  connection.send(`Message ${Math.random()}`)

  setTimeout(sendEveryFiveSeconds, 5000)
}
