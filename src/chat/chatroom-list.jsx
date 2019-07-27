import React, { useCallback } from 'react';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch } from 'react-redux';
import List from '@material-ui/core/List';
import { ChatRoomSearch } from './chatroom-search';
import { startSelectionCoordinates } from '../redux/chat';
import type { Chatroom } from '../redux/room';
import { selectedRoom as selectedRoomAction } from '../redux/room';
import { goToRoom as goToRoomAction } from '../redux/chat';
import { useSelector } from 'react-redux';

function Row({ room }) {
  const chatroom: Chatroom = room;
  const dispatch = useDispatch()
  const selectedRoom = useCallback(
    (selectedRoom) => {
      dispatch(selectedRoomAction(selectedRoom)).then(_ => {
        dispatch(goToRoomAction());
      });
    },
    [dispatch]
  );
  return (
    <ListItem button key={chatroom.id} onClick={() => selectedRoom(chatroom)}>
      <ListItemText
        primary={chatroom.name}
        secondary={`Latitude: ${chatroom.coordinates.lat.toFixed(2)}, Longitude: ${chatroom.coordinates.lng.toFixed(2)}`}
        secondaryTypographyProps={{ align: "left" }} />
    </ListItem>
  )
}

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: 400
  },
  nothingToShow: {
    fontSize: 20,
    padding: 25
  },
  list: {
    width: '100%',
    maxWidth: 360,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  search: {
    padding: 15,
    display: 'flex',
    justifyContent: 'space-evenly'
  }
};
export function ChatRoomList() {
  const dispatch = useDispatch()
  const onStartSelectingCoordinates = useCallback(
    () => dispatch(startSelectionCoordinates()),
    [dispatch]
  );
  const chatroomList = useSelector(state => Object.values(state.room.list));

  return (
    <Card style={styles.root}>
      <div style={styles.search}>
        <ChatRoomSearch></ChatRoomSearch>
        <IconButton aria-label="Add" onClick={onStartSelectingCoordinates}>
          <AddIcon />
        </IconButton>
      </div>

      {chatroomList.length > 0 ?
        <List style={styles.list}
        >
          {chatroomList.map(room => (<Row key={room.id} room={room}></Row>))}
        </List>
        :
        <span style={styles.nothingToShow}>Nothing to show here.<br /> Use the + button to create a new chat</span>}
    </Card>
  );
}