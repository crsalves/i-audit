const TransactionModel = require('../model/transactionModel')
const transactionModel = new TransactionModel()

class TransactionController {

    async createTransaction(account_id, transaction_date, category_type_id, transaction_type_id, transaction_value) {
        return new Promise(async function (resolve, reject) {
            try {
                var result = await transactionModel.insertTransaction(account_id, transaction_date, category_type_id, transaction_type_id, transaction_value)
                return resolve(result)
            } catch (err) {
                return reject(err)
            }
        })
    }

    async deleteOneTransaction(account_id, transaction_id) {
        return new Promise(async function (resolve, reject) {
            try {
                var result = await transactionModel.deleteTransaction(account_id, transaction_id)
                return resolve(result)
            } catch (err) {
                return reject(err)
            }
        })
    }
}

module.exports = TransactionController