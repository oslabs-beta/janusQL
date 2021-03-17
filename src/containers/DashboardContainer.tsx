import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Box, Paper } from '@material-ui/core/';
import '../../node_modules/codemirror/lib/codemirror.css';
import '../../node_modules/codemirror/theme/monokai.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closebrackets';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/show-hint.css";
import "codemirror-graphql/hint";
import "codemirror-graphql/lint";
import "codemirror-graphql/mode";
import "codemirror/addon/lint/lint.css";
import GraphQLInput from '../components/GraphQLInput';

const DashboardContainer = () => {

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        flexGrow: 1,
      },
      box: {
        margin: 10,
        display: "flex",
        height: "89vh",
      },
      paper: {
        padding: theme.spacing(2),
        width: "100%",
      },
      urlBox: {
        margin: 10,
        display: "flex",
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
    <div>
      <GraphQLInput></GraphQLInput>
      <Box height="100%" className={classes.box}>
        <Paper className={`${classes.paper} query-cm`}>
          <CodeMirror
            className="code-mirror"
            options={gQLoptions}></CodeMirror>
        </Paper>
        <Paper className={classes.paper}>
          <CodeMirror></CodeMirror>
        </Paper>
        <Paper className={classes.paper}>
        </Paper>
      </Box>
    </div>
  );
};

export default DashboardContainer;