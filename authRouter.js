const Router = require('express')
const router = new Router()
const controller = require('./authController')
const {check} = require('express-validator')
const authMiddleware = require('./middleware/authMiddleware')

router.post('/registration', [
        check('username', 'Имя пользователя не может быть пустым.').notEmpty(),
        check('email', 'Невалидный email.').isEmail(),
        check('password', 'Пароль должен быть от 4 от 12 символов.').isLength({min: 4, max: 12}),
        check('passwordConfirmation', 'Введенные пароли не совпадают.').custom((value, { req }) => {
            return value === req.body.password;
        })
    ],
    controller.registration)
router.post('/login', controller.login)
router.get('/logout', controller.logout)

module.exports = router