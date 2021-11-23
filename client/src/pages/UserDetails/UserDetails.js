import { Button, Container, Typography } from "@mui/material";
import React,{useEffect,useState} from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useParams } from "react-router";
import axios from "axios"
import useBasicFetch from "../../hooks/useBasicFetch";
import { styles } from "./UserDetailsStyle";
import Avatar from "@mui/material/Avatar";

const UserDetails = () => {
 
  const username=useParams("username")
  const [web3, account, contract,contractLoading] = useBasicFetch();
  const [userBalance,setUserBalance]=useState("")
  const [user,setUser]=useState("")
  const [userUrl,setUserUrl]=useState("")
  const [loading,setLoading]=useState("")


  useEffect(()=>{


    console.log(username.username)

//function to get all the user details mainly from the backend and get the user balance from the solidity contract 


    const getUserDetails=async()=>{
      await axios.get(`/users/${username.username}`, {
        params: {
          token:localStorage.getItem("token")
        },
      })
      .then(async(res)=>{
        console.log(res)
        setUserUrl(`https://ipfs.infura.io/ipfs/${res.data.user.imageHash}`);
        setUser(res.data.user)
        setLoading(false)

        await contract.methods.returnUserBalance(username.username).call()
        .then((res)=>{
          console.log(res.data)
          setUserBalance(res.data)
        })
        .catch((err)=>{
          console.log(err)
        })
     
      })
      .catch((err)=>{
        console.log(err)
      })
    }

    getUserDetails()
  },[])
 


//function to redeem balance fires the solidity function to transfer the balance to the respective ganache account 



  const redeemBalance=async(e)=>{
    e.preventDefault()
    await contract.methods.redeemBalance(username.username).send({from:account})
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
  }



  const classes = styles();
  return (
    <>
      <Container className={classes.root}>
        <CssBaseline />
        <Box>
          <Grid container>
            <Grid item>
              {!loading ? (
                <>
                  <Avatar src={userUrl} alt=""></Avatar>
                  <Typography variant="h5" style={{ color: "white" }}>
                    {user.username}
                  </Typography>
                </>
              ) : null}
            </Grid>
            <Grid item>
              <Typography variant="h5" style={{ color: "white" }}>
                {userBalance} ETH
              </Typography>
            </Grid>
{/* 
            button on click fires redeemBalance function */}
            
            <Button
              onClick={redeemBalance}
              style={{
                background: "#0085f1",
                color: "white",
                margin: "auto",
              }}
            >
              REDEEM BALANCE
            </Button>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default UserDetails;
