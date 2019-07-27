// @flow
import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import type { Message } from '../redux/room'
const useStyles = makeStyles({
  feed: {
    display: "flex",
    flexDirection: "column",
    height: 250,
    overflowY: 'scroll',
    padding: 10
  },
  chatItem: {
    fontSize: 16,
    flex: 1,

    marginTop: 10,
  },
  chatSender: {
    color: grey,
    fontSize: 14
  },
  chatMessage: {
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 5,
  },
  right: {
    marginLeft: 'auto',
  },
  left: {
    marginRight: 'auto',
  },

});
function ChatItem({ message }: { message: Message }) {
  const classes = useStyles();
  return (<div className={classes.chatItem + ' ' + (message.isMy ? classes.right : classes.left)}>
    <div className={classes.chatSender} style={{ textAlign: message.isMy ? 'right' : 'left' }}>{message.senderName}</div>
    <div className={classes.chatMessage}>{message.message}</div>
  </div>);
}

export function ChatFeed({ messages }: { messages: Message[] }) {
  const classes = useStyles();
  const messageList = useRef(null);

  useEffect(() => {
    // scrollToBottom
    scrollToBottom(messageList.current);
  }, [messages])
  return (<div className={classes.feed} ref={messageList}>
    {messages.map(m => (<ChatItem key={m.id} message={m}></ChatItem>))}
  </div>)
};

function scrollToBottom(current) {
  if (!current) return;
  const scrollHeight = current.scrollHeight;
  const height = current.clientHeight;
  const maxScrollTop = scrollHeight - height;
  const node: any = ReactDOM.findDOMNode(current);
  if (node) node.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
}