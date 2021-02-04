import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import MaterialTable from 'material-table';
import { GET_PREPCENTER_STORE_GOODS} from './prepcenter.query'
import { DELETE_STORE_GOOD } from '../Store/store.mutation'
import { EDIT_STORE_GOOD } from '../Store/store.mutation'
import { GET_PREPCENTER_LOCATIONS } from './prepcenter.query'
import { GET_DISTRIBUTORS } from '../Globals/globals.query'
import { GET_COUNT_BIES } from '../Store/store.query'
import BeatLoader from "react-spinners/BeatLoader"

const StoreGoods = ({...props}) => {
  const {data: prepcenterStoreGoodsQuery, loading: prepcenterStoreGoodsQueryLoading, refetch: prepcenterStoreGoodsRefetch} = useQuery(GET_PREPCENTER_STORE_GOODS, {
    fetchPolicy: "network-only",
    variables: {
      prepcenterId: parseInt(props.match.params.prepcenterId)
    }
  })
  const {data: prepcenterLocationsQuery, loading: prepcenterLocationsQueryLoading} = useQuery(GET_PREPCENTER_LOCATIONS, {
    variables: {
      prepcenterId: parseInt(props.match.params.prepcenterId)
    }
  })
  const {data: distributorsQuery, loading: distributorsQueryLoading} = useQuery(GET_DISTRIBUTORS)
  const {data: countBiesQuery, loading: countBiesQueryLoading} = useQuery(GET_COUNT_BIES)

  const handleRowDelete = (oldData) => {
    deleteStoreGood({ 
      variables: { 
        id: parseInt(oldData.id)
      } 
    }).then(() => prepcenterStoreGoodsRefetch())
  }

  const [deleteStoreGood] = useMutation(DELETE_STORE_GOOD);
  const [editStoreGood] = useMutation(EDIT_STORE_GOOD);
  
  if (prepcenterStoreGoodsQueryLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>
  if (prepcenterLocationsQueryLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>
  if (distributorsQueryLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>
  if (countBiesQueryLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>

  let locationsLookup = prepcenterLocationsQuery.prepcenterLocations.reduce((obj, item) => ((obj[item.id] = item.name, obj)) ,{});
  let distributorsLookup = distributorsQuery.distributors.reduce((obj, item) => ((obj[item.id] = item.name, obj)) ,{});
  let countBiesLookup = countBiesQuery.countBies.reduce((obj, item) => ((obj[item.id] = item.name, obj)) ,{});
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
                        amountInStock: parseFloat(newData.amountInStock),
                        active: newData.active
                      }
                    }).then(() => prepcenterStoreGoodsRefetch());

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
              { title: 'Delivery Day', field: 'deliveryDay',
                lookup: {'Distributor': 'Distributor', 'Prepped': 'Prepped', 'Both': 'Both'}
              },
              { title: 'Active', field: 'active', type: 'boolean' },
          ]}
          data={JSON.parse(JSON.stringify(prepcenterStoreGoodsQuery.prepcenterStoreGoods))}     
        />      	
          
    </div>
  )
}

export default StoreGoods

