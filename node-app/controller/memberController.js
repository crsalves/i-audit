const MemberModel = require('../model/memberModel')
const memberModel = new MemberModel()

class MemberController {

    async registerMember(usernameLogin, hash) {
        return new Promise(async function (resolve, reject) {
            try {
                var registeredMember = await memberModel.insertMember(usernameLogin, hash)
                return resolve(registeredMember)
            } catch (err) {
                return reject(err)
            }
        })
    }

    async getAllAccountsOfOneMember(member_id) {
        return new Promise(async function (resolve, reject) {
            try {
                var result = await memberModel.selectMemberAccounts(member_id)
                var memberAccounts = []
                result.forEach(element =>
                    memberAccounts.push({
                        "bank_name": element.bank_name,
                        "account_type": element.account_type
                }))
                return resolve(memberAccounts)
            } catch (err) {
                return reject(err)
            }
        })
    }
}

module.exports = MemberController