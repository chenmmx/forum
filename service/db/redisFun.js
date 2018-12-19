const redis = require('redis')
const client = redis.createClient()
// const { promisify } = require('util')
// const getAsync = promisify(client.smembers).bind(client)

client.on('error', function (err) {
  console.log('Error ' + err)
})

// function redis_get_string () {
//   client.set('key', ['string'], function (err, res) {
//     if (err) {
//       console.log(err)
//     } else {
//       client.get('key', function (err, res) {
//         if (err) {
//           console.log(err)
//         } else {
//           console.log(res)
//         }
//       })
//     }
//   })
// }

module.exports = {
//   ddd (cb) {
//     let a = 5
//     cb && cb(a)
//   },
//   rrr () {
//     return new Promise((resolve, reject) => {
//       this.ddd((res) => {
//         resolve(res)
//       })
//     })
//   },
//   async fff () {
//     let res = await this.rrr()
//     return res
//   },
  setRecentPostsId (userID, poostID) {
    client.sadd(userID, poostID)
  },
  getRecentPostsId (userID, cb) {
    client.smembers(userID, function (err, res) {
      if (err) {
        console.log(err)
      } else {
        cb && cb(res)
      }
    })
  }
}
