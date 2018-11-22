const sqlMap = {
  user: {
    register: 'insert into user (username, password, useravatar, mail, signature, integral) values (?,?,?,?,?,?)',
    check_password: 'select password from user '
  },
  posts: {
    add: ''
  }
}

module.exports = sqlMap
