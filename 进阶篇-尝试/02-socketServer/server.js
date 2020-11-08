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

// 记录当前连接上来的总的用户数量
let count = 0;
const server = ws.createServer(conn =>{
    console.log('新的连接');
    count++;
    conn.userName = `用户${count}`;
    //1.告诉所有用户有人加入了聊天室
    broadcast({
        type:TYPE_ENTER,
        msg:`${conn.userName}进入了聊天室`,
        time: getDate(),
    })

    // 接收到了浏览器的数据
    conn.on('text' ,data=>{
    // 2.当我们接收到某个用户的消息的时候，告诉所有用户这个消息
    broadcast({
        type:TYPE_MSG,
        msg:data,
        time: getDate(),
    });
    })
    // 关闭连接时触发
    conn.on('close' ,data=>{
        console.log('关闭连接');
        count--;
        // 3.告诉所有人有人离开了聊天室
        broadcast({
            type:TYPE_LEAVE,
            msg:`${conn.userName}离开了聊天室`,
            time: getDate(),
        })
    })
    // 发生异常时触发
    conn.on('error' ,data=>{
        console.log('发生异常');
        
    })

})
server.listen(PORT ,()=>{
    console.log('监听端口'+PORT);
    
})
function broadcast(msg){
    //server.connections表示所有用户
    server.connections.forEach(element => {
        element.send(JSON.stringify(msg));
        
    });
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
