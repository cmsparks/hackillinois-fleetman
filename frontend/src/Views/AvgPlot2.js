import React, { Component } from 'react';

function round(x) {
  return Math.round(x * 100)/100
}

export default class AvgPlot extends React.Component {
  render() {
    let data = this.props.data.map(e => e[this.props.plot])
    let max = round(Math.max(...data))
    let min = round(Math.min(...data))
    let total = 0;
    for(let i = 0; i < this.props.data.length; i++) {
      total += this.props.data[i][this.props.plot];
    }
    let avg = round(total / this.props.data.length)
    
    console.log(data)
    console.log(max)
    console.log(min)
    console.log(avg)

    return (
      <div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '1000px',
          margin: '30px 0'
        }}>
          <span style={{margin: '15px'}}>Min: {min}</span>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '400px',
            height: '60px',
            backgroundColor:'rgba(255,99,132,.2)'
          }}>
              <span style={{margin: '0 auto'}}><b></b></span>
            <div style={{display: 'inline-block', alignSelf:'center', height: '100%', width: '2px', backgroundColor: 'black'}}></div>
              <span style={{margin: '0 15px', marginRight: '100px'}}>Avg: {avg}</span> 
          </div>
          <span style={{margin: '15px'}}>Max: {max}</span>
        </div>
      </div>
    )
  }
}
