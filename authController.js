const express = require('express')
const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// validationResult вернет ошибки вследствии валидации
const { validationResult } = require('express-validator')
const {secret} = require('./config')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser())

const generateAccessToken = (id, username, email, roles, expires) => {
    const payload = {
        id,
        username,
        email,
        roles,
        expires
    }
    // передаем payload, секретный ключ из config.js и время жизни токена
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации.", errors})
            }
            const {username, email, password} = req.body
            // - ищем username и email в БД, если есть - вернем ошибку
            const candidateUsername = await User.findOne({username})
            const candidateEmail = await User.findOne({email})
            if (candidateUsername) {
                return res.status(400).json({message: 'Пользователь с таким именем уже существует.'})
            }
            if (candidateEmail) {
                return res.status(400).json({message: 'Пользователь с таким email уже существует.'})
            }
            // создаем нового пользователя
            const saltRounds = 10
            const salt = bcrypt.genSaltSync(saltRounds)
            const hashPassword = bcrypt.hashSync(password, salt);
            const userRole = await Role.findOne({value: "USER"})
            // console.log(salt)
            const user = new User({username, email, password: hashPassword, roles: [userRole.value]})
            // console.log(bcrypt.compareSync(password, hashPassword))
            await user.save()
            return res.json({message: 'Пользователь успешно зарегистрирован.'})


        } catch (err) {
            console.log(err)
            res.status(400).json({message: 'Registration Error'})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            // ищем пользователя в БД
            const user = await User.findOne({username})
            // если пользователь не найден:
            if (!user) {
                return res.status(400).json({message: `Пользователь ${username} не найден.`})
            }
            // сверяем пароль с паролем из БД
            if (!bcrypt.compareSync(password, user.password)) {
                return res.status(400).json({message: 'Введен неверный пароль.'})
            }
            // user._id генерирует Mongo, это поле не может изменяться
            const token = generateAccessToken(user._id, user.username, user.email, user.roles, user.expires)

            res.cookie('token', String(token), {
                secure: true,
                httpOnly: true,
                sameSite: true,
                expires: new Date(Date.now() + 900000)
            })
            res.redirect('/')
        } catch (err) {
            console.log(err)
            res.status(400).json({message: 'Login Error'})
        }
    }

    async logout(req, res) {
        try {
            res.clearCookie('token')
            res.redirect('/')
        } catch (err) {
            console.log(err)
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)

            // - создание ролей для пользователя и админа в БД
            // const userRole = new Role()
            // const adminRole = new Role({value: "ADMIN"})
            // await userRole.save()
            // await adminRole.save()
            // res.json('server work')
        } catch (err) {
            
        }
    }
}

module.exports = new authController()