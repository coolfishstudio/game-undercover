var express = require('express');
var app = express();
var port = 9283;//端口号


//静态文件存放位置  客户端
app.use(express.static(__dirname + '/client'));


//路由
app.use(function(req, res){
    res.sendfile('./client/index.html');
});
//往服务器端添加socket
var io = require('socket.io').listen(app.listen(port));

var users = {};
//监听链接事件
io.sockets.on('connection', function(socket){    
    //有人上线
    socket.on('online', function(data){
    	socket.name = data.user;
    	console.log(data);
    	if(!users[data.user]){
    		users[data.user] = data.user;
    	}
    	socket.emit('connected');
    	// socket.emit('online', {users : users, user : data.user});
    });
    //有人说话
    socket.on('say', function(data){

    });
    //有人离开
    socket.on('outline', function(){

    });
});

console.log('Express server listening on port ' + port + '');