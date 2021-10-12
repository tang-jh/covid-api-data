import React from "react";
import {
  Box,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useHistory, useLocation } from "react-router";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  content: {
    background: "#f9f9f9",
    width: "100%",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },

  drawerPaper: {
    width: drawerWidth,
  },
  root: {
    display: "flex",
    margin: "1rem",
  },
  active: {
    background:"#f3f3f3"
  }
}));

const Layout = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const getList = (obj) => {
    const arr = [];

    for (const k in obj) {
      if (obj[k].All.abbreviation) {
        arr.push({
          country: k,
          isoA2: obj[k].All.abbreviation,
          isoN3: obj[k].All.iso,
        });
      }
    }
    return arr;
  };

  const listItems = getList(props.appdata).map((item) => {
    return (
      <ListItem
        key={item.isoA2}
        disablePadding
        onClick={() => history.push(`/country/${item.isoA2}`)}
        className={location.pathname === `/country/${item.isoA2}` ? classes.active: null}
      >
        <ListItemButton component={Link} to={`/country/${item.isoA2}`}>
          <ListItemText primary={item.country} />
        </ListItemButton>
      </ListItem>
    );
  });

  return (
    <>
      <Navbar />
      <Box>
        <div className={classes.root}>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            anchor="left"
            classes={{ paper: classes.drawerPaper }}
          >
            <div style={{ margin: "1rem" }}>
              <Typography gutterBottom={true} align="center" variant="h5">
                List of Countries
              </Typography>
            </div>
            <Divider />
            <List>{listItems}</List>
          </Drawer>
          <div className={classes.content}>{props.children}</div>
        </div>
      </Box>
    </>
  );
};

export default Layout;
