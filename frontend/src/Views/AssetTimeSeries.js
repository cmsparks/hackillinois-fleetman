import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2'

export default class AssetSummary extends React.Component {
  render() {
    let data = {
      labels: this.props.data.map(e => e.date),
      datasets: [
        {
          label: this.props.plot,
          backgroundColor: 'rgba(255,99,132,.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: this.props.data.map(e => e[this.props.plot])
        }
      ]
    }
    return (<div style={{margin: '60px 0'}}>
        <Bar 
          data={data}
        />
      </div>
    )
  }
}
