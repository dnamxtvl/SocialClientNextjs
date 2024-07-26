const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

const httpServer = http.createServer()

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3002',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
})

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id)
  socket.on('joinRoom', (roomId) => {
    console.log(roomId)
    socket.join(roomId);
    console.log(`user with id-${socket.id} joined room - ${roomId}`)
  })

  socket.on('uploadProgress', (data) => {
    console.log(data, 'DATA')
    //This will send a message to a specific room ID
    console.log(data.roomId);
    socket.emit('receiveMessage', {message: 'message tu backend nextjs'})
  })

  socket.on('sendMessage', (data) => {
    socket.emit('sendMessageAction', data)
  })

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id)
  })
})

const PORT = 3005;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`)
})

module.exports = { io };
