import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_STORES } from './home.query'
import { GET_PREPCENTERS } from './home.query'
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import BeatLoader from "react-spinners/BeatLoader"

const Home = () => {
  const {data: storesQuery, loading: storesQueryLoading } = useQuery(GET_STORES)
  const {data: prepcentersQuery, loading: prepcentersQueryLoading } = useQuery(GET_PREPCENTERS)

  if (storesQueryLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>
  if (prepcentersQueryLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>

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
        <ListItem button className="border" component={Link} to={'/users'}>
          <ListItemText primary="Accounts" />
        </ListItem>
        <ListItem button className="border" component={Link} to={'/gift_card_invoices'}>
          <ListItemText primary="Gift Cards" />
        </ListItem>
        <ListItem button className="border" component={Link} to={'/customers'}>
          <ListItemText primary="Customers" />
        </ListItem>
      </List>

    	<h4>Stores</h4>
      <List component="nav">
	      {storesQuery.stores.map(store =>
	        <ListItem key={store.id} button className="border" component={Link} to={`store/${store.id}/orders`}>
	          <ListItemText primary={store.name} />
	        </ListItem>
	      )}
      </List>

    	<h4>Prepcenters</h4>
      <List component="nav">
        {prepcentersQuery.prepcenters.map(prepcenter => 
          <ListItem key={prepcenter.id} button className="border" component={Link} to={`prepcenter/${prepcenter.id}/store_orders`}>
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

