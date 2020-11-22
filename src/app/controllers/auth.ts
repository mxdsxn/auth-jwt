import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/user'

const authConfig = require('../../config/auth')

const setToken = (id: string) => {
 return jwt.sign({ id }, authConfig.secret, {
  expiresIn: 1000 * 60 * 60 * 24,
  algorithm: 'HS256',
 })
}
const router = express.Router()

router.post('/register', async (req, res) => {

 try {
  const { email } = req.body
  if (await User.exists({ email })) { return res.status(400).json({ error: 'email ja cadastrado' }) }

  const user = await User.create(req.body)
  user.set({ password: undefined })

  const token = setToken(user.get('id'))

  return res.send({ user, token })
 } catch (error) {
  return res.status(400).send({ error: 'Falha em /register' })
 }
})

router.post('/auth', async (req, res) => {
 const { email, password } = req.body

 const user = await User.findOne({ email }).select('+password')

 if (!user) {
  return res.status(400).json({ error: 'Usuario nao encontrado' })
 }

 const isValid = await bcrypt.compare(password, user.get('password'))

 if (!isValid) {
  return res.status(400).json({ error: 'Senha invalida' })
 }

 const token = setToken(user.get('id'))

 return res.json({
  mensage: 'Usuario autemticado',
  token
 })
})

export default router