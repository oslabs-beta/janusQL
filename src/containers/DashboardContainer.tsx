import React, { useState } from 'react';
import QueryPlayground from '../components/QueryPlayground';
import GraphContainer from './GraphContainer';

const DashboardContainer = () => {

  const [query, setQuery] = useState('');

  return (
    <div className="dashboard-container">
      <QueryPlayground value={query} onChange={setQuery}/>
      <GraphContainer />
    </div>
  );
};

export default DashboardContainer;