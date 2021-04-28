const config = require('../config')
const db = require('../db')
const connectionDB = db.connectDb(config.iAuditMysql)

class AccountModel {

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

    updateAccount(member_id, bank_id, account_type_id){
        return new Promise(function(resolve,reject){
            const UPDATE = ''

            connectionDB.query(UPDATE, function (err, rows) {
                if (err) {
                    return reject(err)
                } else {
                    return resolve(rows)
                }
            })
        })
    }

    selectAccount(account_id){
        return new Promise(function (resolve, reject){
            const SHOW = 'SELECT account.*, bank.bank_name, account_type.account_type FROM account\n' +
                'LEFT JOIN bank ON account.bank_id = bank.bank_id\n' +
                'LEFT JOIN account_type ON account.account_type_id = account_type.account_type_id\n' +
                'WHERE account_id = ' + account_id + ';'

            connectionDB.query(SHOW, function (err, rows) {
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