import React, {useState } from 'react';
import { useQuery } from '@apollo/client';
import TextField from '@material-ui/core/TextField';
import { GET_STORE_STORE_GOODS } from './prepcenter.query'
import BeatLoader from "react-spinners/BeatLoader"
import Container from '@material-ui/core/Container';
import AddToCart from './_AddToCart.js'
import Button from '@material-ui/core/Button';

const QuickOrder = ({...props}) => {
  const [searchTerm, setSearchTerm] = useState('')

  const {data: storeGoodsQuery, loading: storeGoodsLoading, refetch: storeGoodsRefetch} = useQuery(GET_STORE_STORE_GOODS, {
    variables: {
      orderId: parseInt(props.match.params.orderId)
    }
  })

  if (storeGoodsLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>

  let result = storeGoodsQuery.getOrder.store.storeGoods.filter(storeGood =>
      storeGood.product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

  return (
    <div>

    <Container component="main" maxWidth="md">
      <h3 className='m-2 text-center'>Quick Order for {storeGoodsQuery.getOrder.store.name}</h3>
        <TextField
          label="Search Product by"
          name="search"
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search Product Name"
          fullWidth
          margin="normal"
          type="text"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Review Order
          </Button>    
      </Container>

      <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Barcode</th>
                <th>Product</th>
                <th>Add Product</th>
              </tr>
            </thead>
            <tbody>
            
            {result.map((storeGood) => (
                <tr key={storeGood.id}>
                  <td>{storeGood.id}</td>  
                  <td>{storeGood.product.barcode}</td> 
                  <td>{storeGood.product.name}</td>
                  <td> 
                    <AddToCart
                      storeGoodId={storeGood.id}
                      orderId={props.match.params.orderId}
                    />
                  </td>
                </tr> 
            ))}

            </tbody>
          </table> 
      </div>

    </div>
  )
}

export default QuickOrder
