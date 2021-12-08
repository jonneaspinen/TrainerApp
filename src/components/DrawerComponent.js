import React, { useState } from 'react';
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from '@mui/icons-material/Menu';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { ListItemIcon } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';

function DrawerComponent() {

  const navigate = useNavigate();

  const [state, setState] = useState({});

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const itemList = [
    {
      text: 'Home',
      icon: <HomeIcon />,
      path: '/'
    },
    {
      text: 'Customers',
      icon: <PeopleAltIcon />,
      path: '/customers'
    },
    {
      text: 'Trainings',
      icon: <FitnessCenterIcon />,
      path: '/trainings'
    },
    {
      text: 'Calendar',
      icon: <EventNoteIcon />,
      path: '/calendar'
    }
  ];

  const list = (anchor) => (
    <List>
      {itemList.map((item) => {
        const { text, icon, path } = item;
        return (
          <ListItem button key={text} onClick={() => {
            setState(false);
            navigate(path);
          }}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        );
      })}
    </List>
  );

  return (
    <div>
      {["menu"].map((anchor) => (
        <React.Fragment key={anchor}>

          <Button
            onClick={toggleDrawer(anchor, true)}>
            <MenuIcon style={{ color: 'white' }} />
          </Button>

          <Drawer
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>

        </React.Fragment>
      ))}
    </div>
  );
}
export default DrawerComponent;