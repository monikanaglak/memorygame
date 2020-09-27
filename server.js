
const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, "public")))
app.all((error, request,response,next)=>{
response.status(404).send('<!DOCTYPE html><html><head><title>Erruer404</title></head><body><h1>Erreur 404 :page non trouver</h1></body></html>');
});

const server = app.listen(3000, ()=>{
console.log('http server starter on 3000')
});

//creation de connection par websocket//
const socket = require ('socket.io');
const io = socket(server);
io.sockets.on('connection', newConnection)

function newConnection(socket){
    console.log('new connection: ' + socket.id);
    socket.on('clik', clikMsg);
    function clikMsg (data){
        socket.broadcast.emit('clik', data);
        console.log(data)
    }
}


