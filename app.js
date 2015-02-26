var express = require('express');
var app = express();
var port = 9283;//端口号


//静态文件存放位置  客户端
app.use(express.static(__dirname + '/client'));

// 路由
app.use(function(req, res){
    res.sendfile('./client/index.html');
});
//往服务器端添加socket
var io = require('socket.io').listen(app.listen(port));

//在线用户
var users = {};
//当前在线人数
var count = 0;


//监听链接事件
io.sockets.on('connection', function(socket){
    //有人上线
    socket.on('online', function(obj){
        console.log(obj);
        //检查在线列表
        if(!users[obj.user]){
            socket.name = obj.user;
            users[obj.user] = obj.user;
            count++;
            //广播
            io.emit('online', {users : users, user : obj.user, count : count});
        }else{
            socket.emit('onlineError');
        }
        
    });
    //有人说话
    socket.on('say', function(obj){
        io.emit('say', obj);
    });
    //有人离开
    socket.on('disconnect', function(){
        console.log('!!!',socket.name);
        if(users[socket.name]){
            var obj = {user : socket.name};
            delete users[socket.name];
            count--;
            io.emit('outline', {users : users, user : obj.user, count : count});
        }
    });
});

console.log('Express server listening on port ' + port + '');