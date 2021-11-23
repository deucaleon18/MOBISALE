import React,{useEffect} from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import {styles} from "./NavbarStyle"



const Navbar=()=>{
 

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  // const handleChange = (event) => {
  //   setAuth(event.target.checked);
  // };
 
  
 
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const userUrl = `accounts/${localStorage.getItem("username")}`;

  const handleLogout=()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("username")
    localStorage.removeItem("email")
    localStorage.removeItem("paymentAccount")
    window.location.href="/"
  }

const classes = styles();
  return (
    <Box sx={{ flexGrow: 1, width: "100vw" }}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            onClick={handleMenu}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              style={{ fontFamily: "Bebas Neue,cursive", fontSpacing: "1px" }}
              variant="h5"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Mobisale
            </Typography>
          </div>

          <div>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <a style={{ textDecoration: "none" }} href="/">
                <MenuItem
                  style={{ background: "#0085f1", color: "white" }}
                  onClick={handleClose}
                >
                  Home
                </MenuItem>
              </a>
              {localStorage.getItem("token") != undefined ? (
                <>
                  <a style={{ textDecoration: "none" }} href="/app">
                    <MenuItem
                      style={{ background: "#0085f1", color: "white" }}
                      onClick={handleClose}
                    >
                      Market
                    </MenuItem>
                  </a>

                  <a style={{ textDecoration: "none" }} href="/new">
                    <MenuItem
                      style={{ background: "#0085f1", color: "white" }}
                      onClick={handleClose}
                    >
                      New
                    </MenuItem>
                  </a>
                  <a style={{ textDecoration: "none" }} href={userUrl}>
                    <MenuItem
                      style={{ background: "#0085f1", color: "white" }}
                      onClick={handleClose}
                    >
                      My account
                    </MenuItem>
                  </a>
                </>
              ) : null}

              {localStorage.getItem("token") == undefined ? (
                <>
                  <a style={{ textDecoration: "none" }} href="/register">
                    <MenuItem
                      style={{ background: "#0085f1", color: "white" }}
                      onClick={handleClose}
                    >
                      Register
                    </MenuItem>
                  </a>

                  <a style={{ textDecoration: "none" }} href="/login">
                    <MenuItem
                      style={{ background: "#0085f1", color: "white" }}
                      onClick={handleClose}
                    >
                      Login
                    </MenuItem>
                  </a>
                </>
              ) : null}

              {localStorage.getItem("token") != undefined ? (
                <MenuItem
                  style={{ background: "#0085f1", color: "white" }}
                  onClick={handleLogout}
                >
                  Logout
                </MenuItem>
              ) : null}
            </Menu>
          </div>

          <Container sx={{ position: "absolute", right: "0" }}>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                color: "#0085f1",
                fontWeight: "800",
              }}
            >
              <a
                className={classes.mainNav}
                style={{ textDecoration: "none", color: "#0085f1" }}
                href="/"
              >
                <div style={{ padding: "10px" }}>HOME</div>
              </a>

              {localStorage.getItem("token") != undefined ? (
                <>
                  <a
                    className={classes.mainNav}
                    style={{ textDecoration: "none", color: "#0085f1" }}
                    href="/new"
                  >
                    <div style={{ padding: "10px" }}>NEW</div>
                  </a>
                  <a
                    className={classes.mainNav}
                    style={{ textDecoration: "none", color: "#0085f1" }}
                    href="/app"
                  >
                    <div style={{ padding: "10px" }}>MARKET</div>
                  </a>
                  <a
                    className={classes.mainNav}
                    style={{ textDecoration: "none", color: "#0085f1" }}
                    href={userUrl}
                  >
                    <div style={{ padding: "10px" }}>USER</div>
                  </a>
                </>
              ) : null}
              {localStorage.getItem("token") == undefined ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <a
                    className={classes.mainNav}
                    style={{
                      padding: "10px",
                      textDecoration: "none",
                      color: "#0085f1",
                    }}
                    href="/register"
                  >
                    REGISTER
                  </a>
                  <a
                    className={classes.mainNav}
                    style={{
                      padding: "10px",
                      textDecoration: "none",
                      color: "#0085f1",
                    }}
                    href="/login"
                  >
                    LOGIN
                  </a>
                </div>
              ) : null}

              {localStorage.getItem("token") != undefined ? (
                //   <a
                //   onClick={handleLogout}
                //   style={{ textDecoration: "none", color: "#0085f1" }}
                //   href="/"
                // >

                <div
                  className={classes.mainNav}
                  style={{ cursor: "pointer" }}
                  onClick={handleLogout}
                  style={{ padding: "10px" }}
                >
                  LOGOUT
                </div>
              ) : null}
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar