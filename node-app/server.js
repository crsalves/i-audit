const express = require('express')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const bodyParser = require('body-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const routes = require('./routes/index')
const methodOverride = require('method-override')
const bcrypt = require("bcrypt")
const saltRounds = 10

// Constants and variables section
const PORT = 8080
const HOST = '0.0.0.0'

// Database section
const config = require('./config')
const db = require('./db')
const connectionDB = db.connectDb(config.iAuditMysql)

passport.use(new LocalStrategy({
    usernameField: "usernameLogin",
    passwordField: "memberPasswordLogin"
}, function (email, password, done) {

    const SELECT = 'SELECT * FROM member WHERE member_email=?'

    connectionDB.query(SELECT, email, function (err, rows) {
        if (err) {
            return done(err)
        } else {

            if (rows.length === 1) {
                bcrypt.compare(password, rows[0].member_password, function (err, result) {
                    if (result) {
                        return done(null, {id: rows[0].member_id})
                    } else {
                        return done(null, false, {message: "Password do not match"})
                    }
                })// end bcrypt

            } else if (rows.length === 0) {
                return done(null, false, {message: "User does not match"})
            } else if (rows.length > 1) {
                return done(null, false, {message: "More than one user was founded"})
            }
        }
    })
}))

// tell passport how to serialize the user
passport.serializeUser((user, done) => {
    done(null, user.id)
})
passport.deserializeUser((id, done) => {
    const SELECT = 'SELECT * FROM member WHERE member_id=?'

    connectionDB.query(SELECT, id, function (err, rows) {
        if (rows.length === 1) {
            user = {id: id}

        } else if (rows.length === 0) {
            user = false
        }
        done(null, user)
    })
})

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static("public"))

// add & configure middleware
app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
}))

app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', 'ejs')
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}))

app.use('/', routes(passport, saltRounds, bcrypt))

app.listen(PORT, HOST, function () {
    console.log(`Running on http://${HOST}:${PORT}`)
})