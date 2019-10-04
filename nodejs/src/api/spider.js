const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const express = require('express');

const Router = express.Router();

Router.get('/', (req, res) => {
    // 爬取数据
    request('http://shop.jiuxian.com/brand-382/activity-3376.htm?area=6', (err, response, body) => {
        const $ = cheerio.load(body);

        let goodslist = [];

        $('.shopComBox li').each((idx, ele) => {
            let $ele = $(ele);

            let name = $ele.find('.sCom-name').text();
            let price = $ele.find('.sCom-price em').text();
            let imgurl = $ele.find('.sComPic img').attr('src');//prop

            // 获取图片名
            let filename = path.basename(imgurl);

            goodslist.push({
                name,
                price,
                imgurl: 'uploads/' + filename
            });

            // 把图片下载到本地
            request(imgurl)
            .pipe(fs.createWriteStream(`uploads/${filename}`))
        })

        // let filepath = path.join(__dirname, '../img/1 (2).jpg');
        // // 小文件的读取
        // fs.readFile(filepath, (err, data) => {
        //     if (err) {
        //         console.log('err', err)
        //     }
        //     console.log('data:', data.toString())
        // })
        // 大文件读取 stream 
        // let readerStream = fs.createReadStream(filepath);

        // let data = '';
        // readerStream.on('data',function(chunk){
        //     console.log('chunk',chunk.toString());
        //     data += chunk;
        // })
        // // 读取完成后执行end事件
        // readerStream.on('end',function(){
        //     console.log('end',data);
            
        // })

        res.send(goodslist);
    })

})

module.exports = Router;