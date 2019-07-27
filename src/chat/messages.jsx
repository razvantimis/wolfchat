import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import BackIcon from '@material-ui/icons/ArrowBack';
import React, { useCallback, useState } from 'react';
import { ChatFeed, Message } from 'react-chat-ui';
import { useDispatch } from 'react-redux';
import { resetState as resetStateAction } from '../redux/chat';

const bubbleStyles = {
  text: {
    fontSize: 14
  },
  chatbubble: {
    borderRadius: 20,

    padding: 15
  }
}
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
  // const step = useSelector(state => state.user.step);

  const messages = [
    new Message({
      id: 1,
      senderName: 'Razvan',
      message: "I'm the recipient",
    }), // Gray bubble
    new Message({
      id: 0, message: "I'm you -- the blue bubble!",
      senderName: 'Mihai',
    }), // Blue bubble
  ];
  const classes = useStyles();

  // state
  const [msg, setMsg] = useState('');
  // Functions
  const dispatch = useDispatch()
  const onBack = useCallback(
    () => dispatch(resetStateAction()),
    [dispatch]
  )
  const sendMsg = (msg) => {
    console.log(msg);
  }

  return (<div className={classes.root}>
    <div className={classes.header}>
      <IconButton aria-label="Add" onClick={onBack}>
        <BackIcon />
      </IconButton>
      <span className={classes.title}>Room 1</span>
    </div>
    <ChatFeed
      messages={messages} // Boolean: list of message objects
      showSenderName // show the name of the user who sent the message
      // JSON: Custom bubble styles
      bubbleStyles={
        bubbleStyles}
    ></ChatFeed>
    <div className={classes.footer}>
      <TextField
        label="Send message"
        className={classes.footerTextField}
        margin="normal"
        value={msg}
        onChange={e => setMsg(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={() => sendMsg(msg)}>
        Send
     </Button>
    </div>
  </div>);

}