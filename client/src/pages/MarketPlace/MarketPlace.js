import { Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { styles } from "./MarketPlaceStyle";

const MarketPlace = () => {
  useEffect(() => {}, []);
  

  const[post,setPosts]=useState([])



  const classes = styles();

  return (
    <>
      <Container className={classes.root} style={{ overflow: "auto" }}>
        <CssBaseline />
        <Box sx={{ flexGrow: 1 }}>
          <Grid container>
            <Grid items padding="20px">
              <Typography
                variant="h3"
                style={{ fontWeight: 800, textAlign: "center", color: "white" }}
              >
                Welcome to the{" "}
                <span style={{ color: "#0085f1" }}>MarketPlace</span>
              </Typography>
            </Grid>
            <Grid items padding="10px">
              <img
                src="/assets/mobile2.svg"
                alt=""
                style={{ maxWidth: "100%" }}
              />
            </Grid>

            <Grid items padding="20px">
              <Typography
                variant="h4"
                style={{ color: "white", fontWeight: "800" }}
              >
                HOTTEST DEALS
              </Typography>
              <Grid container spacing={1}>
                {}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default MarketPlace;
