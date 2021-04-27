const config = require('../config')
const db = require('../db')
const connectionDB = db.connectDb(config.iAuditMysql)

class TransactionModel {

    //Insert a new transaction into database
    insertTransaction(account_id, date, category_type_id){
        return new Promise(function(resolve,reject){
            const INSERT = 'INSERT INTO account(account_id, date, category_type_id) ' +
                'VALUES("'
                + account_id + '", "'
                + date + '", "'
                + category_type_id + '")'

            connectionDB.query(INSERT, function (err, rows) {
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