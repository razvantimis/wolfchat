
// @flow
import React, { useState, useCallback } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { useSelector } from 'react-redux';
import { SELECTING_COORDINATES } from '../redux/chat';
import { useDispatch } from 'react-redux'
import { selectedCoordinates } from '../redux/chat'
import { selectedRoom as selectedRoomAction, getRoomListFromState } from '../redux/room';
import { goToRoom as goToRoomAction } from '../redux/chat';
import type { Chatroom } from '../redux/room'

export function ChatMap() {
  const chatStep = useSelector(state => state.chat.step);
  const chatroomList: Chatroom[] = useSelector(getRoomListFromState);

  const [hasLocation, setHasLocation] = useState(false)
  const [latlng, setLatlng] = useState({
    lat: 46.7712,
    lng: 23.6236
  })

  const dispatch = useDispatch();
  const onSelectedCoordinates = useCallback(
    (latlng) => dispatch(selectedCoordinates({ latlng })),
    [dispatch]
  );
  const selectedRoom = useCallback(
    (selectedRoom) => {
      dispatch(selectedRoomAction(selectedRoom)).then(_ => {
        dispatch(goToRoomAction());
      });
    },
    [dispatch]
  );
  const onMapClick = ({ latlng }) => {
    if (chatStep === SELECTING_COORDINATES) {
      setHasLocation(true);
      setLatlng(latlng);
      onSelectedCoordinates(latlng);
    }
  }

  const marker = hasLocation ? (
    <Marker position={latlng}>
      <Popup>You are here</Popup>
    </Marker>
  ) : null;

  return (
    <Map
      center={latlng}
      onClick={onMapClick}
      zoom={5}
    >
      <TileLayer
        url="http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png"
      />
      {marker}
      {chatroomList.map((room, index) => <Marker key={room.id} position={room.coordinates} onClick={() => selectedRoom(room)}>
        <Popup>{room.name}</Popup>
      </Marker>)}
    </Map>
  );

}
