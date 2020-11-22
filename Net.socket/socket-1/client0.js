
var net = require('net');
var port = 8080;
var host = '127.0.0.1';
var client= new net.Socket();
//创建socket客户端
client.setEncoding('binary');

//连接到服务端
client.connect(port,host,function(){

});


client.on('error',function(error){
//错误出现之后关闭连接
console.log('error:'+error);
client.destory();
});
client.on('close',function(){
//正常关闭连接
console.log('Connection closed');
});





//1.导入nodejs-websocket包
const ws = require('nodejs-websocket');
const PORT = 3000;
const TYPE_ENTER = 0;
const TYPE_LEAVE = 1;
const TYPE_MSG = 2;
// 用户的消息类型不应该是简单的字符串，这个消息应该是一个对象
// 对象内容包括： 
//  type ：消息的类型  
//  msg：消息内容
//  time：消息发送的具体时间


const server = ws.createServer(conn =>{
    console.log('客户端0连接成功，可以通话了');
    conn.userName = '客户端';

    // 接收到了浏览器的数据
    conn.on('text' ,msg=>{
    var data =JSONtemp(msg);
    client.write(data);
    conn.send(data);
    })

    //得到服务端返回来的数据
    client.on('data',function(data){
        conn.send(data);
       var data = JSON.parse(data);

        });


    // 关闭连接时触发
    conn.on('close' ,data=>{
        console.log('客户端离开');


    })
    // 发生异常时触发
    conn.on('error' ,data=>{
        console.log('发生异常');
        
    })

})
server.listen(PORT ,()=>{
    console.log('监听端口'+PORT);
    
})
function JSONtemp(msg){
    var data=JSON.stringify({
        type:'client-0',
        msg:msg,
        time: getDate(),
    })
    return data;
}
function getDate(){
    var date = new Date();
    var year=date.getFullYear();
    var month = date.getMonth()+1;
    var dates=date.getDate();
    var arr=['星期日','星期一','星期二','星期三','星期四','星期五','星期六',]
    var day = date.getDay();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();


    return hours+':'+minutes+':'+seconds;
}




