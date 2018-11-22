const models = require('../db/db')
const express = require('express')
const router = express.Router()
const mysql = require('mysql')
// const $sql = require('../db/sqlMap')

const conn = mysql.createConnection(models.mysql)

conn.connect()

router.post('/addPosts', (req, res) => {

})

module.exports = router
