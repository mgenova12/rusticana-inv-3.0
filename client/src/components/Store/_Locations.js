import React, {useState, useCallback} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import MaterialTable from 'material-table';
import NewLocationDrawer from './_NewLocationDrawer.js'
import { GET_LOCATIONS } from './store.query'
import { DELETE_LOCATION } from './store.mutation'

const Locations = ({...props}) => {
  const {data: locationsQuery, loading: locationsQueryLoading, refetch: locationsRefetch} = useQuery(GET_LOCATIONS, {
    variables: {
      storeId: parseInt(props.match.params.storeId)
    }
  })

  const handleRowDelete = (oldData) => {
    deleteLocation({ 
      variables: { 
        id: parseInt(oldData.id)
      } 
    }).then(() => locationsRefetch())
  }    

  const [deleteLocation] = useMutation(DELETE_LOCATION);

  const [visible, setVisible] = useState(false);
  const onOpen = useCallback(() => setVisible(true), []);
  const onClose = useCallback(() => setVisible(false), []);
  
  if (locationsQueryLoading) return 'Loading...'
  
  return (
    <div>
 
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <MaterialTable
          title="Locations"
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
              tooltip: "add location",
              position: "toolbar",
              onClick: () => {onOpen()}
            }
          ]}          
          columns={[
            { title: 'ID', field: 'id', editable: 'never' },
            { title: 'Name', field: 'name' },
          ]}
          data={JSON.parse(JSON.stringify(locationsQuery.locations))}           
        />      	
        <NewLocationDrawer
          visible={visible} 
          onClose={onClose}
          locationsRefetch={locationsRefetch}
          storeId={props.match.params.storeId}

        />            
    </div>
  )
}

export default Locations
