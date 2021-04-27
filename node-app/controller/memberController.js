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
                var memberAccounts = await memberModel.selectMemberAccounts(member_id)
                return resolve(memberAccounts)
            } catch (err) {
                return reject(err)
            }
        })
    }
}

module.exports = MemberController