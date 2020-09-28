const makeUser = require("../user")

module.exports = function buildSignUp({ User }) {
    return async function signUp({ ...user }) {
        const validatedUser = makeUser(user)
         let userExist = await User.findByEmail(validatedUser.getEmail())
            if(userExist){
                throw new Error('user exists, try login')
            }
            const addedUser= await User.insert({
                email: validatedUser.getEmail(),
                firstName: validatedUser.getFirstName(),
                location: validatedUser.getLocation(),
                gender: validatedUser.getGender(),
                password:validatedUser.getPassword()
            })
            return addedUser
    }
}