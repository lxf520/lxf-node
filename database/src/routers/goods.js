const express = require('express');

const Router = express.Router();
const {formatData} = require('../utils');

const query = require('../db');



Router.route('/')
// 获取所有商品
.get((req,res)=>{
    // 动态路由：参数id会被express格式化到req.params 
    // connection.connect();

    // connection.query(`select * from userlist `,function(error,data,fields){
    //     if(error) throw error;
    //     connection.end();
    //     console.log(data)
    //     res.send(formatData({data}))   
    // })
 
    // pool.query('select * from userlist', function(error, data){
    //     console.log(formatData({data}));
    //     res.send(formatData({data}))   
    // });

    query('select * from userlist').then(function(data){
        res.send(formatData({data}))
    },(err)=>{
        res.send(formatData({data:err,code:250}))
    })
})

.post((req, res) => {
    console.log('body:',req.body);
    
    let id = Date.now();

    let names = '',values = '';
    for(let key in req.body){
        names += key + ',';
        values +='"'+ req.body[key] + '",'
    }
    // 去除多余逗号
    names = names.slice(0,-1)
    values = values.slice(0,-1)

    let sql = `insert into userlist (${names}) value(${values})`
    console.log(sql);
    query(sql).then(function(data){
        res.send(formatData({data}))
    }).catch((err)=>{
        res.send(formatData({
            data:err,
            code:250
        }))
    })

    // res.send({
    //     code: 1000, 
    //     data: [],
    //     msg: `添加id=${id}的商品成功`
    // })
});

Router.route('/:id')
// 获取单个商品
.get((req, res) => {
    // 动态路由：参数id会被express格式化到req.params
    let {id} = req.params;

    // connection.connect();
    // connection.query(`select * from userlist where id=${id} `,function(error,results,fields){
    //     if(error) throw error;
    //     connection.end();
    //     console.log(results)
    //     res.send(formatData({data:results[0]}))
    // })

    // pool.query(`select * from userlist where id=${id} `, function(error, data){
    //     res.send(formatData({data}))
    // });

    query(`select * from userlist where id==${id} `).then(function(data){
        res.send(formatData({data}))
    },(err)=>{
        res.send(formatData({data:err,code:250}))
    })
})

.delete( (req, res) => {
    // 动态路由：参数id会被express格式化到req.params
    let { id } = req.params;

    let sql = `delete from userlist where id=${id}`
    query(sql).then(data=>{
        res.send(formatData());
    }).catch(err=>{
        res.send({data:err,code:250})
    })

})


.put( (req, res) => {
    console.log('body:',req.body);
    let { id } = req.params;

    let opt = '';
    for(let key in req.body){
        opt += `${key}='${req.body[key]}',`
    }
    // 去除多余逗号
    opt = opt.slice(0,-1)

    let sql = `update userlist set ${opt} where id=${id}`

    query(sql).then(data=>{
        res.send(formatData(data));
    }).catch(err=>{
        res.send(formatData({data:err,code:250}))
    })
})

module.exports = Router;
