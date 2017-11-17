import React, { Component } from 'react'
import io from 'socket.io-client'

var socket = io.connect('http://localhost:3000')

const font = {
	fontSize: '1.2em',
  fontFamily: 'RaleWay'
}
const title = {
	fontSize: '2.2em',
	fontFamily: 'RaleWay',
	color: 'black',
	marginTop: '1em',
	position: 'relative',
  transform: 'translateX(40%)'
}
const send = {
	position: 'relative'
}
const main = {
	width: '45%',
	margin: '3em auto'
}
const input = {
	width: '62.5%',
	height: '7%',
	fontSize: '1.2em',
  fontFamily: 'RaleWay',
  borderRadius: '0.4em',
  border:'0.1em solid grey'
}

const btn = {
	width: '37.5%',
	height: '7%',
	fontSize: '1.2em',
  fontFamily: 'RaleWay',
  borderRadius: '0.4em',
  border:'0.1em solid grey'
}

const messageArea = {
	width: '100%',
	borderRadius: '0.4em',
	fontSize: '1.2em',
  fontFamily: 'RaleWay',
  border:'0.1em solid grey'
}

export default class ChatScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {
			message: "",
			messagesData: "",
		}
		this.setData = this.setData.bind(this)	
	}

	componentWillMount() {   
    socket.on(' connect',function(){
        socket.emit('ok_signin','signin successfull')
    })
    socket.on('message',function(data){
      console.log("CONECTADO AL SERVER: " + JSON.stringify(data))
    })
	}
	componentDidMount() {
		socket.on('message', this.setData.bind(this))  
	  socket.on('event', function(data) {
        socket.emit('ok_signin','signin successfull')
    })
	}

	setData(data) {
		let resultData
		let allMessages = [' MESSAGES:']
		try{
			resultData = JSON.parse(data)
			resultData.forEach( (item) => {
    	allMessages.push(`\n ${item.username} : ${item.chatmessage}`)
			})
		}
		catch(err){
			allMessages.pop()
			allMessages.push(`\n ${data.username} : ${data.chatmessage}`)
		}
		
		let previous = this.state.messagesData
	  this.setState({
	  	messagesData: previous + allMessages 
	  })
	}
	
	handleChange(e) {
	  this.setState({
	  	message: e.target.value
	  })
	}

	handleClick() {
    socket.emit('postEvent',this.state.message)
  }

	render() {
		return(
			<div style={main}>
				<h1 style={title}> Chat! </h1>
		    <textarea readOnly style={messageArea} cols="40" rows="20" value={this.state.messagesData} ></textarea>	
				<div style={send}>
		    	<input style={input} placeholder="Message" onChange={ this.handleChange.bind(this) }/>
		    	<button style={btn} onClick={ this.handleClick.bind(this) }>Send!</button>	
			</div>
			</div>
		)
	}
}