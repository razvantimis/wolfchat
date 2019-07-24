import React from 'react';
import { ChatMap } from './map/chat-map';
import { Chatting } from './chat/chatting';
import { NewChatroomDialog } from './chat/new-chatroom-dialog';
import { SELECTING_COORDINATES, CREATE_NEW_CHAT_ROOM } from './redux/chat';
import { useSelector } from 'react-redux';

import './App.css';

function App() {
  const chatStep = useSelector(state => state.chat.step);
  return (
    <div className="leaflet-container">
      {chatStep === SELECTING_COORDINATES && <div className="dialog-selecting-coordinates">Choose the chat location on the map</div>}
      {chatStep === CREATE_NEW_CHAT_ROOM && <NewChatroomDialog></NewChatroomDialog>}
      <ChatMap />
      <div className="chatting">
        <Chatting />
      </div>
    </div>
  );
}

export default App;
