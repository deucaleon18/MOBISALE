import { Container } from '@mui/material'
import React from 'react'

import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { styles } from "./NewPostStyle";


const NewPost = () => {

    const classes=styles()
    return (
      <div>
        <Container className={classes.root}>
          <CssBaseline/>

        </Container>
      </div>
    );
}

export default NewPost
