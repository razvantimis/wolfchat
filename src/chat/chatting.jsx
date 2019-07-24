import React from 'react';
import { StartChat } from './start-chat'
import { ChatRoom } from './chatroom'
import { useSelector } from 'react-redux'
import { START_CHAT, CHAT_ROOM } from '../redux/user';

export function Chatting() {
  const step = useSelector(state => state.user.step);

  switch (step) {
    case START_CHAT:
      return <StartChat></StartChat>;
    case CHAT_ROOM:
      return <ChatRoom></ChatRoom>
    default:
      return <StartChat></StartChat>;
  }

}
