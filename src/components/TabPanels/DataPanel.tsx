import React from 'react';


const DataPanel = (props: TabPanelProps) => {
  
  const { value, index } = props;

  return (
    <div hidden={ value !== index }>
      { value === index && (
        <div>Data Panel</div>
       )}
    </div>
  );
};

export default DataPanel;