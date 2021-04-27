const TransactionModel = require('../model/transactionModel')
const transactionModel = new TransactionModel()

class TransactionController {

    async createTransaction(account_id, date, category_type_id) {
        return new Promise(async function (resolve, reject) {
            try {
                var registeredTransaction = await transactionModel.insertTransaction(account_id, date, category_type_id)
                return resolve(registeredTransaction)
            } catch (err) {
                return reject(err)
            }
        })
    }

}

module.exports = TransactionController