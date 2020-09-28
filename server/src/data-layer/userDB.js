const bcrypt = require('bcryptjs')
module.exports =  function makeUserDB ({ makeDb }) {
  return Object.freeze({
    insert,findByEmail
  })


  async function insert ({ ...userInfo }) {
    const db = await makeDb()
    const addedResult = await db.collection('users').insertOne({ ...userInfo, password:bcrypt.hashSync(userInfo.password,bcrypt.genSaltSync(10)) })
    return addedResult.ops[0]
  }
  async function findByEmail(email) {
    const db = await makeDb()
    const result = await db.collection('users').find({ email })
    const found = await result.toArray()
    if (found.length === 0) {
      return null
    }
    const { ...info } = found[0]
    return info
  }
}
