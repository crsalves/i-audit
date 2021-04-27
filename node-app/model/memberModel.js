const config = require('../config')
const db = require('../db')
const connectionDB = db.connectDb(config.iAuditMysql)

class MemberModel {

    //Insert a new member into database
    insertMember(usernameLogin, hash){
        return new Promise(function(resolve,reject){
            const INSERT = 'INSERT INTO member(member_email, member_password) ' +
                'VALUES("'
                + usernameLogin + '", "'
                + hash + '")'

            connectionDB.query(INSERT, function (err, rows) {
                if (err) {
                    return reject(err)
                } else {
                    return resolve(rows)
                }
            })
        })
    }

    selectMemberAccounts(member_id){
        return new Promise(function(resolve, reject){
            const SELECT = 'SELECT account.*, bank.bank_name, account_type.account_type FROM account\n' +
                'INNER JOIN bank ON account.bank_id = bank.bank_id\n' +
                'INNER JOIN account_type ON account.account_type_id = account_type.account_type_id\n' +
                'WHERE member_id = ' + member_id + '\n' +
                'ORDER BY bank_name;'

            connectionDB.query(SELECT, function(err, rows){
                if(err){
                    return reject(err)
                }else {
                    return resolve(rows)
                }
            })
        })
    }
}

module.exports = MemberModel