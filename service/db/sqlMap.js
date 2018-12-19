const sqlMap = {
  user: {
    register: 'insert into user (username, password, useravatar, mail, signature, integral, create_time) values (?,?,?,?,?,?,?)',
    check_password: 'select password from user ',
    select_all: 'select * from user ',
    update: 'update user set '
  },
  posts: {
    add: 'insert into posts (username, postContent, posTtitle, postType, createTime, user_id) values (?,?,?,?,?,?)',
    select_all: 'SELECT * FROM posts JOIN USER ON posts.`user_id` = user.`id` '
  },
  comments: {
    add: 'insert into usercomment (userID, commentContent, postID, createTime) values (?,?,?,?)',
    select_all: 'SELECT * FROM usercomment JOIN USER ON usercomment.`userID` = user.`id` '
  }
}

module.exports = sqlMap
