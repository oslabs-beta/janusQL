import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import PerformanceContext from '../context/PerformanceContext'

const Graph: React.FunctionComponent = () => {

  const { responseTime } = useContext(PerformanceContext)
  
  const chart = {
      labels: ['query', 'query', 'query', 'query', 'query','query', 'query', 'query', 'query', 'query'],
      datasets: [
        {
          label: 'Response Time (ms)',
          data: responseTime,
          backgroundColor: [
            'rgba(75,192,192,0.6)'
          ],
          borderWidth:4
        }
      ]
    }

  return (
    <div>
      <Line data={chart}></Line>
    </div>
  );
};

export default Graph;
