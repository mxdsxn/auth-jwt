import mongoose from 'mongoose'

const dbConnection = mongoose

dbConnection.connect('mongodb://localhost/auth-mongo', {
 useUnifiedTopology: true,
 useNewUrlParser: true,
 useCreateIndex: true
})
dbConnection.Promise = global.Promise

export default dbConnection