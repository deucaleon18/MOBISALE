import { Container } from '@mui/material'
import React from 'react'
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import {styles} from "./MarketPlaceStyle"



const MarketPlace = () => {
      const classes = styles();
    return (
      <>
        <Container className={classes.root}>
          <CssBaseline />
        </Container>
      </>
    );
}

export default MarketPlace
