'use strict';

var socket = io();
  function setUsername(){
      socket.emit('setUsername', document.getElementById('name').value);
      document.getElementById('name').value = '';
  };

  var user;
  var users = '';
  var Users = [];

  socket.on('userExists', function(data){
      document.getElementById('error-container').innerHTML = data;
  });

  socket.on('userSet', function(data){
      user = data.username;
      Users.push(user);
      document.body.innerHTML = '<input type="text" placeholder="Message" id="message">\
      <button type=submit id="link2" name="button" onclick="sendMessage()">Send</button>\
      <ul id="Users"></ul>\
      <div id="message-container"></div>\
      <script>\
      $(document).ready(function(){\
        $("#message").keypress(function(e){\
          if(e.keyCode==13)\
          $("#link2").click();\
        });\
     });\
     </script>';
      showUsers(Users);
  });

  function sendMessage(){
      var msg = document.getElementById('message').value;
      document.getElementById('message').value = '';
      if(msg){
          socket.emit('msg', {message: msg, user: user});
      }
  }

  function showUsers(Users){
    //console.log("shreyansh26");
    for(var i=0; i<Users.length; i++){
      users+='Your username: '+'<b>' + Users[i] +'</b>';
    }
    //console.log(users);
    document.getElementById('Users').innerHTML = users;
  }

  socket.on('newmsg', function(data){
      if(user){
          document.getElementById('message-container').innerHTML += '<div><b><font color="#FF8C00">' + data.user + '</font></b>: ' + '<font color="#2F2F97">' + data.message + '</font>' + '</div>'
      }
  })
