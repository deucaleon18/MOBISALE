import { Container, Typography ,Paper, Button} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import axios from 'axios'
import { styles } from "./MarketPlaceStyle";


const MarketPlace = () => {

   const [posts, setPosts] = useState([]);
   const [loading,setLoading]=useState(true)

  useEffect(() => {
   
   const getPosts=async()=>{
     await axios
       .get("http://localhost:5000/posts", {
         params: {
          token:localStorage.getItem("token"),
         },
       })
       .then((res) => {
         console.log(res);
         setPosts(res.data.posts)
       })
       .then(()=>{
         setLoading(false)
       })
       .catch((err) => {
         console.log(err);
       });
    
   }
 getPosts();

  }, []);
  

 



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
                Welcome to the
                <span style={{ color: "#0085f1" }}> MarketPlace</span>
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
              <Grid container spacing={1} padding={2}>
                {
                  !loading?
                    posts.map((post)=>{
                      const url = `https://ipfs.infura.io/ipfs/${post.postImageHash}`;
                      return (
                        <>
                          <Grid xs={6} items>
                            <Paper elevation={1}color="#252953" padding={2}>
                              <img
                                style={{ maxWidth: "100%" }}
                                src={url}
                                alt=""
                              />
                              <Typography
                                style={{
                                  color: "white",
                                  fontWeight: "800",
                                  textAlign: "center",
                                  textTransform: "uppercase",
                                }}
                              >
                                {post.postTitle}
                              </Typography>
                              <Typography
                                color="secondary"
                                style={{
                                  fontWeight: "800",
                                  paddingLeft: "10px",
                                }}
                              >
                                {post.postDescription}
                              </Typography>
                              <Grid sx={{display:"flex",justifyContent:"space-between"}}>
                                <Typography
                                  style={{
                                    color: "white",
                                    fontWeight: "800",
                                    paddingLeft: "10px",
                                  }}
                                >
                                  {post.cost} ETH
                                </Typography>
                                <Link to={`/posts/${post._id}`}>
                                <Button
                                  style={{
                                    color: "white",
                                    backgroundColor: "#0085f1",
                                  }}
                                >
                                  VIEW
                                </Button>
                                </Link>
                              </Grid>
                            </Paper>
                          </Grid>
                        </>
                      );
                      
                    
                    })
                  :null
                }
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default MarketPlace;
