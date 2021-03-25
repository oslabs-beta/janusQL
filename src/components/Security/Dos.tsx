import React, { useContext } from 'react';
import PerformanceContext from '../../context/PerformanceContext'
import {
  Card,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';


const Dos: React.FunctionComponent = () => {

  const { dos } = useContext(PerformanceContext)

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
              DOS Test
            </Typography>
            <Typography className={dos === "pass" ? "green" : "red"}
              variant="h3"
            >
              {dos}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Dos;