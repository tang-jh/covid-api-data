import * as React from "react";
import {Container, List, ListItem, ListItemButton,ListItemText, Box} from "@mui/material";
// import ListItemIcon from "@mui/material/ListItemIcon";

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
