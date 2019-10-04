/**
 * 利用express制作静态资源服务
 */
//  引入express模块
const express = require('express');//缓存

 const proxy = require('http-proxy-middleware'); //代理服务器

 //引入路由
const allRouter = require('./api');

const app = express();

//  静态资源服务器
// 匹配静态资源,则返回
// 如果不匹配,则next()进入下一个中间
app.use(express.static('./'));

// 代理服务器  ali
app.use('/ali/*', proxy({ 
    target: 'https://h5api.m.taobao.com', //=>https://h5api.m.taobao.com/ali/xxx
    changeOrigin: true,
    pathRewrite: {
        '^/ali': '/', // =>https://h5.api.m.taobao.com/xxx
    },
}))

app.use(allRouter);
// app.get('/goods',(req,res)=>{
    // req.query查询id
//     let {id} = req.query;
//     if(id){
//         res.send({
//             code:1000,
//             data:[],
//             msg:`获取id=${id}的商品`
//         })
//     }
//     res.send({
//         username: 'lxf',
//         age: 199
//     });
//     next();
// });



//  监听端口
app.listen(1907, () => {
    console.log('server is running on http://localhost:1907')
})