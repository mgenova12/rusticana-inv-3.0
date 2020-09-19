import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import Badge from '@material-ui/core/Badge';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import Home from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import LocalDining from '@material-ui/icons/LocalDining';
import LocationCity from '@material-ui/icons/LocationCity';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import Print from '@material-ui/icons/Print';
import NoteAdd from '@material-ui/icons/NoteAdd';
import ChromeReaderMode from '@material-ui/icons/ChromeReaderMode';
import EventNote from '@material-ui/icons/EventNote';
import Description from '@material-ui/icons/Description';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },	
  list: {
    width: '250',
  },
}));

export const Navbar = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    open: false,
  });

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, 'open': open });
  };

	const drawerList =(
		<div 
		className={classes.list}
		role="presentation"
		>
	    <List onClick={toggleDrawer(false)}>
	        <ListItem>
	          <ListItemText primary={'Rusticana'} />
	        </ListItem>

	        <ListItem component={Link} to={`/`} key={'Home'}>
	          <ListItemIcon><Home/></ListItemIcon>
	          <ListItemText primary={'Home'} />
	        </ListItem> 

          <ListItem key={'Store Orders'}>
            <ListItemIcon><ChromeReaderMode/></ListItemIcon>
            <ListItemText primary={'Store Orders'} />
          </ListItem>  

          <ListItem ket={'Inventory'}>
            <ListItemIcon><Description/></ListItemIcon>
            <ListItemText primary={'Start Inventory'} />
          </ListItem> 

          <ListItem  key={'Orders'}>
            <ListItemIcon><EventNote/></ListItemIcon>
            <ListItemText primary={'Submitted Inventory'} />
          </ListItem>                          

          <ListItem key={'Print Labels'}>
            <ListItemIcon><Print/></ListItemIcon>
            <ListItemText primary={'Print Labels'} />
          </ListItem> 

          <ListItem key={'Store Goods'}>
            <ListItemIcon><LocalDining/></ListItemIcon>
            <ListItemText primary={'Store Goods'} />
          </ListItem>

          <ListItem key={'Adjust Inventory'}>
            <ListItemIcon><NoteAdd/></ListItemIcon>
            <ListItemText primary={'Adjust Inventory'} />
          </ListItem>  

          <ListItem key={'Add Store Goods'}>
            <ListItemIcon><AddShoppingCart/></ListItemIcon>
            <ListItemText primary={'Add Store Goods'} />
          </ListItem>

          <ListItem key={'Locations'}>
            <ListItemIcon><LocationCity/></ListItemIcon>
            <ListItemText primary={'Locations'} />
          </ListItem>

	    </List>
    </div>
	)

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton 
          	onClick={toggleDrawer(!state['open'])} 
          	edge="start" 
          	className={classes.menuButton} 
          	color="inherit" 
          	aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Rusticana
          </Typography>
           <IconButton color="inherit">
              <Badge badgeContent={0} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>          
          <Button color="inherit">Login</Button>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
      
      <Drawer 
          open={state['open']}
          onClose={toggleDrawer(false)}
          variant="temporary"
          keepMounted={true}
          anchor="left"
      >
        {drawerList}
      </Drawer>


    </div>
  );
}