import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useCallback } from 'react';
import { ChatRoomList } from './chatroom-list';
import { UserAvatarAndName } from './user-avatar-and-name';
import { fetchRoomList as fetchRoomListAction } from '../redux/room';
import { useDispatch } from 'react-redux';

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
  const dispatch = useDispatch()

  const fetchRoomList = useCallback(
    () => dispatch(fetchRoomListAction()),
    [dispatch]
  )
  useEffect(() => {
    fetchRoomList();
  }, []);
  return (
    <Card className={classes.root}>
      <UserAvatarAndName></UserAvatarAndName>
      <ChatRoomList></ChatRoomList>
    </Card>
  )
}