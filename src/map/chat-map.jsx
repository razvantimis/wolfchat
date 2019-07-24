
import React, { useState, useCallback } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { useSelector } from 'react-redux';
import { SELECTING_COORDINATES } from '../redux/chat';
import { useDispatch } from 'react-redux'
import { selectedCoordinates } from '../redux/chat'
export function ChatMap() {
  const chatStep = useSelector(state => state.chat.step);
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
  const onMapClick = ({ latlng }) => {
    if (chatStep === SELECTING_COORDINATES) {
      setHasLocation(true);
      setLatlng(latlng);
      onSelectedCoordinates(latlng);
    } 
  }
  const handleLocationFound = ({ latlng }) => {
    console.log(latlng);
    setHasLocation(true);
    setLatlng(latlng)
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
      onLocationfound={handleLocationFound}
      zoom={5}
    >
      <TileLayer
        url="http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png"
      />
      {marker}
    </Map>
  );

}
