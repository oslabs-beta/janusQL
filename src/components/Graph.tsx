import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const Graph = (props:any) => {

  const [chartData, setChartData] = useState({})
  
  const chart = () => {
    setChartData({
      labels: ['query', 'query', 'query', 'query', 'query'],
      datasets: [
        {
          label: 'Response Time (ms)',
          data: [32, 45, 12, 76, 69],
          backgroundColor: [
            'rgba(75,192,192,0.6)'
          ],
          borderWidth:4
        }
      ]
    })
  }

  useEffect(() => {
    chart()
  }, []);

  return (
    <div>
      <Line data={chartData}></Line>
    </div>
  );
};

export default Graph;
