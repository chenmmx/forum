const express = require('express')
const bodyParser = require('body-parser')
const userApi = require('./api/userApi')
const postsApi = require('./api/postsApi')

const app = express()

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/user', userApi)
app.use('/api/posts', postsApi)

app.listen(3000, () => {
  console.log('server is running at 3000 port!')
})
