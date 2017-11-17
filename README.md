# Chat!
### A chat implemented with web sockets!

Technologies used: 

- React JS
- Webpack, babel, ES6
- Socket.io
- Superagent
- concurrently
- express JS

Implemented GET, POST and POLLING. The purpose of these methods is: to get the chat messages, send messages to other users
and constantly check for new messages that other users send.

# How to Run

First, run the python chat server, located in chatServer folder

Ip and Port set to localhost:7000 for the chat SERVER

The local expressJS server is set to localhost with port 3000

Simply run "npm start" ,
and it will start both the expressJS server and react application
