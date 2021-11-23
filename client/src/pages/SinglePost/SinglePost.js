import { Container, CssBaseline, Typography,Button, Grid} from "@mui/material";
import React, { useEffect, useState } from "react";
import { styles } from "./SinglePostStyle";
import { useParams } from "react-router";
import axios from "axios"
import useBasicFetch from "../../hooks/useBasicFetch";






const SinglePost = () => {
   


 
  const [web3,account,contract,contractLoading] = useBasicFetch();
  const classes = styles();
  const postId = useParams("id");
  const [post,setPost]=useState(undefined)
  const [loading,setLoading]=useState(true)
  const [creator,setCreator]=useState(undefined)
  const [cost,setCost]=useState(undefined)
  const [postImageUrl,setPostImageUrl]=useState(undefined)


  const buyPost=async(e)=>{
  e.preventDefault()
  // console.log(cost.toString())
  console.log(web3.utils.toWei(cost.toString(), "ether"));
  await contract.methods
    .buyPost(creator, web3.utils.toWei(cost.toString(), "ether"))
    .send({ from: account, value: web3.utils.toWei(cost.toString(), "ether") })
    .then(async (res) => {
      console.log(res);
      await axios
        .post(`/posts/sell/${postId.id}`, {
          params: {
            username: creator,
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
  }
  useEffect(()=>{



//for single post the url parameter is extracted and data is fetched from the backend
  const getPostDetails=async()=>{
  await axios.get(`/posts/${postId.id}`, {
    params: {
      token: localStorage.getItem("token")
    },
  })
  .then((res)=>{
    console.log(res.data.posts.username)
    setPost(res.data.posts)
    setCreator(res.data.posts.username)
    setCost(res.data.posts.cost)
   
    setPostImageUrl(`https://ipfs.infura.io/ipfs/${res.data.posts.postImageHash}`);
    
  })
  .then(()=>{
    setLoading(false)
  })
  .catch((err)=>{
    console.log(err)
  })
  }

  console.log(postId.id)
  getPostDetails()
  },[postId])
  
  return (
    <div>
      <Container className={classes.root}>
        <CssBaseline />
        {!loading && !contractLoading ? (
          <Grid container>
            <Grid items>
              <img style={{ maxWidth: "100%" }} src={postImageUrl} alt="" />

              <Typography
                style={{
                  textAlign: "center",
                  textTransform: "uppercase",
                  color: "white",
                  fontWeight: "800",
                }}
                variant="h4"
              >
                {post.postDescription}
              </Typography>
              <Typography
                style={{
                  textAlign: "center",
                  textTransform: "uppercase",
                  color: "#0085f1",
                  padding: "10px",
                  fontWeight: "800",
                }}
                variant="h4"
              >
                {post.postTitle}
              </Typography>
              <Typography
                style={{
                  textAlign: "center",
                  textTransform: "uppercase",
                  color: "white",
                  padding: "10px",
                  fontWeight: "800",
                }}
                variant="h4"
              >
                {post.cost} ETH
              </Typography>
            </Grid>
            <Grid items style={{ display: "flex", justifyContent: "center" }}>
              <Button
                onClick={buyPost}
                style={{
                  backgroundColor: "#0085f1",
                  color: "white",
                  width: "90vw",
                  margin: "auto",
                  marginTop: "20px",
                }}
              >
                BUY NOW
              </Button>
            </Grid>
          </Grid>
        ) : null}

        <Grid>
          <Typography
            variant="h6"
            color="secondary"
            style={{ textAlign: "center", padding: "20px" }}
          >
            On every ETH you earn the marketplace charges you 0.1 ETH.
          </Typography>
        </Grid>
      </Container>
    </div>
  );
};

export default SinglePost;
