import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_STORES } from './stores.query'
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const Home = () => {
  const result = useQuery(GET_STORES)

  if (result.loading)  {
    return <div>loading...</div>
  }

  return (
    <div className="list-group container">
    	
    	<h4>Management Center</h4>
      <List component="nav">
        <ListItem button className="border" component={Link} to={'/globals/products'}>
          <ListItemText primary="Globals" />
        </ListItem>
        <ListItem button className="border" component={Link} to={'/invoices'}>
          <ListItemText primary="Invoices" />
        </ListItem>		        
      </List>
		    	
    	<h4>Stores</h4>
      <List component="nav">
	      {result.data.stores.map(store => 
	        <ListItem key={store.id} button className="border" component={Link} to={`store/${store.id}`}>
	          <ListItemText primary={store.name} />
	        </ListItem>
	      )}	
      </List>

    	<h4>Prepcenters</h4>


    	<Button variant="contained" color="primary">
      	Add Store
    	</Button>      
    </div>
  )
}

export default Home






