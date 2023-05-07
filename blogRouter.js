const Router = require('express')
const router = new Router()
const controller = require('./blogController')
const {check} = require('express-validator')
const authMiddleware = require('./middleware/authMiddleware')
const roleMiddleware = require('./middleware/roleMiddleware')

router.post('/blog', controller.sendMessage)

module.exports = router