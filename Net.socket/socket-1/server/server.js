var net = require('net');
//模块引入
var listenPort = 8080;//监听端口

var user=[];
var server = net.createServer(function(socket){
  // 创建socket服务端
  user.push(socket);
  console.log('connect: ' +
    socket.remoteAddress + ':' + socket.remotePort);
  socket.setEncoding('utf-8');
  //接收到数据
  socket.on('data',function(data){
    var dataObj = JSON.parse(data);
    console.log('client send:' + data.msg);
    user.forEach(function(client){
      if(client!== socket){
        //由于同一台计算机上客户端端口号不同，所以可以通过端口号来区分是谁说的话
        client.write(data);
      }
    });
  });
 // socket.pipe(socket);
  //数据错误事件
  socket.on('error',function(exception){
    console.log('socket error:' + exception);
    socket.end();
  });
  //客户端关闭事件
  socket.on('close',function(data){
    console.log('client closed!');
     // socket.remoteAddress + ' ' + socket.remotePort);
  });
  
}).listen(listenPort);
//服务器监听事件
server.on('listening',function(){
  console.log("server listening:" + server.address().port);
});
//服务器错误事件
server.on("error",function(exception){
  console.log("server error:" + exception);
});

