const express = require('express')
const router = express.Router()
const MemberController = require('../controller/memberController')
const memberController = new MemberController()


const accountRoute = require('./account')
const transactionRoute = require('./transaction')

module.exports = function (passport, saltRounds, bcrypt) {

    router.get('/', function (req, res) {
        res.render('index', {showLogin: true, isLoginAdmin: false})
    })

    router.post('/register', function (req, res, next) {
        bcrypt.hash(req.body.memberPasswordLogin, saltRounds, async function (err, hash) {
            try {
                await memberController.registerMember(req.body.usernameLogin, hash)
                passport.authenticate("local", function (err, user, info) {
                    if (info) {
                        res.render('index', {showLogin: true, isLoginAdmin: false})
                    } else if (err) {
                        return next(err)
                    } else {
                        req.login(user, async function (err) {
                            if (err) {
                                return next(err)
                            } else {
                                if (req.isAuthenticated()) {
                                    var memberAccounts = await memberController.getMemberAccounts(req.user.id)
                                    res.render('home', {showLogin: false, isLoginAdmin: false, memberAccounts: memberAccounts})
                                } else {
                                    res.render('index', {showLogin: true, isLoginAdmin: false})
                                }
                            }
                        })
                    }
                })(req, res, next)
            } catch (err) {
                res.send("not-found")
            }
        })
    })

    router.post('/login', function (req, res, next) {
        passport.authenticate("local", function (err, user, info) {
            if (info) {
                res.render('index', {showLogin: true, isLoginAdmin: false})
            } else if (err) {
                return next(err)
            } else {
                req.login(user, async function (err) {
                    if (err) {
                        return next(err)
                    } else {
                        if (req.isAuthenticated()) {
                            var memberAccounts = await memberController.getMemberAccounts(req.user.id)
                            res.render('home', {showLogin: false, isLoginAdmin: false, memberAccounts: memberAccounts})
                        } else {
                            res.render('index', {showLogin: true, isLoginAdmin: false})
                        }
                    }
                })
            }
        })(req, res, next)
    })

    router.get('/home', async function (req, res) {
        if (req.isAuthenticated()) {
            var memberAccounts = await memberController.getMemberAccounts(req.user.id)
            res.render('home', {showLogin: false, isLoginAdmin: false, memberAccounts: memberAccounts})
        } else {
            res.render('index', {showLogin: true, isLoginAdmin: false})
        }
    })

    router.get('/logout', function (req, res) {
        req.logout()
        res.render('index', {showLogin: true, isLoginAdmin: false})
    })


    router.use('/', accountRoute())
    router.use('/', transactionRoute())

    return router
}

