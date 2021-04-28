const MemberModel = require('../model/memberModel')
const memberModel = new MemberModel()

class MemberController {

    async registerMember(usernameLogin, hash) {
        return new Promise(async function (resolve, reject) {
            try {
                var registeredMember = await memberModel.insertMember(usernameLogin, hash)
                return resolve(registeredMember)
            } catch (err) {
                return reject(err)
            }
        })
    }

    async getAllAccountsOfOneMember(member_id) {
        return new Promise(async function (resolve, reject) {
            try {
                var memberAccounts = await memberModel.selectMemberAccounts(member_id)
                return resolve(memberAccounts)
            } catch (err) {
                return reject(err)
            }
        })
    }

    async getAllTransactionsOfOneMember(account_id) {
        return new Promise(async function (resolve, reject) {
            try {
                var memberAccounts = await memberModel.selectMemberTransactions(account_id)
                return resolve(memberAccounts)
            } catch (err) {
                return reject(err)
            }
        })
    }

    async sumAllTransactionsOfOneMember(account_id) {
        return new Promise(async function (resolve, reject) {
            try {
                var memberAccounts = await memberModel.selectMemberTransactions(account_id)

                var totalTransactionValues = 0
                memberAccounts.forEach(element =>{
                    totalTransactionValues += element.transaction_value
                })
                return resolve(totalTransactionValues)
            } catch (err) {
                return reject(err)
            }
        })
    }

}

module.exports = MemberController