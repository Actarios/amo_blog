const Router = require('express')
const router = new Router()

router.get('/registration', (req, res) => {
    res.render('reg', {
        title: 'Регистрация',
        isReg: true
    })
})

module.exports = router