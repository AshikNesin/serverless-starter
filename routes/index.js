import express from 'express';
import authRoutes from './auth';
const router = express.Router();
router.get('/ping', (req, res) => {
    res.send(`Hello World`)
});
router.use('/', authRoutes);

export default router;