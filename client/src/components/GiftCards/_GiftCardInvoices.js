import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import BeatLoader from "react-spinners/BeatLoader"
import { GET_STORES } from './giftcard.query'


const GiftCardInvoices = ({...props}) => {
  const [totalMoneyOwed, setTotalMoneyOwed] = useState(null)

  const {data: storesQuery, loading: storesQueryLoading } = useQuery(GET_STORES, {
    fetchPolicy: "network-only",
    onCompleted(data) {
      setTotalMoneyOwed(Math.abs(data.stores.map(i=>i.giftCardMoneyOwed).reduce((a,b)=>a-b)))
    }
  })

  if (storesQueryLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>

  return (
    <div>
      <Container component="main" maxWidth="lg">
      <br/>
      <div className="row">
        {storesQuery.stores.map(store =>
          <div class="col-lg">
            <h3 key={store.id}>{store.name}: ${store.giftCardMoneyOwed}</h3>
          </div>
        )}
        <div class="col-lg">
        <h3>Create invoice for ${totalMoneyOwed}</h3>
        </div>
      
        <div class="col-lg">
         <Button 
          type='submit' 
          variant="contained" 
          color="primary" 
          size="large" 
          // onClick={() => setRedirect(true)} 
          >
            Create Invoice
         </Button>
         </div>
      </div>
      <br/>

      </Container>
      <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Store</th>
                <th>Time Stamp</th>
              </tr>
            </thead>
            <tbody>

                <tr >
                  <td></td>
                  <td></td>
                  <td></td>
                </tr> 

            </tbody>
          </table> 
      </div>
    </div>
  )
}

export default GiftCardInvoices
