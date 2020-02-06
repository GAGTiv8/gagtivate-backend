const express = require('express')
const app = express()
const PORT = 3000
const indexRouter = require('./routes/index.js')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({ extended:false }))
app.use(express.json())

app.use(indexRouter)

app.listen(PORT, () => {})