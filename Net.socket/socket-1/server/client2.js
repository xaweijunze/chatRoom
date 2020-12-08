
var net = require('net');
var port = 8080;
var host = '172.20.10.2';
var client= new net.Socket();
//创建socket客户端
client.setEncoding('utf-8');
//连接到服务端
client.connect(port,host,function(){
//向端口写入数据到达服务端
});

// client.on('data',function(data){
    

// });
client.on('error',function(error){
//错误出现之后关闭连接
console.log('error:'+error);
});
client.on('close',function(){
//正常关闭连接
console.log('Connection closed');
});





//1.导入nodejs-websocket包
const ws = require('nodejs-websocket');
const PORT = 3002;

const TYPE_MINE = 'client-2';
const TYPE_MASG = 'msg';
const TYPE_ENTEROUT = 'enterMsg';
const TYPE_OUT = 0;
const TYPE_ENTER = 1;
// 用户的消息类型不应该是简单的字符串，这个消息应该是一个对象
// 对象内容包括： 


const server = ws.createServer(conn =>{
    console.log('客户端2连接成功，可以通话了');
    conn.userName = '客户端';

    // 接收到了浏览器的数据
    conn.on('text' ,msg=>{
    // 2.当我们接收到客户端的数据时把这条数据发送给主服务器
    client.write(msg);
    var data = JSON.parse(msg);
    if(data.type===TYPE_ENTEROUT)
    {}
    else{
        conn.send(msg);
    }
    })
    
    //得到主服务端返回来的数据
    client.on('data',function(data){
        console.log('from server:'+ data);
        conn.send(data);
        //得到服务端返回来的数据    
        var dataList = getExecStrs(data);
        //发送到浏览器
        dataList.forEach(function(value){
            
        })    
         });
    // 关闭连接时触发
    conn.on('close' ,data=>{
        console.log('客户端离开');
        var data = JSONtemp(TYPE_OUT,TYPE_ENTEROUT);
        client.write(data);


    })
    // 发生异常时触发
    conn.on('error' ,data=>{
        console.log('发生异常');
        
    })

})
server.listen(PORT ,()=>{
    console.log('监听端口'+PORT);
    
})
function JSONtemp(msg,type){
    var data=JSON.stringify({
        user:'client-2',
        type:type,
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
function getExecStrs (str) {
    var reg = /\{(.+?)\}/g;
    var list = [];
    var result = null;
    do {
        result = reg.exec(str)
        result && list.push(result[1])
    } while (result)
    list.forEach(function(value,index){
        list[index]= '{'+ value +'}'
    })
    return list;
}




