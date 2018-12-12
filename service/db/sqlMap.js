const sqlMap = {
  user: {
    register: 'insert into user (username, password, useravatar, mail, signature, integral) values (?,?,?,?,?,?)',
    check_password: 'select password from user ',
    select_all: 'select * from user ',
    update: 'update user set '
  },
  posts: {
    add: 'insert into posts (username, postContent, posTtitle, postType, createTime) values (?,?,?,?,?)',
    select_all: 'select * from posts '
  }
}

module.exports = sqlMap
