import React, { useState, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux'
import { startChat } from '../redux/user'
const useStyles = makeStyles(theme => ({
  root: {
    flexDirection: "column",
    padding: theme.spacing(2),
    justifyContent: "space-evenly",
    display: 'flex',
    width: "100%"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },

}));
export const StartChat = () => {
  const dispatch = useDispatch()
  const onStartChat = useCallback(
    (username) => dispatch(startChat({ username })),
    [dispatch]
  )
  const classes = useStyles();
  const [userName, setUserName] = useState('');
  return (
    <Card className={classes.root}>
      <TextField
        label="Your name"
        className={classes.textField}
        margin="normal"
        value={userName}
        onChange={e => setUserName(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={() => onStartChat(userName)}>
        Start chat
     </Button>
    </Card>
  )
}