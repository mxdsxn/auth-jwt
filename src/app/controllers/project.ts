import express from 'express';

import getToken from '../middleware/getToken'

const router = express.Router()

router.use(getToken)

router.get('/products', async (req, res) => {
 res.json({ ok: 'Usuario logado' })
})

export default router