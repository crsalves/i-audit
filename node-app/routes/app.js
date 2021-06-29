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
                                    var memberAccounts = await memberController.getAllAccountsOfOneMember(req.user.id)
                                    var accountsTable = await memberController.sumAllTransactionsOfOneMember(memberAccounts)
                                    res.render('home', {showLogin: false, isLoginAdmin: false, accountsTable: accountsTable})
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
                            var memberAccounts = await memberController.getAllAccountsOfOneMember(req.user.id)
                            var accountsTable = await memberController.sumAllTransactionsOfOneMember(memberAccounts)
                            res.render('home', {showLogin: false, isLoginAdmin: false, accountsTable: accountsTable})
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
            var memberAccounts = await memberController.getAllAccountsOfOneMember(req.user.id)
            var accountsTable = await memberController.sumAllTransactionsOfOneMember(memberAccounts)
            res.render('home', {showLogin: false, isLoginAdmin: false, accountsTable: accountsTable})
        } else {
            res.render('index', {showLogin: true, isLoginAdmin: false})
        }
    })

    router.post('/transaction', async function (req, res) {
        if (req.isAuthenticated()) {
            var accountInfo = await accountController.getAccountInfo(req.body.account_id)
            var accountsTable = await memberController.sumAllTransactionsOfOneMember(accountInfo)
            var transactions = await memberController.getAllTransactionsOfOneMember(req.body.account_id)
            var transactionsTable = await transactionController.getTransactionTable(transactions)

            res.render('transaction', {
                showLogin: false,
                isLoginAdmin: false,
                accountInfo: accountsTable[0],
                transactionsTable: transactionsTable
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
                await accountController.createAccount(req.user.id, req.body.bank, req.body.account_type)
                var memberAccounts = await memberController.getAllAccountsOfOneMember(req.user.id)
                var accountsTable = await memberController.sumAllTransactionsOfOneMember(memberAccounts)

                res.render('home', {showLogin: false, isLoginAdmin: false, accountsTable: accountsTable})

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
            var accountInfo = await accountController.getAccountInfo(req.body.account_id)
            var accountsTable = await memberController.sumAllTransactionsOfOneMember(accountInfo)
            var transactions = await memberController.getAllTransactionsOfOneMember(req.body.account_id)
            var transactionsTable = await transactionController.getTransactionTableInterval(transactions, req.body.monthFilter, req.body.yearFilter)

            res.render('transaction', {
                showLogin: false,
                isLoginAdmin: false,
                accountInfo: accountsTable[0],
                transactionsTable: transactionsTable
            })
        } else {
            res.render('index', {showLogin: true, isLoginAdmin: false})
        }
    })

    router.post('/transaction-add', async function (req, res) {
        if (req.isAuthenticated()) {
            try {
                var account_id = req.body.account_id
                var transaction_date = req.body.transaction_date
                var category_type_id = req.body.category_type
                var transaction_type_id = req.body.transaction_type
                var transaction_value = req.body.transaction_value

                // Adjustment of the value. Note! Number 1 means Debit
                if (transaction_type_id == 1) {
                    transaction_value = transaction_value * (-1)
                }

                await transactionController.createTransaction(account_id, transaction_date, category_type_id, transaction_type_id, transaction_value)

                var accountInfo = await accountController.getAccountInfo(account_id)
                var accountsTable = await memberController.sumAllTransactionsOfOneMember(accountInfo)
                var transactions = await memberController.getAllTransactionsOfOneMember(account_id)
                var transactionsTable = await transactionController.getTransactionTable(transactions)

                res.render('transaction', {
                    showLogin: false,
                    isLoginAdmin: false,
                    accountInfo: accountsTable[0],
                    transactionsTable: transactionsTable
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
                var account_id = req.body.account_id
                var transaction_id = req.body.transaction_id
                var transaction_date = req.body.transaction_date
                var category_type_id = req.body.category_type
                var transaction_type_id = req.body.transaction_type
                var transaction_value = req.body.transaction_value

                // Adjustment of the value. Note! Number 1 means Debit
                if (transaction_type_id == 1) {
                    transaction_value = transaction_value * (-1)
                }

                await transactionController.updateTransaction(transaction_id, account_id, transaction_date, category_type_id, transaction_type_id, transaction_value)

                var accountInfo = await accountController.getAccountInfo(account_id)
                var accountsTable = await memberController.sumAllTransactionsOfOneMember(accountInfo)
                var transactions = await memberController.getAllTransactionsOfOneMember(account_id)
                var transactionsTable = await transactionController.getTransactionTable(transactions)

                res.render('transaction', {
                    showLogin: false,
                    isLoginAdmin: false,
                    accountInfo: accountsTable[0],
                    transactionsTable: transactionsTable
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
                var account_id = req.body.account_id
                var transactionToDelete = req.body.transaction_id

                if (transactionToDelete != null) {
                    if (typeof (transactionToDelete) != "string") {
                        for (var i = 0; i < transactionToDelete.length; i++) {
                            await transactionController.deleteOneTransaction(account_id, transactionToDelete[i])
                        }
                    } else {
                        await transactionController.deleteOneTransaction(account_id, transactionToDelete)
                    }
                }

                var accountInfo = await accountController.getAccountInfo(account_id)
                var accountsTable = await memberController.sumAllTransactionsOfOneMember(accountInfo)
                var transactions = await memberController.getAllTransactionsOfOneMember(account_id)
                var transactionsTable = await transactionController.getTransactionTable(transactions)

                res.render('transaction', {
                    showLogin: false,
                    isLoginAdmin: false,
                    accountInfo: accountsTable[0],
                    transactionsTable: transactionsTable
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

