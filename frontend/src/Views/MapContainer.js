import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';

export class MapContainer extends React.Component {
  render() {
    var bounds = new this.props.google.maps.LatLngBounds();
    
    if(this.props.assetData === null) {
      return <div></div>;
    }

    return (
      <Map
        className="Map SubView"
        google={this.props.google}
        containerStyle={{
          position: 'relative',
          width: '60vw',
          height: '50vh'
        }}
        initialCenter={{
            lat: this.props.assetData.geoinfo.lat,
            lng: this.props.assetData.geoinfo.lng
        }}
        zoom={14}
      >
        {this.props.assetData.data.map((elem) => {
          return <Marker position={{
            lat: elem.lat,
            lng: elem.lng
          }}
          icon={{
            url: '/static/react/dot.png',
            anchor: new this.props.google.maps.Point(4,4),
            scaledSize: new this.props.google.maps.Size(8,8)
          }}/>
        })} 
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyATvGRRH9nWQfuLWudRtg7dPUIRr7U6hfQ'
})(MapContainer)
