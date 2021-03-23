import React from 'react';
import ResponseTime from '../Performance/ResponseTime'
import { Box, Paper, Grid } from '@material-ui/core/';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import AvgLoadTime from '../Performance/AvgLoadTime';
import Throughput from '../Performance/Throughput';

const LoadPanel = (props: TabPanelProps) => {
  
  const { value, index } = props;

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      box: {
        transform: "translateY(10em)",
      },
    }),
  );

  const classes = useStyles();

  return (
    <div hidden={ value !== index }>
      { value === index && (
        <Box>
          <ResponseTime />
          <Box className={classes.box} display='flex' width='100%' justifyContent='space-between' marginTop={2}>
          <Grid item>
            <Paper>
              <AvgLoadTime />
            </Paper>
          </Grid>
          <Grid item>
            <Paper>
              <Throughput />
            </Paper>
          </Grid>
        </Box>
      </Box>
       )}
    </div>
  );
};

export default LoadPanel;