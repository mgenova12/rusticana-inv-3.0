import React, {useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';
import BeatLoader from "react-spinners/BeatLoader"
import { GET_CUSTOMERS} from './customers.query'

const Customers = ({...props}) => {

  const {data: customersQuery, loading: customersQueryLoading} = useQuery(GET_CUSTOMERS, {
    fetchPolicy: "network-only"
  })

  if (customersQueryLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>

  return (
    <div>
    <Container component="main" maxWidth="sm">
      <div>
        <h1>Customers</h1>
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
                </tr> 
            ))}

            </tbody>
          </table> 
      </div>
    </div>
  )
}

export default Customers
