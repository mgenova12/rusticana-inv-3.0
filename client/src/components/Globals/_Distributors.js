import React, {useState, useCallback} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import MaterialTable from 'material-table';
import DistributorsDrawer from './_DistributorsDrawer.js'
import { GET_DISTRIBUTORS } from './globals.query'
import { DELETE_DISTRIBUTOR } from './globals.mutation'

const Distributors = () => {
  const {data: distributorsQuery, loading: distributorsQueryLoading, refetch: distributorsRefetch} = useQuery(GET_DISTRIBUTORS)

  const handleRowDelete = (oldData) => {
    deleteDistributor({ 
      variables: { 
        id: parseInt(oldData.id)
      } 
    }).then(() => distributorsRefetch())
  }  
  
  const [deleteDistributor] = useMutation(DELETE_DISTRIBUTOR);

  const [visible, setVisible] = useState(false);
  const onOpen = useCallback(() => setVisible(true), []);
  const onClose = useCallback(() => setVisible(false), []);
  
  if (distributorsQueryLoading) return 'Loading...'

  return (
    <div>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />         
        <MaterialTable
          title="Distributors"
          options={{
            paging: false,
            actionsColumnIndex: -1
          }} 
          editable={{
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  handleRowDelete(oldData)
              }, 100);
            }), 
          }}           
          actions={[
            {
              icon: "add_box",
              tooltip: "add distributor",
              position: "toolbar",
              onClick: () => {onOpen()},
            }
          ]}          
          columns={[
            { title: 'ID', field: 'id', editable: 'never' },
            { title: 'Name', field: 'name' },
          ]}
          data={JSON.parse(JSON.stringify(distributorsQuery.distributors))}           
        />      	
        <DistributorsDrawer
          visible={visible} 
          onClose={onClose}
          distributorsRefetch={distributorsRefetch}
        />          
    </div>
  )
}

export default Distributors
