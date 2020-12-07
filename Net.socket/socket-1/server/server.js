var net = require('net');
//模块引入
var listenPort = 8080;//监听端口

var user = [];
var onlineList = [];
const TYPE_MASG = 'msg';
const TYPE_ENTEROUT = 'enterMsg';
const TYPE_OUT = 0;
const TYPE_ENTER = 1;
var server = net.createServer(function (socket) {
  // 创建socket服务端
  user.push(socket);
  console.log(socket.remoteAddress + ':' + socket.remotePort + '连接服务器成功');
  socket.setEncoding('utf-8');


  //接收到数据
  socket.on('data', function (data) {
    var dataObj = JSON.parse(data);
    console.log('client send:' + dataObj.user);

    if (dataObj.type === TYPE_MASG) {
      user.forEach(function (client) {
        if (client !== socket) {
          //由于同一台计算机上客户端端口号不同，所以可以通过端口号来区分是谁说的话
          client.write(data);
        }
      });
    }
    //如果是进入退出消息类型
    if (dataObj.type === TYPE_ENTEROUT) {
      //进入消息类型
      if (dataObj.msg === TYPE_ENTER) {
        var flag = 0;
        onlineList.forEach(function (value, index) {//判定当前用户列表是否已经存在新连接上来的用户
          if (value.user === dataObj.user) {
            flag = 1;
          }
        })
        if (flag === 0) {
          onlineList.push(dataObj);
        }
      }
        //退出消息类型
      else if (dataObj.msg === TYPE_OUT) {

        onlineList.forEach(function (value, index) {
          if (value.user === dataObj.user) {
            console.log(value.user +"::"+dataObj.user);
            onlineList.splice(index, 1);
          }
        })

      }
      user.forEach(function (client) {
        client.write(JSON.stringify(onlineList));
      });
    }


  });
  // socket.pipe(socket);
  //数据错误事件
  socket.on('error', function (exception) {
    console.log('socket error:' + exception);
    socket.end();
  });
  //客户端关闭事件
  socket.on('close', function (data) {
    console.log('client closed!');
    console.log(socket.remoteAddress + ' ' + socket.remotePort + '断开服务器连接');
  });

}).listen(listenPort);
//服务器监听事件
server.on('listening', function () {
  console.log("server listening:" + server.address().port);
});
//服务器错误事件
server.on("error", function (exception) {
  console.log("server error:" + exception);
});

