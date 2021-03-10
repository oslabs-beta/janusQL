import React, { useContext } from 'react';
import '../../node_modules/codemirror/lib/codemirror.css';
import '../../node_modules/codemirror/theme/monokai.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closebrackets';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import PerformanceContext from '../context/PerformanceContext';


const QueryPlayground: React.FunctionComponent = () => {

  // Pull out responseTime & setResponseTime state from Performance Context
  const { responseTime, setResponseTime } = useContext(PerformanceContext);

  // TODO : TS
  function handleChange (data:any, value:any) {
    console.log('grab code mirror data')
  }

  console.log(responseTime)

  // fetch input data
  const handleSubmit = () => {
    fetch('http://localhost:3000/input')
      .then((res) => res.json())
      .then((data) => {

      // TODO : TS
      setResponseTime((responseTime: any) => [
        ...responseTime,
        data
      ]);
      })
    .catch(err => console.log('Handle Submit: Get ResponseTime: ERROR: ', err))
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
        // value={value}
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
        <Button variant="contained" color='primary' onClick={handleSubmit}>Submit</Button>
        <Button variant="contained" color='primary'>Security Test</Button>
        <Button variant="contained" color='primary' onClick={handleReset}>Reset</Button>
      </Box>
      </Container>
    </div>
  );
};

export default QueryPlayground;