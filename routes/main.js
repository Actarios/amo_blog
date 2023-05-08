const Router = require('express')
const router = new Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/Blog')

router.get('/', async (req, res) => {
    const token = String(req.headers.cookie).slice(6)
    const decoded = jwt.decode(token)
    const messages = await Blog.find()
    const obj = JSON.parse(JSON.stringify(messages)).sort((obj1, obj2) => {
        return obj2.date - obj1.date
    })

    for (let key of obj) {
        if (key.date) {
            let timestamp = key.date
            key.date = new Date(timestamp).toLocaleString()
        }
    }

    res.render('index', {
        title: 'Блог',
        isBlog: true,
        name: decoded?.username || 'незнакомец',
        isAuth: decoded?.username,
        messages: obj
    })
})

module.exports = router