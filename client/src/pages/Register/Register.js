import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PersonIcon from "@mui/icons-material/Person";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { create } from "ipfs-http-client";
import { makeStyles } from "@mui/styles";
import useBasicFetch from "../../hooks/useBasicFetch";


const client = create("https://ipfs.infura.io:5001/api/v0");


const Register = () => {
 const [web3,account,contract] = useBasicFetch();

  const [image, setImage] = useState(undefined);
  const [imageUrl, setImageUrl] = useState(undefined);
  const [buffer, setBuffer] = useState(undefined);
  const [username,setUsername]=useState("")
  const [email, setEmail] = useState("");
  const [password,setPassword]=useState("")
  const [paymentAccount,setPaymentAccount]=useState("")

  
  const styles = makeStyles((theme) => ({
    multilineColor: {
      color: "#fff",
    },
  }))



  const Input = styled("input")({
    display: "none",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await client
      .add(buffer)
      .then(async (res) => {
        console.log(res.path)
   
            await contract.methods
              .createUser(email, username, paymentAccount)
              .send({ from: account })
              .then(async(res) => {
                console.log(res);
                // eslint-disable-next-line no-console
                await axios
                  .post("http://localhost:5000/register/", {
                    username,
                    email,
                    password,
                    paymentAccount,
                    imageHash: res.path,
                  })
                  .then((res) => {
                    console.log(res);
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("username", res.data.user.username);
                    localStorage.setItem("email", res.data.user.email);
                    localStorage.setItem(
                      "paymentAccount",
                      res.data.user.paymentAccount
                    );
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
            })
            .catch((err)=>{
              console.log(err)

            })
            
     
  };
   const classes = styles();
  return (
    <Container
      sx={{ marginTop: 16, borderRadius: 5 }}
      component="main"
      maxWidth="xs"
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" color="white">
          Sign up
        </Typography>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            alt={<PersonIcon />}
            src={imageUrl}
            sx={{ m: 1, bgcolor: "secondary.main" }}
          ></Avatar>

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
                setImage(e.target.files[0]);
                setImageUrl(URL.createObjectURL(e.target.files[0]));
              }}
            />
            <Button variant="contained" color="secondary" component="span">
              Upload Image
            </Button>
          </label>



        </Stack>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2} color="white">
            <Grid item xs={12}>
              <TextField
             
                InputProps={{
                  classes: {
                    input: classes.multilineColor,
                  },
                }}
                name="username"
                required
                fullWidth
                id="Username"
                label="Username"
                color="secondary"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                InputProps={{
                  classes: {
                    input: classes.multilineColor,
                  },
                }}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                color="secondary"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                InputProps={{
                  classes: {
                    input: classes.multilineColor,
                  },
                }}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                color="secondary"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                InputProps={{
                  classes: {
                    input: classes.multilineColor,
                  },
                }}
                required
                fullWidth
                name="paymentAccount"
                label="Payment Account"
                autoFocus
                color="secondary"
                id="paymentAccount"
                value={paymentAccount}
                onChange={(e) => {
                  setPaymentAccount(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox value="allowExtraEmails" color="secondary" />
                }
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            color="secondary"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
