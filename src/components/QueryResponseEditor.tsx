import React, { useContext } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { Box } from '@material-ui/core/';
import PerformanceContext from '../context/PerformanceContext';
import '../../node_modules/codemirror/lib/codemirror.css';
import '../../node_modules/codemirror/theme/monokai.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closebrackets';
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/show-hint.css";
import "codemirror-graphql/hint";
import "codemirror-graphql/lint";
import "codemirror-graphql/mode";
import "codemirror/addon/lint/lint.css";

const QueryResponseEditor = () => {

  const { queryResponse } = useContext(PerformanceContext);

  const resOptions = {
    mode: "graphql",
    scrollbarStyle: "native",
    theme: "monokai",
    lineNumbers: true,
    lineWrapping: true,
    lint: true,
    hintOptions: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    indentUnit: 2,
    tabSize: 2,
    readOnly: true
  }
    
  return (
    <Box>
      <CodeMirror className='code-mirror' options={resOptions} value={queryResponse}/>
    </Box>
  );
};

export default QueryResponseEditor;