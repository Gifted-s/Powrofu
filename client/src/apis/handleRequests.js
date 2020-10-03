import config  from '../utils/endpoints'
const handleSignUp= async (body, callback)=>{
    fetch(config.signUpUrl, {
        method:'Post',
        headers:{
            'Content-type':config.headers.contentType,

        },
        body:JSON.stringify({
          ...body
        })
    })
    .then((response)=>response.json())
    .then(responseBody => callback(null, responseBody))
    .catch(err => callback(err.message))
    

}
export default handleSignUp
