const Router = require('express')
const router = new Router()
const jwt = require('jsonwebtoken')


router.get('/', (req, res) => {
    const token = String(req.headers.cookie).slice(6)
    const decoded = jwt.decode(token)
    console.log(decoded)

    res.render('index', {
        title: 'Блог',
        isBlog: true,
        name: decoded?.username || 'незнакомец'
    })
})

module.exports = router