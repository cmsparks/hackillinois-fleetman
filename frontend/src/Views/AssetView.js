import React, { Component } from 'react';
import AssetSummary from './AssetSummary'
import AllSummary from './AllSummary'

export default class AssetView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      assetData: null,
      aid: null,
      date: 'all',
      elem: null
    }

    this.getAssets = this.getAssets.bind(this)
  }

  getAssets() {
    let that = this;
    fetch('fleet/id/'+this.state.aid)
      .then(response => response.json())
      .then(data => that.setState({assetData: data}))
  }
  
  render() {
    if(this.props.visible) {
      let assetList = <li>Search for an Asset ID</li>
      if(this.state.assetData !== null) {
        assetList = this.state.assetData.data.map((elem) => {
          return (<li>
                    <button onClick={() => this.setState({date: elem.date, elem: elem})}>
                      Select
                    </button>
                    <b>{elem.date}</b>
                  </li>)
        });
      }


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
          <ul className="SidebarList">
            {/*<li>
              <b>Overview</b>
              <button onClick={() => this.setState({date: 'all', elem: null})}>
                Select
              </button>
            </li>*/}
            { assetList }
          </ul>
          { this.state.date !== 'all' ?
            <AssetSummary
              date={this.state.date}
              elem={this.state.elem}
              assetData={this.state.assetData}
            /> :
            <AllSummary
              date={this.state.date}
              assetData={this.state.assetData}
            />
          }
        </div>
      )
    }
    else {
      return <div></div>;
    }
  }
}

