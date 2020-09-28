const User = require("../data-layer");
const buildSignUp = require('./sign-up')
const  signUp = buildSignUp({User})
module.exports = signUp