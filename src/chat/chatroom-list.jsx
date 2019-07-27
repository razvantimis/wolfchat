import React, { useCallback } from 'react';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch } from 'react-redux';
import { FixedSizeList as List } from "react-window";
import { ChatRoomSearch } from './chatroom-search';
import { startSelectionCoordinates } from '../redux/chat';
import type { Chatroom } from '../redux/room';
import { selectedRoom as selectedRoomAction } from '../redux/room';
import { joinRoom as joinRoomAction } from '../redux/chat';
import { useSelector } from 'react-redux';

function Row({ index, data }) {
  const chatroom: Chatroom = data[index];
  const dispatch = useDispatch()
  const selectedRoom = useCallback(
    (selectedRoom) => {
      dispatch(selectedRoomAction({ selectedRoom }));
      dispatch(joinRoomAction());
    },
    [dispatch]
  );

  return (
    <ListItem button key={index} onClick={() => selectedRoom(chatroom)}>
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
    minHeight: 300
  },
  nothingToShow: {
    fontSize: 20,
    padding: 25
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
  )

  const chatroomList = useSelector(state => state.room.list);
  return (
    <Card style={styles.root}>
      <div style={styles.search}>
        <ChatRoomSearch></ChatRoomSearch>
        <IconButton aria-label="Add" onClick={onStartSelectingCoordinates}>
          <AddIcon />
        </IconButton>
      </div>

      {chatroomList.length > 0 ?
        <List
          className="List"
          height={300}
          itemCount={chatroomList.length}
          itemSize={10}
          itemData={chatroomList}
          width={350}
        >
          {Row}
        </List>
        :
        <span style={styles.nothingToShow}>Nothing to show here.<br /> Use the + button to create a new chat</span>}
    </Card>
  );
}