const express = require('express');

const Router = express.Router();

const {mongo:{find}} = require('../db');

Router.get('/',async (req,res) => {
    let {username,password} = req.query;console.log(username,password)
    
    let result = await find('user',{username,password})
    res.send('登录成功')
})

module.exports = Router;