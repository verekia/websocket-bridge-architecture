const app = require('express')()
const httpServer = require('http').createServer(app)
const ioServer = require('socket.io')(httpServer, {})

const ioClient = require('socket.io-client')
const socketClient = ioClient('http://localhost:3000')

socketClient.on('MAIN_TO_FRONT_PING', () => {
  console.log('Front (WS Received): MAIN_TO_FRONT_PING')
  ioServer.emit('FRONT_TO_CLIENT_PING')
  console.log('Front (WS Emit): FRONT_TO_CLIENT_PING')
})

app.get('/', (_, res) => {
  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
  <title></title>
  </head>
  <body>  
  <button id="button">Ping main server</button>
  <p id="response"></p>
  <script src="https://cdn.socket.io/4.0.1/socket.io.min.js" integrity="sha384-LzhRnpGmQP+lOvWruF/lgkcqD+WDVt9fU3H4BWmwP5u5LTmkUGafMcpZKNObVMLU" crossorigin="anonymous"></script>
  <script>
    const button = document.getElementById('button')
    button.addEventListener("click", () => {
      fetch('http://localhost:3000/ping', { method: 'post' })
    })

    const response = document.getElementById('response')

    const socket = io()

    socket.on('FRONT_TO_CLIENT_PING', () => {
      response.innerHTML = 'RECEIVED!'
      console.log('Client (WS Received): FRONT_TO_CLIENT_PING')
    })
  </script>
  </body>
  </html>  
  `)
})

httpServer.listen(3001)
