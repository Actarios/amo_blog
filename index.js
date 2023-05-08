const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const authRouter = require('./authRouter')
const blogRouter = require('./blogRouter')
const mainRouter = require('./routes/main')
const loginRouter = require('./routes/login')
const regRouter = require('./routes/reg')


const PORT = process.env.PORT || 5000

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())
app.use('/', authRouter)
app.use('/', blogRouter)

app.use('/', mainRouter)
app.use('/', loginRouter)
app.use('/', regRouter)

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://admin:G3vgnTwp4uEnuJpN@cluster0.5g10c1f.mongodb.net/?retryWrites=true&w=majority`)
        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`)
        })
    } catch (err) {
        console.log(err)
    }
}

start()