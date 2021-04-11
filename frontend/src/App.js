import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MapView from './Views/MapView';
import AlertsView from './Views/AlertsView';
import AssetView from './Views/AssetView';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: "alerts"
    }
  }

  handleButton(visibilityType) {
    this.setState({visibility: visibilityType})
  }

  render() {

    return (
      <div>
        <header className="TitleBar">
          <h1>Fleetman</h1>
        </header>
        <AssetView visible={this.state.visibility === "asset"}/>
        <AlertsView visible={this.state.visibility === "alerts"}/>
        <div className="ViewSelector">
          <button 
            style={{
              color: this.state.visibility === 'alerts' ? 'blue' : 'black'
            }}
          onClick={() => this.handleButton("alerts")}>Assets View</button>
          <button 
            style={{
              color: this.state.visibility === 'asset' ? 'blue' : 'black'
            }}
          onClick={() => this.handleButton("asset")}>Day View</button>
        </div>
      </div>
    );
  }
}

export default App;
