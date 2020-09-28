import config  from '../utils/endpoints'
const handleSignUp= async (body, callback)=>{
   let response=  await fetch(config.signUpUrl, {
        method:'Post',
        headers:{
            'Content-type':config.headers.contentType,

        },
        body:JSON.stringify({
          ...body
        })
    })
    .then((response)=>response.json())
    .then(resJson => resJson)
    .catch(err => err.message)
    if(response.error){
        return callback(response.error)
    }
    return callback(null, response)

}
export default handleSignUp
