const  makeUsersDb = require( './userDB')
const  mongodb  = require('mongodb') 
const  dotenv = require('dotenv')
dotenv.config()
const MongoClient = mongodb.MongoClient
const dbName = 'PowerUser'
const client = new MongoClient('mongodb://127.0.0.1:27017', { useNewUrlParser: true, useUnifiedTopology:true }, ()=> console.log('db connected'))
 async function makeDb () {
  if (!client.isConnected()) {
    await client.connect()
  }
  return client.db(dbName)
}
const User = makeUsersDb({ makeDb })
module.exports =  User
