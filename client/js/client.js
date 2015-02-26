document.addEventListener('DOMContentLoaded', function(){
	//调用io的connect方法
    var socket = io.connect('http://127.0.0.1:9283/');

    var cBackground = document.getElementById('background');
    var cEntities = document.getElementById('entities');
    var cForeground = document.getElementById('foreground');

	var gdBackground = cBackground.getContext('2d');//用来绘制元素
	var gdEntities = cEntities.getContext('2d');//用来绘制元素
	var gdForeground = cForeground.getContext('2d');//用来绘制元素



	// var oBox = document.getElementById('playBox');
	// var gd = oBox.getContext('2d');//用来绘制元素

	// var w_width = window.innerWidth;
	// var w_height = window.innerHeight;

	// oBox.style.width = w_width;
	// oBox.style.height = w_height;



	// var aUser = [];


 //    socket.on('online', function(obj){
 //    	//创建人
 //    	var oUser = new User(Math.random() * w_width, Math.random() * w_height);
 //    	console.log(oUser);
 //        aUser.push(oUser);
 //    });


	// //绘制移动
	// setInterval(function(){
	// 	//清除画布
	// 	gd.clearRect(0, 0, oBox.width, oBox.height);
	// 	//人
	// 	for(var i = 0; i < aUser.length; i++){
	// 		aUser[i].draw(gd);
	// 	}

	// },16);


	//注册用户
	var oLoginPanel = document.getElementById('loginPanel');
	var oPlayPanel = document.getElementById('playPanel');

	var oName = document.getElementById('nameinput');
	var oPlay = document.getElementById('playButton');
	var oNameTooltip = document.getElementById('nameToolTip');

	var loginFlag = true;

	oName.oninput = function(){
		if(oName.value.length > 0){
			oPlay.childNodes[1].style.opacity = 1;
		}else{
			oPlay.childNodes[1].style.opacity = 0;
		}	
	};
	oPlay.onclick = function(){
		if(oPlay.childNodes[1].style.opacity == 1 && loginFlag){
			//注册用户
    		socket.emit('online', {user: oName.value});
			oNameTooltip.style.color = '#6B8E23';
			oNameTooltip.innerHTML = '努力的登记中...';
			loginFlag = false;
		}else{
			if(oPlay.childNodes[1].style.opacity == 1){
				oNameTooltip.style.color = '#6B8E23';
				oNameTooltip.innerHTML = '请不要多次点击!';
			}else{
				oNameTooltip.style.color = '#373737';
				oNameTooltip.innerHTML = '请起一个酷酷的名字吧!';
			}
		}
	};
	//监听是否注册成功
	socket.on('onlineError', function(){
		oNameTooltip.style.color = '#ff0000';
		oNameTooltip.innerHTML = '登录失败，用户名重复!';
		loginFlag = true;
	});
	socket.on('online', function(obj){
		oLoginPanel.style.display = 'none';
		oPlayPanel.style.display = 'block';
		document.body.style.background = '#000';
	});

	

});



