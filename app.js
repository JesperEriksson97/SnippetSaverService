
const express = require('express')
const hbs = require('express-hbs')
const session = require('express-session')
const { join } = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const flash = require('connect-flash')

// DB Config
const db = require('./configs/mongoKeys').mongoURI

// Connect to Mono
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

const app = express()

app.use(bodyParser.urlencoded({
  extended: true
}))

const TWO_HOURS = 1000 * 60 * 60 * 2

// envs
const {
  PORT = 8000,
  NODE_ENV = 'development',
  SESS_NAME = 'test',
  SESS_SECRET = 'secret',
  SESS_LIFETIME = TWO_HOURS
} = process.env

const IN_PROD = NODE_ENV === 'production' // returns true if we are in production

// Express-Session
app.use(session({
  name: SESS_NAME,
  resave: false,
  saveUninitialized: false,
  secret: SESS_SECRET,
  cookie: {
    maxAge: SESS_LIFETIME,
    sameSite: true,
    secure: IN_PROD // should be set to secure when in production
  }
}))

// Connect-flash
app.use(flash())

// Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg') // setting locals success_msg
  res.locals.error_msg = req.flash('error_msg') // setting locals error_msg
  next()
})

// Function to redirect to user to the login page if its trying to access unathorized data.
const redirectLogin = (req, res, next) => { // If the user is not logged in, redirect to login page.
  if (!req.session.userId) {
    res.redirect('/login')
  } else {
    next()
  }
}

// Function to redirect to user to dashboard if the user is already logged in.
const redirectDashboard = (req, res, next) => { // If the user have a session and tries to log in again, just redirect to the dashboard.
  if (req.session.userId) {
    res.redirect('/dashboard')
  } else {
    next()
  }
}

// app.use(session(sessionOptions))
app.use(logger('dev')) // Logs requests to the page in terminal
app.use(express.urlencoded({ extended: false }))
app.use(express.static(join(__dirname, 'public'))) // Sets public as static folder for css

app.engine('hbs', hbs.express4({ // view engine that lets us use handlebars
  defaultLayout: join(__dirname, 'views', 'layouts', 'default'),
  partialsDir: join(__dirname, 'views', 'partials')
}))

hbs.registerHelper('ifEquals', function (arg1, arg2, options) {
  return (arg1 === arg2) ? options.fn(this) : options.inverse(this)
})

app.set('view engine', 'hbs')
app.set('views', join(__dirname, 'views'))

app.use('/', require('./routes/homeRouter')) // If a '/' get requests get in let homeRouter deal with it.
app.use('/login', redirectDashboard, require('./routes/loginRouter'))
app.use('/register', require('./routes/registerRouter'))
app.use('/dashboard', redirectLogin, require('./routes/dashboardRouter'))

app.use('*', (req, res, next) => {
  res.send('Oops! 404: Cant find the requested resource... Sorry')
})

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`) // console.log when the server starts.
})
