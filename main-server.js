const app = require('express')()
const httpServer = require('http').createServer(app)
const ioServer = require('socket.io')(httpServer, {})

app.post('/ping', () => {
  console.log('Main (HTTP): /ping received')
  ioServer.emit('MAIN_TO_FRONT_PING')
  console.log('Main (WS Emit): MAIN_TO_FRONT_PING')
})

httpServer.listen(3000)
