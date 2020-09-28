
const axios = require('axios')
const  mongodb  = require('mongodb') 
const MongoClient = mongodb.MongoClient
const {connection} = require('../index')
let db;
let client;
beforeAll(async () => {

    axios.defaults.headers.common['Content-Type'] = 'application/json'
    axios.defaults.validateStatus = function (status) {
        // Throw only if the status code is greater than or equal to 500
        return status < 500
    }   
     
    //connect to database fot testing
    const dbName = 'PowerUserDBtest'
      client = new MongoClient('mongodb://127.0.0.1:27017', { useNewUrlParser: true, useUnifiedTopology:true })
     async function makeDb () {
      if (!client.isConnected()) {
        await client.connect()
      }
      return client.db(dbName)
    }  

     db =  await makeDb()
})


afterAll(async ( )=>{
    // clear database
  await db.collection('users').deleteMany({})
  await client.close()
  connection.close()
  
   

})
let root = 'http://localhost:4000'
describe('signup a user', () => {
    it('will not add a user without firstname', async () => {

        const response = await axios.post(
            root + '/signup',
            {
                firstName: '',
                location: 'Yasme, Cameroon Long 35° Lat 80°',
                gender: 'female',
                email: 'test@gmail.com',
                password:'##dfdfdf'
            }
        )
      
        expect(response.status).toBe(400)
        expect(response.data.error).toBe('User must have a first name')
        
    })
    it('will not add a user without gender', async () => {

        const response = await axios.post(
            root + '/signup',
            {
                firstName: 'test name',
                location: 'Yasme, Cameroon Long 35° Lat 80°',
                gender: '',
                email: 'test@gmail.com',
                password:'###sjdhbdf'
            }
        )
      
        expect(response.status).toBe(400)
        expect(response.data.error).toBe('User must have a gender')
        
    })

    it('will not add a user without an email', async () => {

        const response = await axios.post(
            root + '/signup',
            {
                firstName: 'test name',
                location: 'Yasme, Cameroon Long 35° Lat 80°',
                gender: 'male',
                email: '',
                password:'#2323nhjkdjf'
            }
        )
      
        expect(response.status).toBe(400)
        expect(response.data.error).toBe('User must have an email')
        
    })
    it('will not add a user without a location', async () => {

        const response = await axios.post(
            root + '/signup',
            {
                firstName: 'test name',
                location: '',
                gender: 'male',
                email: 'test@gmail.com',
                password:'#2323nhjkdjf'
            }
        )
      
        expect(response.status).toBe(400)
        expect(response.data.error).toBe('User must have a location')
        
    })
    it('will not add a user without password', async () => {

        const response = await axios.post(
            root + '/signup',
            {
                firstName: 'testname',
                location: 'Yasme, Cameroon Long 35° Lat 80°',
                gender: 'female',
                email: 'test@gmail.com',
                password:''
            }
        )
      
        expect(response.status).toBe(400)
        expect(response.data.error).toBe('User must have a password')
    })




    //Make sure MongoDB client or MongoDb MemoryServer is installed to run the following tests




    it('will not add duplicate emails', async () => {
          //add the first user with an email
          await axios.post(
            root + '/signup',
            {
                firstName: 'testname',
                location: 'Yasme, Cameroon Long 35° Lat 80°',
                gender: 'female',
                email: 'test@gmail.com',
                password:'###skidj'
            })
            // signup with used email
          const response=  await axios.post(
                root + '/signup',
                {
                    firstName: 'testname2',
                    location: 'Yasme, Cameroon Long 35° Lat 80°',
                    gender: 'female',
                    email: 'test@gmail.com',
                    password:'###skidj'
                })
        expect(response.status).toBe(400)
        expect(response.data.error).toBe('user exists, try login')
    })
    it('will add a user with correct credentials', async () => {

          // signup with used email
        const response=  await axios.post(
              root + '/signup',
              {
                  firstName: 'testname2',
                  location: 'Yasme, Cameroon Long 35° Lat 80°',
                  gender: 'female',
                  email: 'randommemail_1@gmail.com',
                  password:'###skidj'
              })
      expect(response.status).toBe(201)
      expect(response.data.status).toBe('success')
  })
    
   
})

