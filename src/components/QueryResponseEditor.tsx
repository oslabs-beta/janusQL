import React, { useContext } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Box, Paper, Typography } from '@material-ui/core/';
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

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        flexGrow: 1,
      },
      typ: {
        textAlign: "center",
        background: "linear-gradient(45deg, #FE688B 30%, #FF8E53 90%)",
        color: "#FFFF",
        padding: "0.5em"
      }
    }),
  );

  const classes = useStyles();

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
      <Paper>
        <Typography className={classes.typ}>Response</Typography>
      </Paper>
      <CodeMirror className='code-mirror' options={resOptions} value={queryResponse}/>
    </Box>
  );
};

export default QueryResponseEditor;