import * as React from "react";
import {List, ListItem, ListItemButton,ListItemText} from "@mui/material";
import { makeStyles } from "@mui/styles";



const Sidebar = (props) => {

  return (
    // <Container maxWidth="sm">
    //   <Box>
        <List>
          {props.items.map((item) => (
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
    //   </Box>
    // </Container>
  );
};

export default Sidebar;
