import React, { Component, } from 'react';
import { StartChat } from '../component/start-chat'
import { ChatRoom } from '../component/chatroom'


export default class Chatting extends Component {
  state = {
    view: 'login'
  }
  onStartChatting = (username) => {
    console.log('start', username)
  }
  render() {
    return (
      <>
      {/* <StartChat onStartChatting={this.onStartChatting}></StartChat> */}
      <ChatRoom></ChatRoom>
      </>
    );
  }
}
