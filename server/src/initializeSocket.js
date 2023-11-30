
let connectedUsers = 0

const initializeSocket = (io) => {

    io.on('connection', socket => {
        // quando um usuário se conectar
        console.log('Usuário conectado', socket.id)
        connectedUsers++
        io.emit('messageToClient', {
            users: connectedUsers
        })

        socket.on('disconnect', reason => {
            // quando um usuário se desconectar
            connectedUsers--
            io.emit('messageToClient', {
                users: connectedUsers
            })
        })

        socket.on('set_username', username => {
            socket.data.username = username
        })

        socket.on('message', message => {
            // ao receber uma mensagem
            io.emit('new_message', {
                // emite evento para todos os usuários conectados
                message: message,
                username: socket.data.username,
                username_id: socket.id,
                timestamp: new Date()
            })
        })
    })
}

module.exports = initializeSocket