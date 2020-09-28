const signUp = require('../use-cases/index')
const makePostUser = require('./post-user')
const postUser  = makePostUser({signUp})

const controllers = Object.freeze({
    postUser
})

module.exports= controllers