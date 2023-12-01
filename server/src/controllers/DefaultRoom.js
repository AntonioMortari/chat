
// models
const DefaultRoom = require('../models/DefaultRoom')

class DefaultRoomController {

    async index(req, res) {
        DefaultRoom.find()
            .then(result => {
                res.status(200).json(result)
            })
            .catch(error => {
                res.status(400).json(error)
            })
    }

    async create(req, res) {
        const { name, description } = req.body

        if (!name) {
            return res.status(400).json({ message: 'Dados faltando!' })
        }

        // verify room exists
        const findRoom = await DefaultRoom.findOne({ name: name })
        if (findRoom) {
            return res.status(400).json({ message: 'Sala com o nome' + nome + ' já existe' })
        }

        // create default room
        const newDefaultRoom = new DefaultRoom({
            name,
            description
        })

        newDefaultRoom.save()
            .then(result => {
                res.status(201).json({ message: 'Sala criada com sucesso', result: result })
            })
            .catch(error => {
                res.status(400).json({ message: 'Erro ao criar sala padrão', error: error })
            })
    }

    async delete(req, res) {
        const { id } = req.params

        DefaultRoom.findByIdAndDelete(id)
            .then(result => {
                res.status(200).json({ message: `Sala de id ${id} deletada com sucesso`, result: result })
            })
            .catch(error => {
                res.status(400).json({ message: 'Erro', error: error })
            })
    }

}

module.exports = DefaultRoomController