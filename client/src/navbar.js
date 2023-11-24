import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { deleteToken } from './token'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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
import LocalShipping from '@material-ui/icons/LocalShipping';
import LocalPizza from '@material-ui/icons/LocalPizza';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Restaurant from '@material-ui/icons/Restaurant';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';

export const Navbar = ({...props}, currentUser) => {
  let path = props.match.path.split('/')

  const getName = () => {
    let path = props.match.path.split('/')[1]
    let id = props.match.params.storeId
    if (path === 'prepcenter'){
      return 'Trappe'
    } else if(path === 'store' && id === '1'){
      return 'Dover Road'
    } else if(path === 'store' && id === '2'){
      return 'Bypass'
    } else if(path === 'store' && id === '3'){
      return 'Cambridge'
    } else {
      return 'Rusticana'
    }
  };

  const history = useHistory();
  const [state, setState] = useState({open: false});

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, 'open': open });
  };

  const drawerList =(
		<div 
		role="presentation"
		>
	    <List onClick={toggleDrawer(false)}>
	        <ListItem> 
            <img src="/newcroplogo.png" alt="logo" width={45} height={45}/>
	          <div className="h4" style={{fontFamily: 'cursive'}}> Rusticana </div>
	        </ListItem>
          <hr/>
	        <ListItem component={Link} to={`/`} key={'Home'}>
	          <ListItemIcon><Home/></ListItemIcon>
	          <ListItemText primary={'Home'} />
	        </ListItem> 

          { path[1] === 'globals' &&
            <React.Fragment>
              <ListItem component={Link} to={`/globals/products`} key={'Products'}>
                <ListItemIcon><Restaurant/></ListItemIcon>
                <ListItemText primary={'Products'} />
              </ListItem>           

              <ListItem component={Link} to={`/globals/prepped_products`} key={'Prepped Products'}>
                <ListItemIcon><LocalPizza/></ListItemIcon>
                <ListItemText primary={'Prepped Products'} />
              </ListItem> 

              <ListItem component={Link} to={`/globals/distributors`} key={'Distrubtors'}>
                <ListItemIcon><LocalShipping/></ListItemIcon>
                <ListItemText primary={'Distrubtors'} />
              </ListItem> 
            </React.Fragment>
          }

          { path[1] === 'prepcenter' &&
          <React.Fragment>
            <ListItem key={'Store Orders'} component={Link} to={`/prepcenter/${props.match.params.prepcenterId}/store_orders`}>
              <ListItemIcon><ChromeReaderMode/></ListItemIcon>
              <ListItemText primary={'Store Orders'} />
            </ListItem>

            <ListItem key={'Start Inventory'} component={Link} to={`/prepcenter/${props.match.params.prepcenterId}/start_inventory`}>
              <ListItemIcon><Description/></ListItemIcon>
              <ListItemText primary={'Start Inventory'} />
            </ListItem> 

            <ListItem key={'Submitted Inventory'} component={Link} to={`/prepcenter/${props.match.params.prepcenterId}/orders`}>
              <ListItemIcon><EventNote/></ListItemIcon>
              <ListItemText primary={'Submitted Inventory'} />
            </ListItem> 

            <ListItem key={'Print Labels'} component={Link} to={`/prepcenter/${props.match.params.prepcenterId}/print_labels`}>
              <ListItemIcon><Print/></ListItemIcon>
              <ListItemText primary={'Print Labels'} />
            </ListItem> 

            <ListItem key={'Store Goods'} component={Link} to={`/prepcenter/${props.match.params.prepcenterId}/store_goods`}>
              <ListItemIcon><LocalDining/></ListItemIcon>
              <ListItemText primary={'Store Goods'} />
            </ListItem> 

            <ListItem key={'Add Store Goods'} component={Link} to={`/prepcenter/${props.match.params.prepcenterId}/add_store_goods`}>
              <ListItemIcon><AddShoppingCart/></ListItemIcon>
              <ListItemText primary={'Add Store Goods'} />
            </ListItem>

            <ListItem key={'Locations'} component={Link} to={`/prepcenter/${props.match.params.prepcenterId}/locations`}>
              <ListItemIcon><LocationCity/></ListItemIcon>
              <ListItemText primary={'Locations'} />
            </ListItem>

            <ListItem key={'Quick Order'} component={Link} to={`/prepcenter/${props.match.params.prepcenterId}/start_quick_order`}>
              <ListItemIcon><AccessAlarmIcon/></ListItemIcon>
              <ListItemText primary={'Quick Order'} />
            </ListItem>
          </React.Fragment>
          } 

          { path[1] === 'store' && 
          <React.Fragment>
            <ListItem key={'Start Inventory'} component={Link} to={`/store/${props.match.params.storeId}/start_inventory`}>
              <ListItemIcon><Description/></ListItemIcon>
              <ListItemText primary={'Start Inventory'} />
            </ListItem> 

            <ListItem  key={'Orders'} component={Link} to={`/store/${props.match.params.storeId}/orders`}>
              <ListItemIcon><EventNote/></ListItemIcon>
              <ListItemText primary={'Submitted Inventory'} />
            </ListItem> 

            <ListItem key={'Store Goods'} component={Link} to={`/store/${props.match.params.storeId}/store_goods`}>
              <ListItemIcon><LocalDining/></ListItemIcon>
              <ListItemText primary={'Store Goods'} />
            </ListItem>

            <ListItem key={'Adjust Inventory'}>
              <ListItemIcon><NoteAdd/></ListItemIcon>
              <ListItemText primary={'Adjust Inventory'} />
            </ListItem>  

            <ListItem key={'Add Store Goods'} component={Link} to={`/store/${props.match.params.storeId}/add_store_goods`}>
              <ListItemIcon><AddShoppingCart/></ListItemIcon>
              <ListItemText primary={'Add Store Goods'} />
            </ListItem>

            <ListItem key={'Locations'} component={Link} to={`/store/${props.match.params.storeId}/locations`}>
              <ListItemIcon><LocationCity/></ListItemIcon>
              <ListItemText primary={'Locations'} />
            </ListItem>

            <ListItem key={'Activate Gift Card'} component={Link} to={`/store/${props.match.params.storeId}/activate_gift_cards`}>
              <ListItemIcon><NoteAdd/></ListItemIcon>
              <ListItemText primary={'Activate Gift Card'} />              
            </ListItem>  

            <ListItem key={'Swipe Gift Card'} component={Link} to={`/store/${props.match.params.storeId}/swipe_gift_cards`}>
              <ListItemIcon><NoteAdd/></ListItemIcon>
              <ListItemText primary={'Swipe Gift Card'} />              
            </ListItem>  

            <ListItem key={'Gift Card Logs'} component={Link} to={`/store/${props.match.params.storeId}/gift_card_logs`}>
              <ListItemIcon><NoteAdd/></ListItemIcon>
              <ListItemText primary={'Gift Card Logs'} />              
            </ListItem>  
          </React.Fragment>
        }
	    </List>
    </div>
	)

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };  

  return (
    <div >
      <AppBar position="static">
        <Toolbar >

          { path !== '' &&
            <IconButton 
            	onClick={toggleDrawer(!state['open'])} 
            	edge="start" 
            	color="inherit" 
            	aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
          }

          <Typography variant="h6" style={{flexGrow: 1}}>
            {getName()}
          </Typography>
           
          <Typography variant="h6" color="inherit" edge="end" >
            {props.currentUser.firstName}
          </Typography>
          
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem >Profile</MenuItem>
                <MenuItem 
                  onClick={() => {
                    deleteToken()
                    history.push('/login')
                  }}>
                  Log Out
                </MenuItem>

              </Menu>
            </div>

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
