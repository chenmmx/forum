const models = require('../db/db')
const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const $sql = require('../db/sqlMap')

const conn = mysql.createConnection(models.mysql)

conn.connect()

router.post('/addComment', (req, res) => {
  let parms = req.body
  let sql = $sql.comments.add
  conn.query(sql, [parms.userID, parms.commentContent, parms.postID, new Date()], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.json({ result: 0, msg: '评论发表成功' })
    }
  })
})

router.get('/getCommentByPostId', (req, res) => {
  let parms = req.query
  let sql = $sql.comments.select_all
  conn.query(sql + `where postID = '${parms.postID}' ORDER BY createTime desc`, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.json(result)
    }
  })
})

module.exports = router
