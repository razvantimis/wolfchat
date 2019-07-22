import React from 'react';
import ChatMap from './container/chat-map';
import Chatting from './container/chatting';
import './App.css';

function App() {
  return (
  
    <div className="leaflet-container">
      <ChatMap/>
      <div id="chatting">
        <Chatting/>
      </div>
    </div>
  );
}

export default App;
