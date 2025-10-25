import http from "http";
import { Server } from "socket.io";
import application from "./src/config/express.config.js";

const args = process.argv.splice(2) || null
let port = 9005;
let host = '127.0.0.1'

if(args.length){
    
    args.map((str)=>{
        const [key, value] = str.split("=")
        if(key === 'host'){
            host = value
        }else if(key ==='port'){
            port =value
        }
        console.log(key, value)
    })
}

const appServer = http.createServer(application);

const io = new Server(appServer, {
    cors: {
        origin: "http://localhost:3000",
    },
});

io.on("connection", (socket)=>{
    // console.log(socket.id)
    socket.on("newMessage", (data)=>{
        socket.broadcast.emit("newMessageReceived", data)
    })
    
})
 

appServer.listen(port, host, (err)=>{
    if(!err){
        console.log('server is running on port: ', port);
        console.log("Press CTRL + C to disconnect server.");
    }
    else{
        console.log(err);
    }
})