import React, {useState, useCallback} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import MaterialTable from 'material-table';
import NewLocationDrawer from './_NewLocationDrawer.js'
import { GET_PREPCENTER_LOCATIONS } from './prepcenter.query'
import { DELETE_LOCATION } from '../Store/locations.mutation'

const Locations = ({...props}) => {
  const {data: prepcenterLocationsQuery, loading: prepcenterLocationsQueryLoading, refetch: prepcenterLocationsRefetch} = useQuery(GET_PREPCENTER_LOCATIONS, {
    variables: {
      prepcenterId: parseInt(props.match.params.prepcenterId)
    }
  })

  const handleRowDelete = (oldData) => {
    deleteLocation({ 
      variables: { 
        id: parseInt(oldData.id)
      } 
    }).then(() => prepcenterLocationsRefetch())
  }    

  const [deleteLocation] = useMutation(DELETE_LOCATION);

  const [visible, setVisible] = useState(false);
  const onOpen = useCallback(() => setVisible(true), []);
  const onClose = useCallback(() => setVisible(false), []);
  
  if (prepcenterLocationsQueryLoading) return 'Loading...'
  
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
          data={JSON.parse(JSON.stringify(prepcenterLocationsQuery.prepcenterLocations))}           
        />      	
        <NewLocationDrawer
          visible={visible} 
          onClose={onClose}
          locationsRefetch={prepcenterLocationsRefetch}
          prepcenterId={props.match.params.prepcenterId}
        />              
    </div>
  )
}

export default Locations
