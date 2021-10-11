import React from "react";
import {
  Box,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  ThemeProvider,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router";
import Navbar from "./Navbar";

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
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
    margin: "1rem"
  },
}));

const Layout = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const getList = (obj) => {
    const arr = [];
    for (const k in obj) {
      arr.push({
        country: k,
        isoA2: obj?.[k]?.All?.abbreviation,
        isoN3: obj?.[k]?.All?.iso,
      });
    }
    return arr;
  };
  const listItems = getList(props.appdata).map((item) => {
    return (
      <ListItem
        key={item.isoA2}
        disablePadding
        onClick={() => history.push(`/country/${item.isoA2}`)}
      >
        <ListItemButton>
          <ListItemText primary={item.country} />
        </ListItemButton>
      </ListItem>
    );
  });

  console.log(getList(props.appdata));

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
            <div>
              <Typography variant="h5"> List of Countries</Typography>
            </div>
            <List>{listItems}</List>
          </Drawer>
          <div className={classes.content}>{props.children}</div>
        </div>
      </Box>
    </>
  );
};

export default Layout;
