import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';


const app = express()
const router = express.Router()

router.use(cors())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.get('/hello', (req, res) => {
  res.send(`Hello World`)
})

app.use('/', router)

// Export your express server so you can import it in the lambda function.
export default app;