// @flow
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import BackIcon from '@material-ui/icons/ArrowBack';
import React, { useCallback, useState } from 'react';
import { ChatFeed } from './chat-feed';
import { batch, useDispatch, useSelector } from 'react-redux';
import { resetState as resetChatStateAction } from '../redux/chat';
import { deselectRoom as deselectRoomAction, sendMessage as sendMessageAction } from '../redux/room';
import type { Chatroom } from '../redux/room';

const useStyles = makeStyles(theme => ({
  root: {
    flexDirection: "column",
    padding: theme.spacing(2),
    display: 'flex',
    width: 450,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid'
  },
  title: {
    fontSize: 24,
    flex: 1,
    textAlign: "center"
  },
  header: {
    display: 'flex',

  },
  footer: {
    display: 'flex',
    alignItems: 'center'
  },
  footerTextField: {
    flex: 1,
    margin: 15
  }

}));
export function Messages() {
  const classes = useStyles();
  const selectedRoom: Chatroom = useSelector(state => state.room.list[state.room.selectedRoomId]);
  // state
  const [msg, setMsg] = useState('');

  // Functions
  const dispatch = useDispatch()
  const onBack = useCallback(
    () => {
      batch(() => {
        dispatch(resetChatStateAction())
        dispatch(deselectRoomAction());
      });
    },
    [dispatch]
  );
  const sendMsg = useCallback(
    (msg) => {
      dispatch(sendMessageAction(msg));
      setMsg('');
    },
    [dispatch]
  );


  return (<div className={classes.root}>
    <div className={classes.header}>
      <IconButton aria-label="Add" onClick={onBack}>
        <BackIcon />
      </IconButton>
      <span className={classes.title}>{selectedRoom.name}</span>
    </div>
    <ChatFeed
      messages={selectedRoom.messages}
    ></ChatFeed>
    <div className={classes.footer}>
      <TextField
        label="Send message"
        className={classes.footerTextField}
        margin="normal"
        value={msg}
        onChange={e => setMsg(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            sendMsg(msg)
          }
        }}
      />
      <Button variant="contained" color="primary" onClick={() => sendMsg(msg)}>
        Send
     </Button>
    </div>
  </div>);

}
