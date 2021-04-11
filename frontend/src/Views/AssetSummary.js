import React, { Component } from 'react';
import AssetTimeSeries from './AssetTimeSeries'
import AvgPlot from './AvgPlot'

function round(x) {
  return Math.round(x * 100)/100
}

export default class AssetSummary extends React.Component {
  render() {
    return (<div className="AssetDetail AssetSummary">
      <h2>Asset: {this.props.elem.asset_id} - {this.props.elem.asset_type}</h2>
      <h3>Operation Statistics</h3>
      <p>Date: {this.props.elem.date}</p>
      <p>Fuel Remaining: {round(this.props.elem.pct_fuel * 0.01 * this.props.elem.total_fuel)}/{this.props.elem.total_fuel} ({this.props.elem.pct_fuel}%)</p>
      <p>Hours Out: {this.props.elem.total_hours}</p>
      <p>Latitude: {this.props.elem.lat}</p>
      <p>Longitude: {this.props.elem.lng}</p>
      <h3>Total Hours Graph and Averages for {this.props.elem.date}</h3>
      <AvgPlot plot="total_hours" data={this.props.assetData.data} elem={this.props.elem}/>
      <AssetTimeSeries plot="total_hours" data={this.props.assetData.data} elem={this.props.elem} />
      <h3>Total Fuel Graph and Averages for {this.props.elem.date}</h3>
      <AvgPlot plot="total_fuel" data={this.props.assetData.data} elem={this.props.elem}/>
      <AssetTimeSeries plot="total_fuel" data={this.props.assetData.data} elem={this.props.elem} />
      <h3>Fuel Used Graph and Averages for {this.props.elem.date}</h3>
      <AvgPlot plot="fuel_used" data={this.props.assetData.data} elem={this.props.elem}/>
      <AssetTimeSeries plot="fuel_used" data={this.props.assetData.data} elem={this.props.elem} />
    </div>)
  }
}

