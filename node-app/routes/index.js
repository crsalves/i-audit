const express = require('express')
const router = express.Router()
const MemberController = require('../controller/memberController')
const memberController = new MemberController()
const AccountController = require('../controller/accountController')
const accountController = new AccountController()
const TransactionController = require('../controller/transactionController')
const transactionController = new TransactionController()

module.exports = function (passport, saltRounds, bcrypt) {

    router.get('/', function (req, res) {
        res.render('index', {showLogin: true, isLoginAdmin: false})
    })

    router.get('/home', async function (req, res) {
        if (req.isAuthenticated())
        {
            var accountsTable = await memberController.getAllAccountsOfOneMember(req.user.id)

            if (accountsTable[0] != null) {
                res.render('home', {showLogin: false, isLoginAdmin: false, accountsTable: accountsTable})
            } else {
                res.render('home', {showLogin: false, isLoginAdmin: false, accountsTable: null})
            }
        } else {
            res.render('index', {showLogin: true, isLoginAdmin: false})
        }
    })

    router.post('/register', function (req, res, next) {
        bcrypt.hash(req.body.memberPasswordLogin, saltRounds, async function (err, hash) {
            try {
                var member = await memberController.registerMember(req.body.usernameLogin, hash)

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
                                    var accountsTable = await memberController.getAllAccountsOfOneMember(req.user.id)

                                    if (accountsTable[0] != null) {
                                        res.render('home', {
                                            showLogin: false,
                                            isLoginAdmin: false,
                                            accountsTable: accountsTable
                                        })
                                    } else {
                                        res.render('home', {showLogin: false, isLoginAdmin: false, accountsTable: null})
                                    }
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
                            var accountsTable = await memberController.getAllAccountsOfOneMember(req.user.id)

                            if (accountsTable[0] != null) {
                                res.render('home', {
                                    showLogin: false,
                                    isLoginAdmin: false,
                                    accountsTable: accountsTable
                                })
                            } else {
                                res.render('home', {showLogin: false, isLoginAdmin: false, accountsTable: null})
                            }
                        } else {
                            res.render('index', {showLogin: true, isLoginAdmin: false})
                        }
                    }
                })
            }
        })(req, res, next)
    })

    router.get('/logout', function (req, res) {
        req.logout()
        res.render('index', {showLogin: true, isLoginAdmin: false})
    })

    router.post('/account', async function (req, res) {
        if (req.isAuthenticated()) {
            var member_id = req.user.id
            var bank_id = req.body.bank_id
            var account_type_id = req.body.account_type_id

            try {
                var newAccount = await accountController.createAccount(member_id, bank_id, account_type_id)
                var accountsTable = await memberController.getAllAccountsOfOneMember(req.user.id)

                if (accountsTable[0] != null) {
                    res.render('home', {
                        showLogin: false,
                        isLoginAdmin: false,
                        accountsTable: accountsTable
                    })
                } else {
                    res.render('home', {showLogin: false, isLoginAdmin: false, accountsTable: null})
                }
            } catch (err) {
                console.log(err)
                res.send("not-found")
            }

        } else {
            res.render('index', {showLogin: true, isLoginAdmin: false})
        }
    })

    router.get('/transaction', function (req, res) {
        if (req.isAuthenticated()) {
            var columnsTable = []
            var transactionsTable = []
            res.render('transaction', {
                showLogin: false,
                isLoginAdmin: false,
                columnsTable: columnsTable,
                transactionsTable: transactionsTable
            })
        } else {
            res.render('index', {showLogin: true, isLoginAdmin: false})
        }
    })
    router.post('/transaction', async function (req, res) {
        if (req.isAuthenticated()) {
            var account_id = req.body.account_id
            var date = req.body.date
            var category_type_id = req.body.category_type_id

            try {
                var newTransaction = await transactionController.createTransaction(account_id, date, category_type_id)
                res.send(newTransaction)

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