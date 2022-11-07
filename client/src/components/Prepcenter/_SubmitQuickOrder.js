import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PENDING_INVENTORY } from './prepcenter.query'
import { DELETE_PENDING_INVENTORY } from './prepcenter.mutation'
import BeatLoader from "react-spinners/BeatLoader"
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

const SubmitQuickOrder = ({...props}) => {
  const [deletePendingInventory] = useMutation(DELETE_PENDING_INVENTORY);

  const {data: pendingInventoryQuery, loading: pendingInventoryLoading, refetch: pendingInventoryRefetch} = useQuery(GET_PENDING_INVENTORY, {
    variables: {
      orderId: parseInt(props.match.params.orderId)
    }
  })

  const handleDelete = inventoryId => {
    deletePendingInventory({
      variables: {
        inventoryId: parseInt(inventoryId)
      }
    }).then(() => pendingInventoryRefetch())
  }

  if (pendingInventoryLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>

  return (
    <div>
      <Container component="main" maxWidth="md">
        <h3 className='m-2 text-center'>Review Quick Order</h3>
            <Button
              // onClick={() => props.history.push(`/prepcenter/${props.match.params.prepcenterId}/order/${props.match.params.orderId}/submit_quick_order`)} 
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Submit Quick Order
            </Button>    
        </Container>
      <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
            
            {pendingInventoryQuery.getOrder.pendingInventories.map((inventory) => (
                <tr key={inventory.id}>
                  <td>{inventory.id}</td>  
                  <td>{inventory.storeGood.product.name}</td> 
                  <td>{inventory.quantity} {inventory.storeGood.replenishBy}</td>
                  <td>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(inventory.id)}
                    >
                      Remove
                    </Button>                    
                  </td>
                </tr> 
            ))}

            </tbody>
          </table> 
      </div>

    </div>
  )
}

export default SubmitQuickOrder