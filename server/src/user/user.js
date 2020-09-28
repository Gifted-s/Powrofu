module.exports = function buildMakeUser(){
    return function makeUser({...user}){
        const  {firstName, email,location, gender, password} = user
        if(!firstName){
          throw new Error('User must have a first name')
        }
        if(!gender){
            throw new Error('User must have a gender')
        }
        if(!password){
            throw new Error('User must have a password')
        }
        if(!email){
            throw new Error('User must have an email')
        }
        if(!location){
            throw new Error('User must have a location')
        }
        return Object.freeze({
            getFirstName:()=> firstName,
            getGender:()=> gender,
            getPassword:()=> password,
            getEmail: ()=> email,
            getLocation:()=> location
        })
        
      }
    
}