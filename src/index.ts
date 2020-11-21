import express from 'express'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
 return res.json({ mensage: 'server online' })
})

app.listen(2000, () => console.log('Server online'))