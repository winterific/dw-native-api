const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const port = process.env.port|| 8000
const host = process.env.host|| '0.0.0.0'
const app = express()

// Logging
app.use(morgan('combined'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Routes
app.use('/', require('./routes'))
app.use((req, res, next) => {
  res.status(404).json('Resource not found')
})

// Start app
app.listen(port, host, () => `App listening on http://${host}:${port}`)