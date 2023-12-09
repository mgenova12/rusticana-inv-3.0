import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import BeatLoader from "react-spinners/BeatLoader"
import { GET_STORES } from './giftcard.query'
import { CREATE_GIFTCARD_INVOICE } from './giftcard.mutation'

const GiftCardInvoices = ({...props}) => {
  const [storeWithMoneyOwed, setStoreWithMoneyOwed] = useState({})
  
  const [createGiftCardInvoice] = useMutation(CREATE_GIFTCARD_INVOICE, {
    onCompleted(data) {
      storesQueryRefetch()
    }
  });

  const onSubmit = () => {
    createGiftCardInvoice({
      variables: {
        amountPaid: totalMoneyOwed,
        storeId: parseInt(storeWithMoneyOwed.id),
      }
    })
  }

  const {data: storesQuery, loading: storesQueryLoading, refetch: storesQueryRefetch } = useQuery(GET_STORES, {
    fetchPolicy: "network-only",
    onCompleted(data) {
      let maxValue = Math.max(...data.stores.map(o => o.giftCardMoneyOwed), 0)
      setStoreWithMoneyOwed(data.stores.find(s => s.giftCardMoneyOwed === maxValue))
    }
  })

  if (storesQueryLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>

  let USDollar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
  });

  let giftCardInvoices = storesQuery.stores.map(s=> s.giftCardInvoices).flat()
  let totalMoneyOwed = Math.abs(storesQuery.stores.map(i=>i.giftCardMoneyOwed).reduce((a,b)=>a-b))

  return (
    <div>
      <Container component="main" maxWidth="lg">
      <br/>
      <div className="row">
        {storesQuery.stores.map(store =>
          <div key={store.id} className="col-lg">
            <h4>{store.name}: {USDollar.format(store.giftCardMoneyOwed)}</h4>
          </div>
        )}
        <div className="col-lg">
        { (totalMoneyOwed !== 0) &&
          <h4>Create invoice for {storeWithMoneyOwed.name} {USDollar.format(totalMoneyOwed)}</h4>
        }
        </div>
      
        <div className="col-lg">
        { (totalMoneyOwed !== 0) &&
         <Button 
          type='submit' 
          variant="contained" 
          color="primary" 
          size="large" 
          onClick={() => onSubmit()} 
          >
            Create Invoice
         </Button>
        }
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
                <th>Amount Paid</th>
                <th>Time Stamp</th>
              </tr>
            </thead>
            <tbody>
            {giftCardInvoices.map((giftCardInvoice) => (
                <tr key={giftCardInvoice.id}>
                  <td>{giftCardInvoice.id}</td>
                  <td>{giftCardInvoice.store.name}</td>
                  <td>{USDollar.format(giftCardInvoice.amountPaid)}</td>
                  <td>{new Date(giftCardInvoice.createdAt.replace(/-/g, '/')).toLocaleDateString([], {timeZone:'America/New_York', hour: '2-digit', minute:'2-digit'})}</td>
                </tr>
            ))}
            </tbody>
          </table> 
      </div>
    </div>
  )
}

export default GiftCardInvoices
