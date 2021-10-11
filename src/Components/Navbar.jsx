import * as React from "react";
import {AppBar, Box, Toolbar, Typography, Button} from "@mui/material";
import { Link } from "react-router-dom";


export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml:30 }}>
            COVID 19 API
          </Typography>
          <Button component={Link} to="/" color="inherit" >Home</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
