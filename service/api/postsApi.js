const models = require('../db/db')
const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const $sql = require('../db/sqlMap')
const $redis = require('../db/redisFun')
const elasticsearch = require('elasticsearch')
const INDEX = 'post'

const client = new elasticsearch.Client({
  host: 'localhost:9200', // 服务 IP 和端口
  log: 'trace' // 输出详细的调试信息
})
// client.indices.create({ index: 'forum' })
// client.indices.putMapping({
//   index: 'forum',
//   type: 'posts',
//   body: {
//     posts: {
//       properties: {
//         postTitle: {
//           type: 'string',
//           term_vector: 'with_positions_offsets',
//           analyzer: 'ik_syno',
//           search_analyzer: 'ik_syno'
//         }
//       }
//     }
//   }
// })

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
    conn.query(sql + `ORDER BY createTime desc`, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        return res.json(result)
      }
    })
  } else {
    conn.query(sql + `where postType = '${parms.postType}' ORDER BY createTime desc`, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        return res.json(result)
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

// $redis.setRecentPostsId(11, [6])
// $redis.getRecentPostsId(11, function (res) {
//   console.log(res)
// })

router.post('/setRecentPostsId', (req, res) => {
  let parms = req.body
  $redis.setRecentPostsId(parms.userID, parms.postID)
  res.json({ result: 0, msg: '添加至最近参与话题成功' })
})

router.get('/getRecentPostsId', (req, res) => {
  let parms = req.query
  let sql = $sql.posts.select_all
  $redis.getRecentPostsId(parms.userID, function (data) {
    conn.query(sql + `where postID in (${data}) limit 0,3`, (err, result) => {
      if (err) {
        res.json({ result: 1, msg: '暂无最近参与话题' })
      } else {
        res.json(result)
      }
    })
  })
})

router.get('/search', (req, res) => {
  client.search({
    q: req.query.keyword,
    index: INDEX,
    size: 999
  }).then(function (body) {
    var hits = body.hits.hits
    res.send(hits)
  }, function (error) {
    console.trace(error.message)
  })
})

module.exports = router
