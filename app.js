import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import corsMiddleware from './utils/cors-middleware';
import cookiesMiddleware from './utils/cookies-middleware';

const User = mongoose.model('User')

const app = express()
const router = express.Router()

router.use(corsMiddleware);
router.use(cookiesMiddleware);
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.get('/hello', (req, res) => {
  res.send(`Hello World`)
})


app.use('/', router)

// Export your express server so you can import it in the lambda function.
export default app;