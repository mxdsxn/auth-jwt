import {
 Request,
 Response,
 NextFunction
} from 'express'
import jwt from 'jsonwebtoken'

import authConfig from '../../config/auth'

export default (req: Request, res: Response, next: NextFunction) => {
 const authHeader = req.headers.authorization

 if (!authHeader) {
  return res.status(401).json({ error: 'Token nao encontrado' })
 }

 const parts = authHeader.split(' ')

 if (!(parts.length === 2)) {
  return res.status(401).json({ error: 'Token fora do padrao' })
 }

 const [
  scheme,
  token,
 ] = parts

 if ('Bearer' !== scheme) {
  return res.status(401).json({ error: 'Token sem Bearer' })
 }

 jwt.verify(token, authConfig.secret, (err: any, decoded: any) => {
  if (err) {
   return res.status(401).json({ error: 'Token invalido', err })
  }

  if (decoded) {
   req.body.userId = decoded.id

   return next()
  }
 })
}