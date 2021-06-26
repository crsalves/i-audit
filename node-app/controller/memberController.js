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

    async sumAllTransactionsOfOneMember(memberAccounts) {
        return new Promise(async function (resolve, reject) {
            try {
                var accountsTable = []
                var totalTransactionValues = 0
                for (var i = 0; i < memberAccounts.length; i++) {
                    var innerMemberAccounts = await memberModel.selectMemberTransactions(memberAccounts[i].account_id)

                    totalTransactionValues = 0
                    innerMemberAccounts.forEach(element =>{
                        totalTransactionValues += element.transaction_value
                    })

                    accountsTable.push({
                        "account_id": memberAccounts[i].account_id,
                        "member_id": memberAccounts[i].member_id,
                        "bank_id": memberAccounts[i].bank_id,
                        "bank_name": memberAccounts[i].bank_name,
                        "account_type_id": memberAccounts[i].account_type_id,
                        "account_type": memberAccounts[i].account_type,
                        "balance": totalTransactionValues
                    })
                }
                return resolve(accountsTable)
            } catch (err) {
                return reject(err)
            }
        })
    }

}

module.exports = MemberController