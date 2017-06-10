var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//var showUsers = require('./main.js');
// Files
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/main.js', function(req, res){
  res.sendFile(__dirname + '/main.js');
});

// Port
port = process.env.PORT || 3000;

// Users array
users = [];

// Socket Connection
io.on('connection', function(socket){
  console.log('A user connected');
  socket.on('setUsername', function(data){
    //console.log("Hello");
    console.log(data);
    if(users.indexOf(data) > -1){
      socket.emit('userExists', data + ' username is taken! Try some other username.');
    }
    else{
      users.push(data);
      socket.emit('userSet', {username: data});
    }
    console.log(users);
  });
  socket.on('msg', function(data){
      //Send message to everyone
      io.sockets.emit('newmsg', data);
  })
});

//console.log(showUsers);

// Listening test
http.listen(3000, function(){
  console.log(`App listening on port ${port}`);
});
