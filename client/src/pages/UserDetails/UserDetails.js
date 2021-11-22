import { Button, Container } from "@mui/material";
import React,{useEffect,useState} from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useParams } from "react-router";
import axios from "axios"
import useBasicFetch from "../../hooks/useBasicFetch";
import { styles } from "./UserDetailsStyle";


const UserDetails = () => {
 
  const username=useParams("username")
  const [web3, account, contract, contractLoading] = useBasicFetch();
  const [userBalance,setUserBalance]=useState("")
  const [user,setUser]=useState("")

  useEffect(()=>{


    console.log(username.username)

    const getUserDetails=async()=>{
      await axios.get(`/users/${username.username}`, {
        params: {
          token:localStorage.getItem("token")
        },
      })
      .then(async(res)=>{
        console.log(res)
        setUser(res.data)

       
      

      })
      .catch((err)=>{
        console.log(err)
      })
    }
  },[])
 

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
        <Button onClick={redeemBalance}style={{ background: "#0085f1",color:"white"}}>REDEEM BALANCE</Button>
      </Container>
    </>
  );
};

export default UserDetails;
