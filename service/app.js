const express = require('express')
const bodyParser = require('body-parser')
const userApi = require('./api/userApi')
const postsApi = require('./api/postsApi')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// 解决跨域
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')

  if (req.method === 'OPTIONS') {
    res.send(200)
  } else {
    next()
  }
})

app.use('/api/user', userApi)
app.use('/api/posts', postsApi)

app.listen('3000', () => {
  console.log('server is running at 3000 port!')
})
