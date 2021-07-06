const express = require('express')
const router = express.Router()
const MemberController = require('../controller/memberController')
const memberController = new MemberController()

module.exports = function () {

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

    return router
}

