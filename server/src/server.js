const express = require('express')
const http = require('http')
const {Server} = require('socket.io')
const initializeSocket = require('./initializeSocket.js')

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer, { cors: { origin: '*'}})

initializeSocket(io)

httpServer.listen(3000, () => console.log('Server is Running'))