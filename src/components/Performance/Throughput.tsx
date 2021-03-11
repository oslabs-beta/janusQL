import React, { useContext } from 'react';
import PerformanceContext from '../../context/PerformanceContext'
import {
  Card,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';


const Throughput: React.FunctionComponent = () => {

  const { throughput } = useContext(PerformanceContext)

  return (
    <Card>
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              Throughput (Queries/sec)
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {throughput}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Throughput;