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
        if (req.isAuthenticated()) {
            var member_id = req.user.id
            var accounts = await memberController.getAllAccountsOfOneMember(member_id)

            var accountsTable = []
            for (var i = 0; i < accounts.length; i++) {
                var balance = await memberController.sumAllTransactionsOfOneMember(accounts[i].account_id)
                accountsTable.push({
                    "account_id": accounts[i].account_id,
                    "bank_id": accounts[i].bank_id,
                    "bank_name": accounts[i].bank_name,
                    "account_type_id": accounts[i].account_type_id,
                    "account_type": accounts[i].account_type,
                    "balance": balance
                })
            }

            res.render('home', {showLogin: false, isLoginAdmin: false, accountsTable: accountsTable})
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
                                    var member_id = req.user.id
                                    var accounts = await memberController.getAllAccountsOfOneMember(member_id)

                                    var accountsTable = []
                                    for (var i = 0; i < accounts.length; i++) {
                                        var balance = await memberController.sumAllTransactionsOfOneMember(accounts[i].account_id)
                                        accountsTable.push({
                                            "account_id": accounts[i].account_id,
                                            "bank_id": accounts[i].bank_id,
                                            "bank_name": accounts[i].bank_name,
                                            "account_type_id": accounts[i].account_type_id,
                                            "account_type": accounts[i].account_type,
                                            "balance": balance
                                        })
                                    }

                                    res.render('home', {
                                        showLogin: false,
                                        isLoginAdmin: false,
                                        accountsTable: accountsTable
                                    })

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
                            var member_id = req.user.id
                            var accounts = await memberController.getAllAccountsOfOneMember(member_id)

                            var accountsTable = []
                            for (var i = 0; i < accounts.length; i++) {
                                var balance = await memberController.sumAllTransactionsOfOneMember(accounts[i].account_id)
                                if (balance == null) {
                                    balance = 0
                                }
                                accountsTable.push({
                                    "account_id": accounts[i].account_id,
                                    "bank_id": accounts[i].bank_id,
                                    "bank_name": accounts[i].bank_name,
                                    "account_type_id": accounts[i].account_type_id,
                                    "account_type": accounts[i].account_type,
                                    "balance": balance
                                })
                            }

                            res.render('home', {showLogin: false, isLoginAdmin: false, accountsTable: accountsTable})
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
            try {
                var member_id = req.user.id
                var bank_id = req.body.bank
                var account_type_id = req.body.account_type
                var account_id = req.body.account_id


                var newAccount = await accountController.createAccount(member_id, bank_id, account_type_id)
                var accounts = await memberController.getAllAccountsOfOneMember(member_id)
                var balance = await memberController.sumAllTransactionsOfOneMember(account_id)

                var accountsTable = []
                if (balance == null) {
                    balance = 0
                }
                accounts.forEach(element =>
                    accountsTable.push({
                        "account_id": element.account_id,
                        "bank_id": element.bank_id,
                        "bank_name": element.bank_name,
                        "account_type_id": element.account_type_id,
                        "account_type": element.account_type,
                        "balance": balance
                    }))

                res.render('home', {showLogin: false, isLoginAdmin: false, accountsTable: accountsTable})

            } catch (err) {
                console.log(err)
                res.send("not-found")
            }

        } else {
            res.render('index', {showLogin: true, isLoginAdmin: false})
        }
    })

    router.post('/transaction', async function (req, res) {
        if (req.isAuthenticated()) {
            var account_id = req.body.account_id
            var result = await accountController.getAccountInfo(account_id)
            var balance = await memberController.sumAllTransactionsOfOneMember(account_id)
            if (balance == null) {
                balance = 0
            }
            var accountInfo = {
                "account_id": result[0].account_id,
                "member_id": result[0].member_id,
                "bank_id": result[0].bank_id,
                "bank_name": result[0].bank_name,
                "account_type_id": result[0].account_type_id,
                "account_type": result[0].account_type,
                "balance": balance
            }
            var transactions = await memberController.getAllTransactionsOfOneMember(account_id)

            var transactionsTable = []
            if (balance == null) {
                balance = 0
            }
            if (transactions != null) {
                transactions.forEach(element =>
                    transactionsTable.push({
                        "transaction_id": element.transaction_id,
                        "account_id": element.account_id,
                        "transaction_date": element.transaction_date,
                        "category_type": element.category_type,
                        "transaction_type": element.transaction_type,
                        "transaction_value": element.transaction_value,
                        "balance": balance
                    }))
            }

            const DATE = new Date()
            const month = (DATE.getUTCMonth() + 1)
            const day = DATE.getUTCDate()
            const year = DATE.getUTCFullYear()
            const hour = DATE.getUTCHours()
            const minute = DATE.getUTCMinutes()
            const second = DATE.getUTCSeconds()

            var currentDate = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second

            res.render('transaction', {
                showLogin: false,
                isLoginAdmin: false,
                accountInfo: accountInfo,
                transactionsTable: transactionsTable, currentDate: currentDate
            })


        } else {
            res.render('index', {showLogin: true, isLoginAdmin: false})
        }
    })

    router.post('/add-transaction', async function (req, res) {
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

                var newTransaction = await transactionController.createTransaction(account_id, transaction_date, category_type_id, transaction_type_id, transaction_value)
                var transactions = await memberController.getAllTransactionsOfOneMember(account_id)

                var transactionsTable = []
                if (transactions != null) {
                    transactions.forEach(element =>
                        transactionsTable.push({
                            "transaction_id": element.transaction_id,
                            "account_id": element.account_id,
                            "transaction_date": element.transaction_date,
                            "category_type": element.category_type,
                            "transaction_type": element.transaction_type,
                            "transaction_value": element.transaction_value
                        }))
                }

                var balance = await memberController.sumAllTransactionsOfOneMember(account_id)
                if (balance == null) {
                    balance = 0
                }
                var result = await accountController.getAccountInfo(account_id)
                var accountInfo = {
                    "account_id": result[0].account_id,
                    "member_id": result[0].member_id,
                    "bank_id": result[0].bank_id,
                    "bank_name": result[0].bank_name,
                    "account_type_id": result[0].account_type_id,
                    "account_type": result[0].account_type,
                    "balance": balance
                }

                res.render('transaction', {
                    showLogin: false,
                    isLoginAdmin: false,
                    accountInfo: accountInfo,
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

    router.post('/del-transaction', async function (req, res) {
        if (req.isAuthenticated()) {
            try {
                var account_id = req.body.account_id
                var transactionToDelete = req.body.transaction_id
                if (transactionToDelete != null) {
                    for(var i = 0; i < transactionToDelete.length; i++){
                        var deletedTransactions = await transactionController.deleteOneTransaction(account_id, transactionToDelete[i])
                    }
                }
                var transactions = await memberController.getAllTransactionsOfOneMember(account_id)

                var transactionsTable = []
                if (transactions != null) {
                    transactions.forEach(element =>
                        transactionsTable.push({
                            "transaction_id": element.transaction_id,
                            "account_id": element.account_id,
                            "transaction_date": element.transaction_date,
                            "category_type": element.category_type,
                            "transaction_type": element.transaction_type,
                            "transaction_value": element.transaction_value
                        }))
                }

                var balance = await memberController.sumAllTransactionsOfOneMember(account_id)
                if (balance == null) {
                    balance = 0
                }
                var result = await accountController.getAccountInfo(account_id)
                var accountInfo = {
                    "account_id": result[0].account_id,
                    "member_id": result[0].member_id,
                    "bank_id": result[0].bank_id,
                    "bank_name": result[0].bank_name,
                    "account_type_id": result[0].account_type_id,
                    "account_type": result[0].account_type,
                    "balance": balance
                }

                res.render('transaction', {
                    showLogin: false,
                    isLoginAdmin: false,
                    accountInfo: accountInfo,
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