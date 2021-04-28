const config = require('../config')
const db = require('../db')
const connectionDB = db.connectDb(config.iAuditMysql)

class TransactionModel {

    insertTransaction(account_id, transaction_date, category_type_id, transaction_type_id, transaction_value){
        return new Promise(function(resolve,reject){

            const INSERT = 'INSERT INTO i_audit.transaction (account_id, transaction_type_id, category_type_id, transaction_date, transaction_value)\n' +
                'VALUES (' + account_id + ', ' + transaction_type_id + ', ' + category_type_id + ', "' + transaction_date + '", ' + transaction_value + ');'

            connectionDB.query(INSERT, function (err, rows) {
                if (err) {
                    return reject(err)
                } else {
                    return resolve(rows)
                }
            })
        })
    }

    deleteTransaction(account_id, transaction_id){
        return new Promise(function(resolve,reject){

            const DELETE = 'DELETE FROM `i_audit`.`transaction`\n' +
                'WHERE `transaction_id` = ' + transaction_id + ' AND `account_id` = ' + account_id + ';'

            connectionDB.query(DELETE, function (err, rows) {
                if (err) {
                    return reject(err)
                } else {
                    return resolve(rows)
                }
            })
        })
    }

}

module.exports = TransactionModel