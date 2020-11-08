//1.导入nodejs-websocket包
const ws = require('nodejs-websocket');
const PORT = 3000;

//2.创建一个server
    //每次只要有用户连接，函数就会立即被执行，会给当前用户创建一个connect对象
const server = ws.createServer(connect => {
    console.log('有用户连接上来了');
    // 每当接收到用户传递过来的数据，这个text时间就会被触发

    connect.on('text',data=>{
        console.log('接收到了用户的数据',data);
        // 给用户一个响应的数据
        connect.send(data);
    })

    // 只要websocket连接断开了，close事件就会触发    
    connect.on('close',()=>{
        console.log('连接断开了');
    })
    // 注册一个错误事件
    connect.on('error',()=>{
        console.log('用户连接异常');
        

    })
})

server.listen(PORT, () => {
    console.log("websocket启动了，监听了端口"+PORT);
})