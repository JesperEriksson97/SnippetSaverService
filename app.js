const createError = require('http-errors')
const express = require('express')
const hbs = require('express-hbs')
const session = require('express-session')
const { join } = require('path')
const logger = require('morgan')

const app = express()

// app.use(session(sessionOptions))
app.use(logger('dev')) // Logs requests to the page in terminal
app.use(express.urlencoded({ extended: false }))
app.use(express.static(join(__dirname, 'public'))) // Sets public as static folder for css

app.engine('hbs', hbs.express4({ // view engine that lets us use handlebars
  defaultLayout: join(__dirname, 'views', 'layouts', 'default'),
  partialsDir: join(__dirname, 'views', 'partials')
}))
app.set('view engine', 'hbs')
app.set('views', join(__dirname, 'views'))

app.use('/', require('./routes/homeRouter')) // If a '/' get requests get in let homeRouter deal with it.
app.use('/login', require('./routes/loginRouter'))
app.use('/register', require('./routes/registerRouter'))

app.use('*', (req, res, next) => {
  res.send('Oops! 404: Cant find the requested resource... Sorry')
})

app.listen(8000, () => {
  console.log('App is listening on port 8000') // console.log when the server starts.
})
