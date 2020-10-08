const  makeUsersDb = require( './userDB')
const  mongodb  = require('mongodb') 
const  dotenv = require('dotenv')
dotenv.config()
const MongoClient = mongodb.MongoClient
const dbName = process.env.DB_NAME
const client = new MongoClient(process.env.MONGODB_CONN, { useNewUrlParser: true, useUnifiedTopology:true }, ()=> console.log('db connected'))
 async function makeDb () {
  if (!client.isConnected()) {
    await client.connect()
  }
  return client.db(dbName)
}
const User = makeUsersDb({ makeDb })
module.exports =  User
