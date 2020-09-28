module.exports =  function makePostUser ({ signUp }) {
  return async function postUser (httpRequest) {
    try {
      const {...userInfo } = httpRequest.body
      
      const addedUser = await signUp(userInfo)
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        statusCode: 201,
        body: { status:'success', user:addedUser }
      }
    } catch (e) {
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 400,
        body: {
          error: e.message
        }
      }
    }
  }
}
