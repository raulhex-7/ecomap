const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const PORT = 5000

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'static')))

app.get('/', (req, res) => {
  res.send('get /')
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}.`)
})