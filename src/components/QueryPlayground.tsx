import React from 'react';
import '../../node_modules/codemirror/lib/codemirror.css';
import '../../node_modules/codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import { UnControlled as CodeMirror } from 'react-codemirror2';


const QueryPlayground = (props:any) => {

  const { value } = props;
  
  return (
    <div className="playground">
      <div className="playground-title">Query</div>
      <CodeMirror 
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