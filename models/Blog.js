const {Schema, model} = require('mongoose')

const Blog = new Schema({
    username: {type: String, required: true},
    date: {type: Number, required: true},
    message: {type: String, required: true},
})

// каждая сущность пользователя будет ссылаться на сущность роли

module.exports = model('Blog', Blog)