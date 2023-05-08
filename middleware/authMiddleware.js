const jwt = require('jsonwebtoken')
const {secret} = require('../config')

module.exports = function(req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: 'Пользователь не авторизован.'})
        }
        // в verify передаем токен и секретный ключ
        // в decodedData лежат данные с ID и ролями пользователя
        const decodedData = jwt.verify(token, secret)
        req.user = decodedData
        next()
    } catch (err) {
        console.log(err)
        return res.status(403).json({message: 'Пользователь не авторизован.'})
    }
}