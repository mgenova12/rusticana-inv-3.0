import React, {useState, useCallback} from 'react';
import { useQuery } from '@apollo/client';
import MaterialTable from 'material-table';
import DistributorsDrawer from './_DistributorsDrawer.js'
import { GET_DISTRIBUTORS } from './distributor.query'

const Distributors = () => {
  const {data: distributorsQuery, loading: distributorsQueryLoading, refetch: distributorsRefetch} = useQuery(GET_DISTRIBUTORS)

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
          actions={[
            {
              icon: "add_box",
              tooltip: "add distributor",
              position: "toolbar",
              onClick: () => {onOpen()}
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






