const express = require('express')
const http = require('http')
const {Server} = require('socket.io')

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer, { cors: { origin: 'http://localhost:5173'}})
let connectedUsers = 0

io.on('connection', socket => {
    console.log('Usuário conectado', socket.id)
    connectedUsers++
    io.emit('messageToClient', {
        users: connectedUsers
    })

    socket.on('disconnect', reason =>{
        connectedUsers--
        io.emit('messageToClient', {
            users: connectedUsers
        })
    })

    socket.on('set_username', username =>{
        socket.data.username = username
    })

    socket.on('message', message =>{
        io.emit('new_message', {
            message:message,
            username: socket.data.username,
            username_id: socket.id,
            timestamp: new Date()
        })
    })
})

httpServer.listen(3000, () => console.log('Server is Running'))