import React, { useState, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import BeatLoader from "react-spinners/BeatLoader"
import NewCustomerDrawer from './_NewCustomerDrawer.js'
import { GET_CUSTOMERS} from './customers.query'

const Customers = ({...props}) => {
  const [visibleNewCustomerDrawer, setVisibleNewCustomerDrawer] = useState(false);
  const openNewCustomerDrawer = useCallback(() => setVisibleNewCustomerDrawer(true), []);
  const closeNewCustomerDrawer = useCallback(() => setVisibleNewCustomerDrawer(false), []);

  const {data: customersQuery, loading: customersQueryLoading, refetch: customersRetch} = useQuery(GET_CUSTOMERS, {
    fetchPolicy: "network-only"
  })

  if (customersQueryLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>

  return (
    <div>
    <Container component="main" maxWidth="md">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <h1>Customers</h1>
         <Button
            type='submit'
            variant="contained"
            color="primary"
            size="medium"
            className="button m-2"
            onClick={() => openNewCustomerDrawer()}
            >
            Add Customer
         </Button>
      </div>
    </Container>
    <br/>
      <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Total Gift Cards</th>
                <th>Date Added</th>
              </tr>
            </thead>
            <tbody>
            {customersQuery.customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.firstName}</td>
                  <td>{customer.lastName}</td>
                  <td>{customer.phoneNumber}</td>
                  <td>{customer.email}</td>
                  <td>{customer.giftCardCount}</td>
                  <td>{new Date(customer.createdAt.replace(/-/g, '/')).toLocaleDateString([], {timeZone:'America/New_York', hour: '2-digit', minute:'2-digit'})}</td>
                </tr> 
            ))}

            </tbody>
          </table> 
      </div>
        <NewCustomerDrawer
          visible={visibleNewCustomerDrawer}
          onClose={closeNewCustomerDrawer}
          customersRetch={customersRetch}
        />
    </div>
  )
}

export default Customers
