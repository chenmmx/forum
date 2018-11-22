const models = require('../db/db')
const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const $sql = require('../db/sqlMap')

const conn = mysql.createConnection(models.mysql)

conn.connect()

// 用户注册
router.post('/addUser', (req, res) => {
  let params = req.body
  let sql = $sql.user.register
  conn.query(`select * from user where username = '${params.name}'`, (err, result) => {
    if (err) {
    //   console.log(err)
    } else {
      if (result == '') {
        conn.query(sql, [params.name, params.password, '', '', '暂无个性签名', 0],
          (err, result) => {
            if (err) {
              console.log(err)
            } else {
              return res.json({ result: 1, msg: '用户创建成功！' })
            }
          })
      } else {
        return res.json({ result: 0, msg: '当前账户已存在!' })
      }
    }
  })
})

// 用户登录
router.post('/login', (req, res) => {
  let params = req.body
  let sql = $sql.user.check_password
  conn.query(sql + `where username = '${params.name}'`, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      if (result == '') {
        return res.json({ result: 0, msg: '当前用户不存在！' })
      } else {
        if (params.password === result[0].password) {
          return res.json({ result: 1, msg: '登录成功！' })
        } else {
          return res.json({ result: 0, msg: '密码错误！' })
        }
      }
    }
  })
})

module.exports = router
