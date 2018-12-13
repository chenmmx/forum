const models = require('../db/db')
const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const $sql = require('../db/sqlMap')

const conn = mysql.createConnection(models.mysql)

conn.connect()

router.post('/addPosts', (req, res) => {
  let parms = req.body
  let sql = $sql.posts.add
  conn.query(sql, [parms.username, parms.postContent, parms.postTitle, parms.postType, new Date(), parms.userID], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      return res.json({ result: 0, msg: '文章发表成功！！' })
    }
  })
})

router.get('/getPosts', (req, res) => {
  let parms = req.query
  let sql = $sql.posts.select_all
  if (parms.postType === '全部') {
    conn.query(sql, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        return res.json(result)
      }
    })
  } else {
    conn.query(sql + `where postType = '${parms.postType}'`, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.json(result)
      }
    })
  }
})

router.get('/getPostContent', (req, res) => {
  let parms = req.query
  let sql = $sql.posts.select_all
  conn.query(sql + `where postID = '${parms.postID}'`, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.json(result)
    }
  })
})

router.get('/recentCreatePosts', (req, res) => {
  let parms = req.query
  let sql = $sql.posts.select_all
  conn.query(sql + `where user_id = ${parms.userID} ORDER BY createTime desc limit 0,3`, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.json(result)
    }
  })
})

module.exports = router
