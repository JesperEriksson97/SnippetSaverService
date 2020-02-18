const createError = require('http-errors')
const express = require('express')
const hbs = require('express-hbs')
const session = require('express-session')
const { join } = require('path')
const logger = require('morgan')

const app = express()

// app.use(session(sessionOptions))

app.engine('hbs', hbs.express4({
  defaultLayout: join(__dirname, 'views', 'layouts', 'default'),
  partialsDir: join(__dirname, 'views', 'partials')
}))
app.set('view engine', 'hbs')
app.set('views', join(__dirname, 'views'))

app.use('/', require('./routes/homeRouter')) // If a '/' get requests get in let homeRouter deal with it.
// app.use('*', (req, res, next) => next(createError(404)))

app.listen(8000, () => {
  console.log('App is listening on port 8000')
})
