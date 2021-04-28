const TransactionModel = require('../model/transactionModel')
const transactionModel = new TransactionModel()

class TransactionController {

    async createTransaction(account_id, transaction_date, category_type_id, transaction_type_id, transaction_value) {
        return new Promise(async function (resolve, reject) {
            try {
                var registeredTransaction = await transactionModel.insertTransaction(account_id, transaction_date, category_type_id, transaction_type_id, transaction_value)
                return resolve(registeredTransaction)
            } catch (err) {
                return reject(err)
            }
        })
    }

    async editTransaction(account_id, transaction_id, transaction_date, category_type_id, transaction_type_id, transaction_value) {
        return new Promise(async function (resolve, reject) {
            try {
                var registeredTransaction = await transactionModel.updateTransaction(account_id, transaction_id, transaction_date, category_type_id, transaction_type_id, transaction_value)
                return resolve(registeredTransaction)
            } catch (err) {
                return reject(err)
            }
        })
    }

}

module.exports = TransactionController