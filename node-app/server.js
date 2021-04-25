const express = require('express')
const routes = require('./routes/index')
const path = require('path') // installed this library

// Constants and variables section
const PORT = 8080
const HOST = '0.0.0.0'


const app = express()


app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.use('/', routes())

app.listen(PORT, HOST, function () {
    console.log(`Running on http://${HOST}:${PORT}`)
})