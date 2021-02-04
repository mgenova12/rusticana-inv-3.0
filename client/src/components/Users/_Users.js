import React from 'react';
import { useQuery } from '@apollo/client';
import MaterialTable from 'material-table';
import { GET_USERS } from './users.query'
import BeatLoader from "react-spinners/BeatLoader"

const Users = ({...props}) => {
  const {data: usersQuery, loading: usersQueryLoading} = useQuery(GET_USERS)

  if (usersQueryLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>

  return (
    <div>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <MaterialTable
          title="Users"
          options={{
            paging: false,
            actionsColumnIndex: -1,
          }}          
          columns={[
            { title: 'ID', field: 'id', editable: 'never' },
            { title: 'First Name', field: 'firstName' },
            { title: 'Last Name', field: 'lastName' },
            { title: 'Email', field: 'email' },
          ]}
          data={JSON.parse(JSON.stringify(usersQuery.users))}           
        />      	
          
    </div>
  )
}

export default Users
