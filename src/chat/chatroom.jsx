import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { ChatRoomList } from '../chat/chatroom-list';
import { UserAvatarAndName } from '../chat/user-avatar-and-name';
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