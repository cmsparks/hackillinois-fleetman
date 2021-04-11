import React, { Component } from 'react';
import AlertAssetSummary from './AlertAssetSummary'
export default class DayView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      assetData: null,
      assetDataOne: null,
      aid: null,
      elem: null
    }

    this.getAssets = this.getAssets.bind(this)
    this.getAssetData = this.getAssetData.bind(this)
    let that = this;
    fetch('fleet/assets/all')
      .then(response => response.json())
      .then(data => that.setState({assetData: data}))
  }

  getAssets() {
    let that = this;
    fetch('fleet/assets/all')
      .then(response => response.json())
      .then(data => that.setState({assetData: data}))
  }
  
  getAssetData(aid) {
    let that = this;
    fetch('fleet/id/'+aid)
      .then(response => response.json())
      .then(data => that.setState({assetDataOne: data}))
  }
  
  render() {
    if(this.props.visible) {
      let assetList = <li>Loading all assets...</li>
      if(this.state.assetData !== null){
      assetList = this.state.assetData.data.map((elem) => {
        return (<li>
                  <button onClick={() => {
                      this.setState({elem: elem})
                      this.getAssetData(elem.asset_id)
                    }
                  }>
                    Select
                  </button>
                  <b>{elem.asset_id} - {elem.asset_type}</b>
                </li>)
      });
      }


      return (
        <div className="FullView">
          <div className="InputHeader">
            <button onClick={this.getAssets}>Refresh</button>
          </div>
          <ul className="SidebarList">
            { assetList }
            <li>Too many results to show all</li>
          </ul>
        {this.state.elem !== null ? <AlertAssetSummary
              elem={this.state.elem}
              assetData={this.state.assetDataOne}
            /> : (<div className="AssetDetail AllSummary">
      <h2>No item selected</h2>
      <p>Select an asset id to start, for example: 1032011</p>
    </div>)}
        </div>
      )
    }
    else {
      return <div></div>;
    }
  }
}

