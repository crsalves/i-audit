const AccountModel = require('../model/accountModel')
const accountModel = new AccountModel()

class AccountController {

    async createAccount(member_id, bank_id, account_type_id) {
        return new Promise(async function (resolve, reject) {
            try {
                var registeredAccount = await accountModel.insertAccount(member_id, bank_id, account_type_id)
                return resolve(registeredAccount)
            } catch (err) {
                return reject(err)
            }
        })
    }

    async getColumnFields() {
        return new Promise(async function (resolve, reject) {
            try {
                var columnFields = await accountModel.showColumns()
                return resolve(columnFields)
            } catch (err) {
                return reject(err)
            }
        })
    }


}

module.exports = AccountController