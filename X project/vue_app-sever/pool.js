//1������ģ�� mysql
const mysql = require("mysql");
//2����������
var pool= mysql.createPool({
    host:"127.0.0.1",
    port:"3306",
    user:"root",
    password:"",
    database:"x",
    connectionLimit:20
})

module.exports = pool;