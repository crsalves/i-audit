const config = require('../config')
const db = require('../db')
const connectionDB = db.connectDb(config.iAuditMysql)

class AccountModel {

    //Insert a new account into database
    insertAccount(member_id, bank_id, account_type_id){
        return new Promise(function(resolve,reject){
            const INSERT = 'INSERT INTO account(member_id, bank_id, account_type_id) ' +
                'VALUES("'
                + member_id + '", "'
                + bank_id + '", "'
                + account_type_id + '")'

            connectionDB.query(INSERT, function (err, rows) {
                if (err) {
                    return reject(err)
                } else {
                    return resolve(rows)
                }
            })
        })
    }

    showColumns(){
        return new Promise(function (resolve, reject){
            const SHOW = 'SHOW columns FROM account;'

            connectionDB.query(SHOW, function (err, rows) {
                if (err) {
                    return reject(err)
                } else {
                    return resolve(rows)
                }
            })
        })
    }

}

module.exports = AccountModel