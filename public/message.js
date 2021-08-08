var socket = io.connect('http://localhost:3000');
var message = document.getElementById('message');
var send = document.getElementById('submit');
var output=document.getElementById('disp');
var t =document.getElementById('typing');

send.addEventListener('click',function(){
   socket.emit('chat',{message:message.value});
   message.value="";
  });

message.addEventListener('click',function(){
   console.log("cc")
   socket.emit('typing');
});


   socket.on('chat',function(data){
      t.innerHTML='<p>'+""+'</p>';
   output.innerHTML+= '<p>'+data.message+'</p>';
  });

  socket.on('typing',function(){
     
    t.innerHTML= '<p>'+"Typing.."+'</p>';
  });