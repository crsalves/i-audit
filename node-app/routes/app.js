const express = require('express')
const router = express.Router()
const MemberController = require('../controller/memberController')
const memberController = new MemberController()

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

    router.post('/transaction', async function (req, res) {
        if (req.isAuthenticated()) {
            var memberAccountTransactions = await memberController.getMemberAccountTransactions(req.body.account_id)
            res.render('transaction', {
                showLogin: false,
                isLoginAdmin: false,
                accountInfo: memberAccountTransactions[0][0],
                transactionsTable: memberAccountTransactions[1]
            })
        } else {
            res.render('index', {showLogin: true, isLoginAdmin: false})
        }
    })

    router.get('/logout', function (req, res) {
        req.logout()
        res.render('index', {showLogin: true, isLoginAdmin: false})
    })

    router.post('/account-add', async function (req, res) {
        if (req.isAuthenticated()) {
            try {
                var memberAccounts = await memberController.createMemberAccount(
                    req.user.id,
                    req.body.bank,
                    req.body.account_type
                )
                res.render('home', {showLogin: false, isLoginAdmin: false, memberAccounts: memberAccounts})
            } catch (err) {
                console.log(err)
                res.send("not-found")
            }
        } else {
            res.render('index', {showLogin: true, isLoginAdmin: false})
        }
    })

    router.post('/transaction-interval', async function (req, res) {
        if (req.isAuthenticated()) {
            var memberAccountTransactions = await memberController.getMemberAccountTransactionsByInterval(
                req.body.id,
                req.body.account_id,
                req.body.monthFilter,
                req.body.yearFilter
            )
            res.render('transaction', {
                showLogin: false,
                isLoginAdmin: false,
                accountInfo: memberAccountTransactions[0][0],
                transactionsTable: memberAccountTransactions[1]
            })
        } else {
            res.render('index', {showLogin: true, isLoginAdmin: false})
        }
    })

    router.post('/transaction-add', async function (req, res) {
        if (req.isAuthenticated()) {
            try {
                var memberAccountTransactions = await memberController.createMemberAccountTransaction(
                    req.body.account_id,
                    req.body.transaction_date,
                    req.body.category_type,
                    req.body.transaction_type,
                    req.body.transaction_value
                )
                res.render('transaction', {
                    showLogin: false,
                    isLoginAdmin: false,
                    accountInfo: memberAccountTransactions[0][0],
                    transactionsTable: memberAccountTransactions[1]
                })
            } catch (err) {
                console.log(err)
                res.send("not-found")
            }
        } else {
            res.render('index', {showLogin: true, isLoginAdmin: false})
        }
    })

    router.post('/transaction-edit', async function (req, res) {
        if (req.isAuthenticated()) {
            try {
                var memberAccountTransactions = await memberController.updateMemberAccountTransaction(
                    req.body.transaction_id,
                    req.body.account_id, req.body.transaction_date,
                    req.body.category_type,
                    req.body.transaction_type,
                    req.body.transaction_value
                )
                res.render('transaction', {
                    showLogin: false,
                    isLoginAdmin: false,
                    accountInfo: memberAccountTransactions[0][0],
                    transactionsTable: memberAccountTransactions[1]
                })
            } catch (err) {
                console.log(err)
                res.send("not-found")
            }
        } else {
            res.render('index', {showLogin: true, isLoginAdmin: false})
        }
    })

    router.post('/transaction-delete', async function (req, res) {
        if (req.isAuthenticated()) {
            try {
                var memberAccountTransactions = await memberController.deleteMemberAccountTransaction(
                    req.body.account_id,
                    req.body.transaction_id
                )
                res.render('transaction', {
                    showLogin: false,
                    isLoginAdmin: false,
                    accountInfo: memberAccountTransactions[0][0],
                    transactionsTable: memberAccountTransactions[1]
                })
            } catch (err) {
                console.log(err)
                res.send("not-found")
            }
        } else {
            res.render('index', {showLogin: true, isLoginAdmin: false})
        }
    })

    return router
}

