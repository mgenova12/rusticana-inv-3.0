import React from 'react';
import { useQuery } from '@apollo/client';
import Checkbox from '@material-ui/core/Checkbox';
import { GET_CONTAINERS } from '../Store/container.query'
import { GET_STORE_ORDER } from './storeOrders.query'

const StoreOrder = ({...props}) => {

  const {data: storeOrderInventoriesQuery, loading: storeOrderInventoriesLoading} = useQuery(GET_STORE_ORDER, {
    variables: {
      orderId: parseInt(props.match.params.orderId)
    }
  })

  const {data: containersQuery, loading: containersQueryLoading} = useQuery(GET_CONTAINERS)

  // const handleOrderClick = (event, order, rowData) => {
  //   event.stopPropagation()
  //   props.history.push(`/prepcenter/${props.match.params.prepcenterId}/store_orders/${rowData.id}/orders/${order.id}`)
  // }

  if (storeOrderInventoriesLoading) return 'Loading...'
  if (containersQueryLoading) return 'Loading...'

  return (
    <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Checked</th>
              <th>Barcode</th>
              <th>Product</th>
              <th>Store Quantity</th>
              <th>Quantity Needed</th>
            </tr>
          </thead>

          { containersQuery.containers.map((container) => (
            <thead className="thead-dark" key={container.id}>
              <tr align='center'> 
                <th colSpan="5">{container.name}</th>
              </tr>

              {storeOrderInventoriesQuery.storeOrderInventories.map((inventory) => (
                (inventory.storeGood.container.id === container.id &&
                  <tr key={inventory.id}> 
                    <td> <Checkbox value="checkedA" /> </td>
                    <td>{inventory.product.barcode}</td>                
                    <td>{inventory.product.name}</td>
                    <td>{inventory.quantity} {inventory.storeGood.countBy.name}</td> 
                    <td>{inventory.quantityNeeded}</td> 
                  </tr> 
                )
              ))}
            </thead>
          ))}
        </table> 

    </div>
  )
}

export default StoreOrder






