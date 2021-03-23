import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Box, Paper } from '@material-ui/core/';
import GraphQLInput from '../components/GraphQLInput';
import QueryEditor from '../components/QueryEditor';
import QueryResponseEditor from '../components/QueryResponseEditor';
import GraphContainer from './GraphContainer';

const DashboardContainer = () => {

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        flexGrow: 1,
      },
      box: {
        margin: 10,
        display: "flex",
      },
      paper: {
        padding: theme.spacing(2),
        width: "100%",
        background: 'grey',
      },
      urlBox: {
        margin: 10,
        display: "flex",
      }
    }),
  );

  const classes = useStyles();

  return (
    <div>
      <GraphQLInput></GraphQLInput>
      <Box height="100%" className={classes.box}>
        <Paper className={`${classes.paper} query-cm`}>
          <QueryEditor />
        </Paper>
        <Paper className={classes.paper}>
          <QueryResponseEditor />
        </Paper>
        <Paper className={classes.paper}>
          <GraphContainer />
        </Paper>
      </Box>
    </div>
  );
};

export default DashboardContainer;