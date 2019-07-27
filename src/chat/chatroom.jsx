import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useCallback } from 'react';
import { ChatRoomList } from './chatroom-list';
import { UserAvatarAndName } from './user-avatar-and-name';
import { fetchRoomList as fetchRoomListAction } from '../redux/room';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { JOIN_ROOM } from '../redux/chat';
import { Messages } from './messages';

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
  const chatStep = useSelector(state => state.chat.step);
  const fetchRoomList = useCallback(
    () => dispatch(fetchRoomListAction()),
    [dispatch]
  )
  useEffect(() => {
    fetchRoomList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Card className={classes.root}>
      <UserAvatarAndName></UserAvatarAndName>
      {chatStep === JOIN_ROOM ? <Messages /> : <ChatRoomList />}
    </Card>
  )
}