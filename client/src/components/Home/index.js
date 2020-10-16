import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_STORES } from './stores.query'
import { GET_PREPCENTERS } from './prepcenters.query'
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const Home = () => {
  const {data: storesQuery, loading: storesQueryLoading } = useQuery(GET_STORES)
  const {data: prepcentersQuery, loading: prepcentersQueryLoading } = useQuery(GET_PREPCENTERS)

  if (storesQueryLoading) return 'Loading...'
  if (prepcentersQueryLoading) return 'Loading...'

  return (
    <div className="container">
    	
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
	      {storesQuery.stores.map(store => 
	        <ListItem key={store.id} button className="border" component={Link} to={`store/${store.id}`}>
	          <ListItemText primary={store.name} />
	        </ListItem>
	      )}	
      </List>

    	<h4>Prepcenters</h4>
      <List component="nav">
        {prepcentersQuery.prepcenters.map(prepcenter => 
          <ListItem key={prepcenter.id} button className="border" component={Link} to={`prepcenter/${prepcenter.id}`}>
            <ListItemText primary={prepcenter.name} />
          </ListItem>
        )}  
      </List>

    	<Button variant="contained" color="primary">
      	Add Store
    	</Button>      
    </div>
  )
}

export default Home






