import express from 'express'
import User from '../models/user'

const router = express.Router()

router.post('/register', async (req, res) => {

 try {
  const { email } = req.body
  if (await User.exists({ email })) { return res.status(400).json({ error: 'email ja cadastrado' }) }

  const user = await User.create(req.body)
  user.set({ password: undefined })

  return res.send({ user })
 } catch (error) {
  return res.status(400).send({ error: 'Falha em /register' })
 }
})

export default router