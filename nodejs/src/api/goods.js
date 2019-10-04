const express = require('express');

const Router = express.Router();

Router.route('/')
// 获取所有商品
.get((req,res)=>{
    // ?后的参数,express会自动格式化到req.query中
    // let {id} = req.query;
    // if(id){
    //     return res.send({
    //         code:1000,
    //         data:[],
    //         msg:`获取id=${id}的商品`
    //     })
    // }
    res.send({
        code:1000,
        data:[],
        msg:'所有商品'
    })

    // res.send(JSON.stringify(req));
})

.post((req, res) => {
    console.log('body:',req.body);
    
    let id = Date.now();

    res.send({
        code: 1000, 
        data: [],
        msg: `添加id=${id}的商品成功`
    })
});

Router.route('/:id')
// 获取单个商品
.get((req, res) => {
    // 动态路由：参数id会被express格式化到req.params
    let { id } = req.params;
    res.send({
        code: 1000,
        data: [],
        msg: `获取id=${id}的商品`
    })
})

.delete( (req, res) => {
    // 动态路由：参数id会被express格式化到req.params
    let { id } = req.params;
    res.send({
        code: 1000,
        data: [],
        msg: `删除id=${id}的商品`
    })
})


.put( (req, res) => {
    console.log('body:',req.body);
    let { id } = req.params;

    res.send({
        code: 1000,
        data: [],
        msg: `修改id=${id}的商品成功`
    })
})

module.exports = Router;
