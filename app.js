const express = require('express')
const app = express()

app.get('/', (req, res) => {
    console.log("Hello World")
    res.send('hello world')
})

app.listen(8000, () => {
    console.log('App is listening on port 8000')
})

