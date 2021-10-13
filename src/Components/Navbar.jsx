import React, {useState, useEffect} from "react";
import {AppBar, Box, Toolbar, Typography, Button, TextField} from "@mui/material";
import { Link } from "react-router-dom";


export default function Navbar(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <TextField
            id="searchbar"
            label="Filter country"
            variant="outlined"
            sx={{ background: "#EDEDFF", ml: 28 }}
            onChange={props.changeHandler}
          />
          <Typography
            align="center"
            variant="h5"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            COVID 19 API
          </Typography>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
