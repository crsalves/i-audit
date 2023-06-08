const MemberModel = require('../model/memberModel')
const memberModel = new MemberModel()

const AccountController = require('../controller/accountController')
const accountController = new AccountController()
const TransactionController = require('../controller/transactionController')
const transactionController = new TransactionController()


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

    async createMemberAccount(member_id, bank_id, account_type_id) {
        await accountController.createAccount(member_id, bank_id, account_type_id)
        var memberAccounts = await this.getMemberAccounts(member_id)

        return new Promise(async function (resolve, reject) {
            try {
                return resolve(memberAccounts)
            } catch (err) {
                return reject(err)
            }
        })
    }

    async getMemberAccounts(member_id) {
        var accounts = await this.getAllAccountsOfOneMember(member_id)
        var memberAccounts = await this.getBalance(accounts)
        return new Promise(async function (resolve, reject) {
            try {
                return resolve(memberAccounts)
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

    async getMemberAccountTransactions(account_id) {
        var memberAccountTransactions = [2]
        var accountInfo = await accountController.getAccountInfo(account_id)
        memberAccountTransactions[0] = await this.getBalance(accountInfo)

        var transactions = await this.getAllTransactionsOfOneMember(account_id)
        memberAccountTransactions[1] = await transactionController.getTransactionTable(transactions)

        return new Promise(async function (resolve, reject) {
            try {
                return resolve(memberAccountTransactions)
            } catch (err) {
                return reject(err)
            }
        })
    }

    async getMemberAccountTransactionsByInterval(member_id, account_id, monthFilter, yearFilter) {
        var memberAccountTransactions = [2]
        var accountInfo = await accountController.getAccountInfo(account_id)
        memberAccountTransactions[0] = await this.getBalance(accountInfo)

        var transactions = await this.getAllTransactionsOfOneMember(account_id)
        memberAccountTransactions[1] = await transactionController.getTransactionTableInterval(transactions, monthFilter, yearFilter)

        return new Promise(async function (resolve, reject) {
            try {
                return resolve(memberAccountTransactions)
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

    async getBalance(memberAccounts) {
        return new Promise(async function (resolve, reject) {
            try {
                var accountsTable = []
                var totalTransactionValues = 0
                for (var i = 0; i < memberAccounts.length; i++) {
                    var innerMemberAccounts = await memberModel.selectMemberTransactions(memberAccounts[i].account_id)

                    totalTransactionValues = 0
                    innerMemberAccounts.forEach(element => {
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

    async createMemberAccountTransaction(account_id, transaction_date, category_type_id, transaction_type_id, transaction_value) {
        await transactionController.createTransaction(
            account_id,
            transaction_date,
            category_type_id,
            transaction_type_id,
            transaction_value
        )
        var memberAccountTransactions = await this.getMemberAccountTransactions(account_id)

        return new Promise(async function (resolve, reject) {
            try {
                return resolve(memberAccountTransactions)
            } catch (err) {
                return reject(err)
            }
        })
    }

    async updateMemberAccountTransaction(transaction_id, account_id, transaction_date, category_type_id, transaction_type_id, transaction_value) {

        await transactionController.updateTransaction(
            transaction_id,
            account_id,
            transaction_date,
            category_type_id,
            transaction_type_id,
            transaction_value
        )

        var memberAccountTransactions = await this.getMemberAccountTransactions(account_id)

        return new Promise(async function (resolve, reject) {
            try {
                return resolve(memberAccountTransactions)
            } catch (err) {
                return reject(err)
            }
        })
    }

    async deleteMemberAccountTransaction(account_id, transaction_id) {
        if (transaction_id != null) {
            if (typeof (transaction_id) != "string") {
                for (var i = 0; i < transaction_id.length; i++) {
                    await transactionController.deleteOneTransaction(account_id, transaction_id[i])
                }
            } else {
                await transactionController.deleteOneTransaction(account_id, transaction_id)
            }
            var memberAccountTransactions = await this.getMemberAccountTransactions(account_id)
        }
        return new Promise(async function (resolve, reject) {
            try {
                return resolve(memberAccountTransactions)
            } catch (err) {
                return reject(err)
            }
        })
    }

}

module.exports = MemberController