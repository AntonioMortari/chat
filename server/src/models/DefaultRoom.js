const mongoose = require('mongoose')

const defaultRoomSchema = new mongoose.Schema({
    name: { type: String, require:true},
    description: { type: String}
})

const DefaultRoom = mongoose.model('DefaultRoom', defaultRoomSchema)

module.exports = DefaultRoom