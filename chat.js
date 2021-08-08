var express  = require('express');
var app = express();
var server =  require('http').createServer(app);
 
var socket = require('socket.io');
var morgan = require('morgan');
 

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
 

var io=socket(server,{cors:{origin:"*"}});
app.get('/',(req,res)=>{
    res.render('chat_msg',{title:'Home'});
});
app.get('/signup',(req,res)=>{
    res.render('signup',{title:'Signup'});
});
app.get('/login',(req,res)=>{
    res.render('login',{title:'Login'});
});
 

server.listen(3000,()=>{
    console.log("server running");
});
io.on('connection',(socket)=>{
socket.on('chat',function(data){
io.sockets.emit('chat',data);
});

socket.on('typing',function(){
    io.sockets.emit('typing');
    });
});
app.use((req,res)=>{
    res.status(404).send('chat_msg');
})