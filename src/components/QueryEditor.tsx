import React from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { Box, Button, Paper, Typography } from '@material-ui/core/';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
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

const QueryEditor = () => {

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        flexGrow: 1,
      },
      typ: {
        textAlign: "center",
        background: "#FE688B",
        color: "#FFFF",
        padding: "0.5em"
      }
    }),
  );

  const classes = useStyles();

  const gQLoptions = {
    mode: "graphql",
    scrollbarStyle: "native",
    theme: "monokai",
    lineNumbers: true,
    lint: true,
    hintOptions: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    indentUnit: 2,
    tabSize: 2,
  }

  return (
    <Box>
      <Paper>
        <Typography className={classes.typ}>Workspace</Typography>
      </Paper>
      <CodeMirror className='code-mirror' options={gQLoptions} />
      <Box display='flex' justifyContent='space-between' mt='1em'>
        <Button variant='contained' color='primary'>Reset</Button>
        <Button variant='contained' color='primary'>Submit</Button>
      </Box>
    </Box>
  );
};

export default QueryEditor;