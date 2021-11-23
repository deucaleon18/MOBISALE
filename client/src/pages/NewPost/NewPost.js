import { Button, Container } from '@mui/material'
import React,{useState,useEffect} from 'react'

import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { styles } from "./NewPostStyle";
import IconButton from "@mui/material/IconButton";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { create } from "ipfs-http-client";
import axios from "axios";


const client = create("https://ipfs.infura.io:5001/api/v0");

const NewPost = () => {
     
    


   const submitPost = async (event) => {
     event.preventDefault();
     await client
       .add(buffer)
       .then(async (res) => {
         console.log(res.path);
         // eslint-disable-next-line no-console
         await axios
           .post("http://localhost:5000/posts/create/", {
             username: localStorage.getItem("username"),
             postTitle: title,
             postDescription: description,
             postImageHash: res.path,
             paymentAccount: localStorage.getItem("paymentAccount"),
             cost: cost,
           }
           ,{params: {
          token:localStorage.getItem("token"),
         }})

           .then((res) => {
             console.log(res);
           })
           .then(() => {
             window.location.href = "/app";
           })
           .catch((err) => {
             console.log(err);
           });
       })

       .catch((err) => {
         console.log(err);
       });
   };








    const [postImage,setPostImage]=useState(undefined)
    const [postImageUrl,setPostImageUrl]=useState(undefined)
    const [buffer,setBuffer]=useState(undefined)
    const [title,setTitle]=useState("")
    const [description,setDescription]=useState("")
    const [features,setFeatures]=useState("")
    const [cost,setCost]=useState("")





  useEffect(() => {
    console.log(postImageUrl);
  }, [postImageUrl]);






      const classes=styles()
      const Input = styled("input")({
        display: "none",
      });






    return (
      <div>
        <Container className={classes.root}>
          <CssBaseline />
          <Box sx={{ flexGrow: 1 }}>
            <Grid container>
              <Grid
                container
                items
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <div
                  style={{
                    height: "350px",
                    backgroundColor: "#252953",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {/* {console.log(postImageUrl)}
                  {typeof postImage === undefined ? ( */}
                  <img
                    src={postImageUrl}
                    style={{ maxWidth: "100%" }}
                    alt=""
                  ></img>
                  {/* ) : ( */}
                  {/* <IconButton color="secondary">
                      <AddAPhotoIcon size="large"></AddAPhotoIcon>
                    </IconButton>
                  )} */}
                </div>

                <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={(e) => {
                      e.preventDefault();
                      const reader = new window.FileReader();
                      reader.readAsArrayBuffer(e.target.files[0]);
                      reader.onloadend = () => {
                        setBuffer(Buffer(reader.result));
                        console.log(Buffer(reader.result));
                      };
                      setPostImage(e.target.files[0]);
                      setPostImageUrl(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                  <Button
                    variant="contained"
                    color="secondary"
                    component="span"
                    sx={{ width: "100%" }}
                  >
                    Upload Image
                  </Button>
                </label>
              </Grid>

              <Grid container items sx={{ padding: "10px" }}>
                <TextField
                  inputProps={{ style: { color: "#fff" } }}
                  name="title"
                  required
                  fullWidth
                  id="Title"
                  label="Title"
                  color="secondary"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  autoFocus
                />
              </Grid>
              <Grid container items sx={{ padding: "10px" }}>
                <TextField
                  inputProps={{ style: { color: "#fff" } }}
                  name="description"
                  required
                  fullWidth
                  id="Description"
                  label="Description"
                  color="secondary"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  autoFocus
                />
              </Grid>
              <Grid container items sx={{ padding: "10px" }}>
                <TextField
                  inputProps={{ style: { color: "#fff" } }}
                  name="features"
                  required
                  fullWidth
                  id="Features"
                  label="Features"
                  color="secondary"
                  value={features}
                  onChange={(e) => {
                    setFeatures(e.target.value);
                  }}
                  autoFocus
                />
              </Grid>

              <Grid container items sx={{ padding: "10px" }}>
                <TextField
                  inputProps={{ style: { color: "#fff" } }}
                  type="Number"
                  name="cost"
                  required
                  fullWidth
                  id="Cost"
                  label="Cost"
                  color="secondary"
                  value={cost}
                  onChange={(e) => {
                    setCost(e.target.value);
                  }}
                  autoFocus
                />
              </Grid>
              <Grid
                container
                items
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  style={{ backgroundColor: "#0085f1", color: "white" }}
                  onClick={submitPost}
                >
                  SUBMIT POST
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
    );
}

export default NewPost
