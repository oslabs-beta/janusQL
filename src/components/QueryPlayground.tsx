import React, { useState, useEffect } from 'react';
import '../../node_modules/codemirror/lib/codemirror.css';
import '../../node_modules/codemirror/theme/monokai.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closebrackets';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';


const QueryPlayground = (props:any) => {

  const { value } = props;

  function handleChange (data:any, value:any) {
    console.log('grab code mirror data')
  }

  const [responseTime, setResponseTime] = useState([] as any);

  console.log(responseTime)

  // fetch input data
  const handleSubmit = () => {
    fetch('http://localhost:3000/input')
      .then((res) => res.json())
      .then((data) => {
      setResponseTime((responseTime: any) => [
        ...responseTime,
        data
      ]);
      })
    .catch(err => console.log('Handle Submit: Post Blogs: ERROR: ', err))
  }

  const handleReset = () => {
    setResponseTime([])
  }
  
  return (
    <div className="playground">
      <Container maxWidth='sm'>
      <h1 className="playground-title">Query</h1>
      <CodeMirror
        onBeforeChange = {handleChange} 
        value={value}
        className="code-mirror"
        options={{
          autoCloseBrackets: true,
          tabSize: 2,
          lineWrapping: true,
          lint: true,
          mode: 'javascript',
          lineNumbers: true
        }}
      />
      <Box display="flex" justifyContent="space-evenly" mt="1em">
        <Button variant="contained" color='primary' onClick={handleSubmit}>Load Test</Button>
        <Button variant="contained" color='primary'>Security Test</Button>
        <Button variant="contained" color='primary' onClick={handleReset}>Reset</Button>
      </Box>
      </Container>
    </div>
  );
};

export default QueryPlayground;