var mysql = require('mysql');

//创建连接对象，并配置参数
// var connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : '',
//     database : 'sn'
// });

//创建连接池
var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    port: 3306,
    database: 'sn',
    multipleStatements: true
});

module.exports = (sql) => {
    return new Promise((resolve,reject)=>{
        pool.query(sql, function(error, data){
            if(error){
                reject(error)
            }
           resolve(data); 
        });
    })
}