const express = require('express')
const http = require('http')
const {Server} = require('socket.io')

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer, { cors: { origin: 'http://localhost:5173'}})

io.on('connection', socket => {
    console.log('Usuário conectado', socket.id)
    socket.emit('messageToClient', 'Conexão realizada')

    socket.on('disconnect', reason =>{
        console.log(`Usuário de id ${socket.id} desconectado`)
    })

    socket.on('set_username', username =>{
        socket.data.username = username
    })

    socket.on('message', message =>{
        io.emit('new_message', {
            message:message,
            username: socket.data.username,
            username_id: socket.id
        })
    })
})

httpServer.listen(3000, () => console.log('Server is Running'))