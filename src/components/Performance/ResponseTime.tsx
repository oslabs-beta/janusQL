import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import PerformanceContext from '../../context/PerformanceContext'

const ResponseTime: React.FunctionComponent = () => {

  const { responseTime, title } = useContext(PerformanceContext)
  
  const chart = {
      labels: title,
      datasets: [
        {
          label: 'Response Time (ms)',
          data: responseTime,
          backgroundColor: [
            'rgba(75,192,192,0.6)'
          ],
          borderWidth:4,
        }
      ]
    }

    const options = {
      title: {
        display: true,
        text: 'Query Response Time',
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
      <Line data={chart} options={options}></Line>
    </div>
  );
};

export default ResponseTime;
