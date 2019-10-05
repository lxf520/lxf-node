const express = require('express');

const Router = express.Router();

const goodsRouter = require('./goods');
const regRouter = require('./reg');
const loginRouter = require('./login');
// 这句话可以拿到req的请求体
Router.use(express.urlencoded({ extended: true }), express.json());

Router.use((req, res, next) => {

    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

    next();

})

// 数据接口
Router.use('/goods', goodsRouter);
Router.use('/reg', regRouter);
Router.use('/login',loginRouter);

module.exports = Router;