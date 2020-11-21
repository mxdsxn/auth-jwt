import mongoose from 'mongoose'

const dbConnection = mongoose

dbConnection.connect('mongodb://localhost/auth-mongo', {
 // useMongoClient: true 
 useUnifiedTopology: true,
 useNewUrlParser: true,
 useCreateIndex: true
})
dbConnection.Promise = global.Promise

export default dbConnection