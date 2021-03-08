import React, { useState } from 'react';
import '../../node_modules/codemirror/lib/codemirror.css';
import '../../node_modules/codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import { UnControlled as CodeMirror } from 'react-codemirror2';


const QueryPlayground = (props:any) => {

  const { value } = props;

  function handleChange (data:any, value:any) {
    onchange:void(value);
  }
  
  return (
    <div className="playground">
      <div className="playground-title">Query</div>
      <CodeMirror
        onBeforeChange = {handleChange} 
        value={value}
        className="code-mirror"
        options={{
          lineWrapping: true,
          lint: true,
          mode: "javascript",
          lineNumbers: true,
        }}
      />
    </div>
  );
};

export default QueryPlayground;