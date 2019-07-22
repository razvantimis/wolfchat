
import React, { createRef, Component } from 'react';
import {
  Map, TileLayer, Marker, Popup
} from 'react-leaflet';

export default class ChatMap extends Component {
  state = {
    hasLocation: false,
    latlng: {
      lat: 46.7712,
      lng: 23.6236
    }
  }

  mapRef = createRef()

  handleClick = () => {
    const map = this.mapRef.current;
    if (map != null) {
      map.leafletElement.locate();
    }
  }

  handleLocationFound = (e) => {
    this.setState({
      hasLocation: true,
      latlng: e.latlng
    });
  }

  render() {
    const { hasLocation, latlng } = this.state;
    // const marker = hasLocation ? (
    //   <Marker position={latlng}>
    //     <Popup>You are here</Popup>
    //   </Marker>
    // ) : null;

    return (
      <Map
        center={latlng}
        onClick={this.handleClick}
        onLocationfound={this.handleLocationFound}
        ref={this.mapRef}
        zoom={5}
      >
        <TileLayer
          url="http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png"
        />
        {/* {marker} */}
      </Map>
    );
  }
}
