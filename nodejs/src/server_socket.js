const express = require('express');
const http = require('http');
let app = express();
let SocketServer = require('ws').Server;

app.use(express.static('./'));

// 利用http模块合二为一
let server = http.Server(app);
let wss = new SocketServer({
    server,
})

server.listen(1909,()=>{
    console.log('http&ws启动');
})

wss.on('connection',function connection(client){
    client.on('message',(msg)=>{
        wss.clients.forEach(client=>{
            client.send(msg)
        })
    });
    client.on('close',e=>console.log('close:',e))
})