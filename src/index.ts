import express from 'express'
import authController from './controllers/auth'
import projectController from './controllers/project'

const app = express()

app.use(express.json())

app.use(
 authController,
 projectController
)

app.get('/about', (req, res) => {
 return res.json({ mensage: 'server online' })
})

app.listen(2000, () => console.log('Server online'))