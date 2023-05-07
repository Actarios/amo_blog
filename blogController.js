const express = require('express')
const User = require('./models/User')
const Blog = require('./models/Blog')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser())


class blogController {
    async sendMessage(req, res) {
        try {

            const {message} = req.body

            const token = String(req.headers.cookie).slice(6)
            const decoded = jwt.decode(token)

            const currentUser = decoded.username
            const currentDate = new Date(Date.now())

            const blog = new Blog({username: currentUser, date: currentDate, message})
            await blog.save()
            console.log('User: ' + currentUser)
            console.log('Date: ' + currentDate)

            // return res.json({message: 'Сообщение отправлено'})

            res.redirect('/')

        } catch (err) {
            console.log(err)
            res.status(400).json({message: 'Ошибка отправки'})
        }
    }

    async getMessages(req, res) {
        try {

            const {message} = req.body

            const token = String(req.headers.cookie).slice(6)
            const decoded = jwt.decode(token)

            const currentUser = decoded.username
            const currentDate = new Date(Date.now())

            const blog = new Blog({username: currentUser, date: currentDate, message})
            await blog.save()
            console.log('User: ' + currentUser)
            console.log('Date: ' + currentDate)

            // return res.json({message: 'Сообщение отправлено'})

            res.redirect('/')
            
        } catch (err) {
            console.log(err)
            res.status(400).json({message: 'Ошибка отправки'})
        }
    }



}

module.exports = new blogController()