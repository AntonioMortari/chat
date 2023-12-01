const express = require('express')
const http = require('http')
const {Server} = require('socket.io')
const initializeSocket = require('./initializeSocket.js')

const mongoose = require('mongoose')

require('dotenv').config()
const cors = require('cors')
const defaultRoomRoutes = require('./routes/DefaultRoom.js')


const app = express()

app.use(express.json())
app.use(cors())
app.use('/rooms', defaultRoomRoutes)

// connect to db
try {
    mongoose.connect(process.env.STRING_CONNECTION)
} catch (error) {
    console.log(error)
}

const httpServer = http.createServer(app)
const io = new Server(httpServer, { cors: { origin: '*'}})

initializeSocket(io)

httpServer.listen(3000, () => console.log('Server is Running'))