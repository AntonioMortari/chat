
let connectedUsers = 0

const initializeSocket = (io) => {

    io.on('connection', socket => {
        // quando um usuário se conectar
        console.log('Usuário conectado', socket.id)
        connectedUsers++
        io.emit('messageToClient', {
            users: connectedUsers
        })

        // disconnect
        socket.on('disconnect', reason => {
            // quando um usuário se desconectar
            connectedUsers--
            io.emit('messageToClient', {
                users: connectedUsers
            })
        })

        // set data user
        socket.on('set_data_user', data => {
            socket.data.username = data.username
            socket.data.id_room = data.id_room

            socket.join(data.id_room)

            console.log(socket.data.username)
            console.log(socket.data.id_room)
        })

        // room chat
        socket.on('new_room_message', data => {
            io.to(data.id_room).emit('new_room_message', {
                message: data.message,
                username: socket.data.username,
                username_id: socket.id,
                timestamp: new Date()
            })
        })

        
        
        
        // global chat
        // socket.on('global_message', message => {
        //     // ao receber uma mensagem
        //     io.emit('new_global_message', {
        //         // emite evento para todos os usuários conectados
        //         message: message,
        //         username: socket.data.username,
        //         username_id: socket.id,
        //         timestamp: new Date()
        //     })
        // })
    })
}

module.exports = initializeSocket