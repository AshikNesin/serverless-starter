const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const router = express.Router()

router.use(cors())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.get('/', (req, res) => {
  res.send(`Hello World`)
})

app.use('/', router)

// Export your express server so you can import it in the lambda function.
// module.exports = app

export default app;