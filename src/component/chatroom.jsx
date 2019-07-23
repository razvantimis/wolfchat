import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { UserAvatarAndName } from '../component/user-avatar-and-name';
import { ChatRoomList } from '../component/chatroom-list';
const useStyles = makeStyles(theme => ({
  root: {
    flexDirection: "column",
    padding: theme.spacing(2),
    display: 'flex',
    width: "100%"
  },
  avatar: {
    margin: 10,
    width: 80,
    height: 80
  },

}));
export const ChatRoom = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <UserAvatarAndName></UserAvatarAndName>
      <ChatRoomList></ChatRoomList>
    </Card>
  )
}