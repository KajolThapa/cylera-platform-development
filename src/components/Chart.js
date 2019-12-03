import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';

class Chart extends Component{
  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
    bandwidthData: [
        {
            bts: {timestamp: 0, sumOfBytes: 0}
        },
        {
            bfs: {timestamp: 0, sumOfBytes: 0}
        }
    ]
  }

  bytesToServerChartConfig = {
    label: 'Bytes To Server',
    data: [],
    borderColor:[
        'rgba(255, 0, 132, 0.6)'
    ],
    pointHoverBorderColor: 'rgba(220,220,220,1)',
  }
  bytesFromServerChartConfig = {
    label: 'Bytes From Server',
    data: [],
    borderColor:[
        'rgba(0, 255, 132, 0.6)'
    ],
    pointHoverBorderColor: 'rgba(220,220,220,1)',
  }

  render(){
    const { bfs, bts } = { ...this.props.bandwidthData };
    const btsRemap = bts.map(data => ({
        x: data.timestamp,
        y: data.sumOfBytes
    }))
    const bfsRemap = bfs.map(data => ({
        x: data.timestamp,
        y: data.sumOfBytes
    }))
    return (
      <div className="chart">
        <Line
          data = {
              {
                // the data.timestamp * 1000 accounts for an offset since we don't care about mila, micro, and nano seconds
                labels: bfs.map(data => new Date(data.timestamp * 1000).toISOString()),
                datasets: [
                      {...this.bytesToServerChartConfig, data: btsRemap},
                      {...this.bytesFromServerChartConfig, data: bfsRemap}
                    ]
                }
            }
          options={{
            title:{
              display:this.props.displayTitle,
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />
      </div>
    )
  }
}

export default Chart;