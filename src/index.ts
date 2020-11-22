import express from 'express'
import routeControllers from './app/controllers/'

const app = express()

app.use(express.json())

app.get('/about', (a, b, n) => n(), (req, res) => {
 return res.json({ mensage: 'server online' })
})

app.use(routeControllers)

app.listen(2000, () => console.log('Server online'))