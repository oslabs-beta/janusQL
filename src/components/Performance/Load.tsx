import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import PerformanceContext from '../../context/PerformanceContext'

const LoadTimes: React.FunctionComponent = () => {

  const { loadTimes } = useContext(PerformanceContext)

  const label = [];
  for (let i=0; i<=50; i+=1) {
    label.push('query')
  }
  
  const chart = {
      labels: label,
      datasets: [
        {
          label: 'Response Time (ms)',
          data: loadTimes,
          backgroundColor: 'rgba(75,192,192,0.6)',
          borderWidth:4
        }
      ]
    }

    const options = {
      title: {
        display: true,
        text: 'Load Test Response Time',
        fontSize: 25,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: false
              }
            }
          ]
        }
      }
    }

  return (
    <div>
      <Bar data={chart} options={options}></Bar>
    </div>
  );
};

export default LoadTimes;