const Router = require('express')
const router = new Router()

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Авторизация',
        isLogin: true
    })
})

module.exports = router