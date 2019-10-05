const express = require('express');

const Router = express.Router();

const {insert} = require("../db/mongo");

const {formatData} = require("../utils");

Router.post('/', async (req,res)=>{

    let data = await insert('user',req.body)
    res.send(formatData({data}))
})


module.exports = Router;