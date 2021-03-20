import React from 'react';
import { Box, Paper, Grid } from '@material-ui/core/';
import DataSize from '../Performance/DataSize';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';


const DataSizePanel = (props: TabPanelProps) => {
  
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
           <DataSize />
         <Box className={classes.box} display='flex' width='100%' justifyContent='space-between' marginTop={2}>
       </Box>
     </Box>
       )}
    </div>
  );
};

export default DataSizePanel;