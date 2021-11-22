import { Button, Container, Typography } from "@mui/material";
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { styles } from "./HomePageStyle";

const HomePage = () => {
  const classes = styles();
  return (
    <>
      <Container className={classes.root}>
        <CssBaseline />
        <Box sx={{ flexGrow: 1 }}>
          <Grid item sx={{ padding: 4 }}>
            <img
              style={{ maxWidth: "100%" }}
              alt=""
              src="/assets/mobile1.svg"
            />
          </Grid>
          <Grid item>
            <Typography
              variant="h4"
              sx={{ textAlign: "center", marginBottom: 3, marginTop: 2 }}
              color="white"
            >
              One stop shopping place for your applications
            </Typography>
            <Typography
              variant="h6"
              sx={{ textAlign: "center", marginBottom: 2,fontWeight:800}}
              color="secondary"
            >
              Buy and sell latest mobile applications
            </Typography>
            <Typography variant="h6" sx={{ textAlign: "center" }} color="white">
              Fast Easy Secure
            </Typography>
            <Button style={{backgroundColor:"#0085f1",color:"white"}} >
              START NOW
            </Button>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
