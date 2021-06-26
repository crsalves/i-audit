const TransactionModel = require('../model/transactionModel')
const transactionModel = new TransactionModel()

class TransactionController {

    async getTransactionTable(transactions) {
        return new Promise(async function (resolve, reject) {
            try {
                var transactionsTable = []
                if (transactions != null) {
                    for (var i = 0; i < transactions.length; i++) {
                        var rawDate = new Date(transactions[i].transaction_date);

                        var formattedYear = rawDate.getFullYear();
                        var rawMonth = rawDate.getMonth() + 1;
                        var formattedMonth = rawMonth < 10 ? "0" + rawMonth : rawMonth;

                        var rawDay = rawDate.getDate();
                        var formattedDay = rawDay < 10 ? "0" + rawDay : rawDay;

                        var formattedDate = formattedYear + "/" + formattedMonth + "/" + formattedDay;

                        transactionsTable[i] = {
                            "transaction_id": transactions[i].transaction_id,
                            "account_id": transactions[i].account_id,
                            "transaction_date": transactions[i].transaction_date,
                            "transaction_date_formatted": formattedDate,
                            "category_type": transactions[i].category_type,
                            "transaction_type": transactions[i].transaction_type,
                            "transaction_value": transactions[i].transaction_value
                        }
                    }
                }
                return resolve(transactionsTable)
            } catch (err) {
                return reject(err)
            }
        })
    }


    async getTransactionTableInterval(transactions, mFilter, yFilter) {
        return new Promise(async function (resolve, reject) {
            try {
                var transactionsTable = []

                if (transactions != null) {
                    for (var i = 0; i < transactions.length; i++) {

                        var date = new Date(transactions[i].transaction_date);
                        var yr = date.getFullYear();
                        var month = date.getMonth() + 1;

                        // These data are from ejs page
                        var monthFilter = mFilter
                        var yearFilter = yFilter

                        if (month == monthFilter && yr == yearFilter) {
                            var rawDate = new Date(transactions[i].transaction_date);

                            var formattedYear = rawDate.getFullYear();
                            var rawMonth = rawDate.getMonth() + 1;
                            var formattedMonth = rawMonth < 10 ? "0" + rawMonth : rawMonth;

                            var rawDay = rawDate.getDate();

                            var formattedDay = rawDay < 10 ? "0" + rawDay : rawDay;

                            var formattedDate = formattedYear + "/" + formattedMonth + "/" + formattedDay;

                            transactionsTable[i] = {
                                "transaction_id": transactions[i].transaction_id,
                                "account_id": transactions[i].account_id,
                                "transaction_date": transactions[i].transaction_date,
                                "transaction_date_formatted": formattedDate,
                                "category_type": transactions[i].category_type,
                                "transaction_type": transactions[i].transaction_type,
                                "transaction_value": transactions[i].transaction_value
                            }
                        }
                    }
                }

                return resolve(transactionsTable)
            } catch (err) {
                return reject(err)
            }
        })
    }


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

    async updateTransaction(transaction_id, account_id, transaction_date, category_type_id, transaction_type_id, transaction_value) {
        return new Promise(async function (resolve, reject) {
            try {
                var result = await transactionModel.updateTransaction(transaction_id, account_id, transaction_date, category_type_id, transaction_type_id, transaction_value)
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