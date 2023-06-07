const express = require('express')
const router = express.Router()
const MemberController = require('../controller/memberController')
const memberController = new MemberController()

module.exports = function () {

    router.post('/', async function (req, res) { // This POST method works as a GET
        if (req.isAuthenticated()) {
            var memberAccountTransactions = await memberController.getMemberAccountTransactions(req.body.account_id) // This line calls the controller -> model (consult DB) -> views (to create html page through ejs) -> render to routes
            res.render('transaction', {
                showLogin: false,
                isLoginAdmin: false,
                accountInfo: memberAccountTransactions[0][0],
                transactionsTable: memberAccountTransactions[1]
            })
        } else {
            res.render('index', { showLogin: true, isLoginAdmin: false })
        }
    })

    router.post('/interval', async function (req, res) {
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
            res.render('index', { showLogin: true, isLoginAdmin: false })
        }
    })

    router.post('/add', async function (req, res) {
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
            res.render('index', { showLogin: true, isLoginAdmin: false })
        }
    })

    router.post('/edit', async function (req, res) {
        if (req.isAuthenticated()) {
            try {
                console.log(req.body.transaction_id)
                var memberAccountTransactions = await memberController.updateMemberAccountTransaction(
                    req.body.transaction_id,
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
            res.render('index', { showLogin: true, isLoginAdmin: false })
        }
    })

    router.post('/delete', async function (req, res) {
        if (req.isAuthenticated()) {
            try {
                console.log("account id: ", req.body.account_id)
                console.log("transaction id: ", req.body.transaction_id)

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
                res.send("not-found bingo")
            }
        }
        else {
            res.render('index', { showLogin: true, isLoginAdmin: false })
        }
    })

    return router
}

