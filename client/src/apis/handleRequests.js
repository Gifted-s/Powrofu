import config from '../utils/endpoints'
const handleSignUp = (body) => {
 
        let response =  fetch(config.signUpUrl, {
            method: 'Post',
            headers: {
                'Content-type': config.headers.contentType,
    
            },
            body: JSON.stringify({
                ...body
            })
        })
        .then(res=> res.json())
        .then(resJson => resJson)
        .catch(err=> err)
      return response
    
}
export default handleSignUp
