import React, { useState } from 'react';
import { Box, Paper, Grid, Typography, Tabs, Tab } from '@material-ui/core/';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Throughput from '../components/Performance/Throughput';
import ResPanel from '../components/TabPanels/ResPanel';
import DataSizePanel from '../components/TabPanels/DataSizePanel';
import Load from '../components/Performance/Load';
import AvgLoadTime from '../components/Performance/AvgLoadTime';
import Dos from '../components/Security/Dos';


const GraphContainer:React.FunctionComponent = () => {

  const [value, setValue] = useState(0);

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        flexGrow: 1,
      },
      typ: {
        textAlign: "center",
        background: "#FF8E53",
        color: "#FFFF",
        padding: "0.5em"
      },
      tab: {
        background: theme.palette.primary.contrastText,
        color: '#000'
      }
    }),
  );

  const handleTabChange = (e: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  const classes = useStyles();

  return (
    <Box>
      <Paper>
        <Typography className={classes.typ}>Metrics</Typography>
      </Paper>
      <Tabs className={classes.tab} value={value} onChange={handleTabChange} variant="scrollable">
        <Tab label='Response'></Tab>
        <Tab label='Data'></Tab>
        <Tab label='Load'></Tab>
        <Tab label='Security'></Tab>
        <Tab label='History'></Tab>
      </Tabs>

          <Box display='flex' height='100%' width='100%' justifyContent='space-between' marginTop={2}>
            <Grid item>
              <Paper>
                <ResPanel value={value} index={0}/>
                <DataSizePanel value={value} index={1}/>
              </Paper>
            </Grid>
          </Box>
        </Box>
  );
};

export default GraphContainer;
