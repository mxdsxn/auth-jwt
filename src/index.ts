import express from 'express'
import authController from './controllers/auth'

const app = express()

app.use(express.json())

app.use(authController)
app.get('/', (req, res) => {
 return res.json({ mensage: 'server online' })
})

app.listen(2000, () => console.log('Server online'))