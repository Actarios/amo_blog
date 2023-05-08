const Router = require('express')
const router = new Router()
const controller = require('./blogController')
const {check} = require('express-validator')

router.post('/blog', controller.sendMessage)

module.exports = router