import React, { Component } from 'react';
import MapContainer from './MapContainer'

export default class MapView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      assetData: null,
      aid: null
    }

    this.getAssets = this.getAssets.bind(this)
    this.getAssetsAll = this.getAssetsAll.bind(this)
  }

  getAssetsAll() {
    let that = this;
    fetch('fleet/all')
      .then(response => response.json())
      .then(data => that.setState({assetData: data}))
  }

  getAssets() {
    if(this.state.aid === null || this.state.aid == '') {
      this.getAssetsAll()
      return;
    }
    let that = this;
    fetch('fleet/id/'+this.state.aid)
      .then(response => response.json())
      .then(data => that.setState({assetData: data}))
  }
  
  render() {
    if(this.props.visible) {
      return (
        <div className="FullView">
          <div className="InputHeader">
            <span>Asset ID: </span><input 
              onChange={
                (e) => this.setState({aid: e.target.value})
              }
              value={this.state.aid} 
              type="text"
            ></input>
            <button onClick={this.getAssets}>Get Assets</button>
          </div>
          <MapContainer assetData={this.state.assetData}/>
        </div>
      );
    }
    else {
      return <div></div>;
    }
  }
}

