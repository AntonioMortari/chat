const express = require('express')
const http = require('http')
const {Server} = require('socket.io')
const initializeSocket = require('./initializeSocket.js')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())

// connect to db
try {
    mongoose.connect(process.env.STRING_CONNECTION)
} catch (error) {
    console.log(error)
}

// models
const DefaultRoom = require('./models/DefaultRoom.js')

// routes
app.get('/rooms', (req,res) =>{
    DefaultRoom.find()
        .then(result =>{
            res.status(200).json(result)
        })
        .catch(error => {
            res.status(400).json(error)
        })
})

app.post('/rooms', async(req,res) =>{
    const { name, description} = req.body

    if(!name){
        return res.status(400).json({message:'Dados faltando!'})
    }

    // verify room exists
    const findRoom = await DefaultRoom.findOne({name: name})
    if(findRoom){
        return res.status(400).json({message: 'Sala com o nome' + nome + ' já existe'})
    }

    // create default room
    const newDefaultRoom = new DefaultRoom({
        name,
        description
    })

    newDefaultRoom.save()
        .then(result => {
            res.status(201).json({message:'Sala criada com sucesso', result: result})
        })
        .catch(error => {
            res.status(400).json({message:'Erro ao criar sala padrão', error:error})
        })
})

const httpServer = http.createServer(app)
const io = new Server(httpServer, { cors: { origin: '*'}})

initializeSocket(io)

httpServer.listen(3000, () => console.log('Server is Running'))