const models = require('../db/db')
const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const $sql = require('../db/sqlMap')
const multer = require('multer')

const conn = mysql.createConnection(models.mysql)

conn.connect()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({
  storage: storage
})

// 用户注册
router.post('/addUser', (req, res) => {
  let params = req.body
  let sql = $sql.user.register
  conn.query(`select * from user where username = '${params.name}'`, (err, result) => {
    if (err) {
    //   console.log(err)
    } else {
      if (result == '') {
        conn.query(sql, [params.name, params.password, '', '', '暂无个性签名', 0, new Date()],
          (err, result) => {
            if (err) {
              console.log(err)
            } else {
              return res.json({ result: 0, msg: '用户创建成功！' })
            }
          })
      } else {
        return res.json({ result: 1, msg: '当前账户已存在!' })
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
        return res.json({ result: 1, msg: '当前用户不存在！' })
      } else {
        if (params.password === result[0].password) {
          return res.json({ result: 0, msg: '登录成功！' })
        } else {
          return res.json({ result: 1, msg: '密码错误！' })
        }
      }
    }
  })
})

router.post('/getInfomation', (req, res) => {
  let params = req.body
  let sql = $sql.user.select_all
  conn.query(sql + `where username = '${params.name}'`, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      return res.json(result)
    }
  })
})

router.post('/getInfomationById', (req, res) => {
  let params = req.body
  let sql = $sql.user.select_all
  conn.query(sql + `where id = '${params.userID}'`, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      return res.json(result)
    }
  })
})

router.post('/modifyInfo', upload.single('file'), (req, res) => {
  let sql = $sql.user.update
  let params = req.body
  if (req.file) {
    let file = req.file
    let imgPath = 'http://192.168.1.237:3000/upload/' + file.filename
    if (params.password1) {
      conn.query(sql + `useravatar = '${imgPath}', signature = '${params.signature}', mail = '${params.mail}', password = ${params.password1} where username = '${params.name}'`,
        (err, result) => {
          if (err) {
            console.log(err)
          } else {
            return res.json({ result: 0, msg: '修改成功！' })
          }
        })
    } else {
      conn.query(sql + `useravatar = '${imgPath}', signature = '${params.signature}', mail = '${params.mail}' where username = '${params.name}'`,
        (err, result) => {
          if (err) {
            console.log(err)
          } else {
            return res.json({ result: 0, msg: '修改成功！' })
          }
        })
    }
  } else {
    if (params.password1) {
      conn.query(sql + `signature = '${params.signature}', mail = '${params.mail}', password = ${params.password1} where username = '${params.name}'`,
        (err, result) => {
          if (err) {
            console.log(err)
          } else {
            return res.json({ result: 0, msg: '修改成功！' })
          }
        })
    } else {
      conn.query(sql + `signature = '${params.signature}', mail = '${params.mail}' where username = '${params.name}'`,
        (err, result) => {
          if (err) {
            console.log(err)
          } else {
            return res.json({ result: 0, msg: '修改成功！' })
          }
        })
    }
  }
})

router.get('/getScoreboard', (req, res) => {
  let sql = $sql.user.select_all
  conn.query(sql + 'ORDER BY integral', (err, result) => {
    if (err) {
      console.log(err)
    } else {
      return res.json(result)
    }
  })
})

module.exports = router
