import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import MaterialTable from 'material-table';
import { GET_STORE_GOODS} from './storeGoods.query'
import { DELETE_STORE_GOOD } from './storeGoods.mutation'
import { EDIT_STORE_GOOD } from './storeGoods.mutation'
import { GET_LOCATIONS } from './locations.query'
import { GET_DISTRIBUTORS } from '../Globals/distributor.query'
import { GET_COUNT_BIES } from './countBy.query'
import { GET_CONTAINERS } from './container.query'

const StoreGoods = ({...props}) => {
  const {data: storeGoodsQuery, loading: storeGoodsQueryLoading, refetch: storeGoodsRefetch} = useQuery(GET_STORE_GOODS, {
    fetchPolicy: "network-only",
    variables: {
      storeId: parseInt(props.match.params.storeId)
    }
  })
  const {data: locationsQuery, loading: locationsQueryLoading} = useQuery(GET_LOCATIONS, {
    variables: {
      storeId: parseInt(props.match.params.storeId)
    }
  })
  const {data: distributorsQuery, loading: distributorsQueryLoading} = useQuery(GET_DISTRIBUTORS)
  const {data: countBiesQuery, loading: countBiesQueryLoading} = useQuery(GET_COUNT_BIES)
  const {data: containersQuery, loading: containersQueryLoading} = useQuery(GET_CONTAINERS)

  const handleRowDelete = (oldData) => {
    deleteStoreGood({ 
      variables: { 
        id: parseInt(oldData.id)
      } 
    }).then(() => storeGoodsRefetch())
  }

  const [deleteStoreGood] = useMutation(DELETE_STORE_GOOD);
  const [editStoreGood] = useMutation(EDIT_STORE_GOOD);
  
  if (storeGoodsQueryLoading) return 'Loading...'
  if (locationsQueryLoading) return 'Loading...'
  if (distributorsQueryLoading) return 'Loading...'
  if (countBiesQueryLoading) return 'Loading...'
  if (containersQueryLoading) return 'Loading...'

  let locationsLookup = locationsQuery.locations.reduce((obj, item) => ((obj[item.id] = item.name, obj)) ,{});
  let distributorsLookup = distributorsQuery.distributors.reduce((obj, item) => ((obj[item.id] = item.name, obj)) ,{});
  let countBiesLookup = countBiesQuery.countBies.reduce((obj, item) => ((obj[item.id] = item.name, obj)) ,{});
  let containerLookup = containersQuery.containers.reduce((obj, item) => ((obj[item.id] = item.name, obj)) ,{});
  let replenishByLookup = countBiesQuery.countBies.reduce((obj, item) => ((obj[item.name] = item.name, obj)) ,{}); 

  return (
    <div>
 
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <MaterialTable
          title="Store Goods"
          options={{
            paging: false,
            actionsColumnIndex: -1
          }} 
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                    
                    editStoreGood({ 
                      variables: { 
                        id: parseInt(newData.id), 
                        maxAmount: parseInt(newData.maxAmount),
                        locationId: parseInt(newData.location.id),
                        distributorId: parseInt(newData.distributor.id),
                        deliveryDay: newData.deliveryDay,
                        countById: parseInt(newData.countBy.id),
                        replenishBy: newData.replenishBy,
                        containerId: parseFloat(newData.container.id),
                        amountInStock: parseFloat(newData.amountInStock),
                      }
                    }).then(() => storeGoodsRefetch());

                }, 300);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  handleRowDelete(oldData)
              }, 100);
            }), 
          }} 
          columns={[
              { title: 'ID', field: 'id', editable: 'never' },
              { title: 'Name', 
                field: 'product.name', 
                editable: 'never' 
              },
              { title: 'Location', 
                field: 'location.id',
                lookup: locationsLookup 
              },
              { title: 'Local Distributor',
                field: 'distributor.id',
                lookup: distributorsLookup
              },
              { title: 'Amount In Stock', field: 'amountInStock' },
              { 
                title: 'Count By', 
                field: 'countBy.id',
                lookup: countBiesLookup
              },
              { title: 'Max Amount', field: 'maxAmount' },
              { 
                title: 'Replenish By', 
                field: 'replenishBy',
                lookup: replenishByLookup
              },
              { 
                title: 'Container', 
                field: 'container.id',
                lookup: containerLookup
              },              
              { title: 'Delivery Day', field: 'deliveryDay',
                lookup: {'Tuesday': 'Tuesday', 'Friday': 'Friday', 'Both': 'Both'}
              },
          ]}
          data={JSON.parse(JSON.stringify(storeGoodsQuery.storeGoods))}     
        />      	
          
    </div>
  )
}

export default StoreGoods

