import React, { Component } from 'react';
import './App.css';
import Chart from './components/Chart';

class App extends Component {
  constructor(){
    super();
    this.state = {
      bandwidthData: {
        bts: [],
        bfs: []
      },
      chartData: {}
    }
  }

  componentWillMount(){
    this.getBandwithData();
  }

  getBandwithData(){
    const { pathname, search } = window.location;
    fetch(`${pathname}${search}`)
     .then(response => response.json())
     .then(data => this.setState({bandwidthData: {...data}}))
  }

  
  render() {
    return (
      <div className="App">
        <Chart bandwidthData={this.state.bandwidthData}  legendPosition="bottom"/>
      </div>
    );
  }
}

export default App;