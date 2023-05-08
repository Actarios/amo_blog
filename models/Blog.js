const {Schema, model} = require('mongoose')

const Blog = new Schema({
    username: {type: String, required: true},
    date: {type: Number, required: true},
    message: {type: String, required: true},
})

module.exports = model('Blog', Blog)