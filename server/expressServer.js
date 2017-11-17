var express = require('express')
var connection = require('socket.io')
var request = require('superagent')

let port = 3000
let app = express()

let io = connection.listen(app.listen(port, function onAppListening(err) {
    if (err) {
        console.error(err);
    } else {
        console.info('SERVER IS LISTENING on PORT %s', port);
    }
}));  

io.sockets.on('connection', function (socket) {
    console.log("connection al SERVER")
    socket.emit('event', { message: 'welcome to this shit' });
    socket.on('ok_signin', function (data) {
        console.log('success: ok ok_signin!')
        getConnect()
        setInterval(longPolling,1000)
    });
    socket.on('postEvent', function (data) {
        postConnect(data)
    });
});

let lastMessage = "None"

let getConnect = () => {
  request
    .get('http://localhost:7000')
    .end((err,res) => {
        let result = res.body
        try{
          lastMessage = result[result.length-1].rowid
        }
        catch(err){
          lastMessage = 0
        }
        io.sockets.emit('message', res.text);
    })
}

let postConnect = (msg) => {
	request
		.post('http://localhost:7000')
    .set('Content-Type','application/json')
    .send({username: "fer", 
    			 chatmessage: msg})
    .end( (err,res) => {
       console.log("termino!")
    })
}

let longPolling = () => {
   request
    .get('http://localhost:7000')
    .set('Content-Type','application/json')
    .send(lastMessage)
    .timeout(1000*60*60)
    .end( (err,res) => {
       let result = res.body
       if(result[lastMessage]) {
        io.sockets.emit('message',result[lastMessage])
        lastMessage+=1
       }     
    })
}