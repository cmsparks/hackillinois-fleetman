import React, { Component } from 'react';
import MapContainer from './MapContainer'
import AvgPlot from './AvgPlot2'

function round(x) {
  return Math.round(x * 100)/100
}

function averageVal(e, key) {
    let total = 0;
    for(let i = 0; i < e.length; i++) {
      total += e[i][key];
    }
    let avg = round(total / e.length)
  return avg
}

export default class AlertAssetSummary extends React.Component {
  render() {
    console.log(this.props)
    if (this.props.assetData === null) {
      return <div className="AssetDetail AllSummary">
      <h2>Asset: {this.props.elem.asset_id} - {this.props.elem.asset_type}</h2>
        <p>Loading...</p>
        </div>
    }
      
    return (<div className="AssetDetail AllSummary">
      <h2>Asset: {this.props.elem.asset_id} - {this.props.elem.asset_type}</h2>
      <h3>Operation Statistics</h3>
      <p>Average Total Fuel: {averageVal(this.props.assetData.data, "total_fuel")}</p>
      <p>Average Run Time: {averageVal(this.props.assetData.data, "total_hours")}</p>
      <p>Average Fuel Used: {averageVal(this.props.assetData.data, "fuel_used")}</p>
      <p>Operating Latitude: {averageVal(this.props.assetData.data, "lat")}</p>
      <p>Operating Longitude: {averageVal(this.props.assetData.data, "lng")}</p>
      <h3>Asset Location Map</h3>
      {this.props.assetData === null ? "Loading" : <div>
        
        <MapContainer assetData={this.props.assetData}/>
      </div>}
      <h3>Total Fuel Averages for {this.props.elem.asset_id}</h3>
      <AvgPlot plot="total_fuel" data={this.props.assetData.data}/>
      <h3>Total Hours Averages for {this.props.elem.asset_id}</h3>
      <AvgPlot plot="total_hours" data={this.props.assetData.data}/>
      <h3>Fuel Used Averages for {this.props.elem.asset_id}</h3>
      <AvgPlot plot="fuel_used" data={this.props.assetData.data}/>
    </div>)
  }
}

