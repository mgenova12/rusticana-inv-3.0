import React, {useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';
import { GET_GIFT_CARD } from './giftcard.query'
import { GET_GIFT_CARDS} from './giftcard.query'
import BeatLoader from "react-spinners/BeatLoader"

const GiftCardLogs = ({...props}) => {
  const { register, handleSubmit } = useForm({mode: "onBlur"});
  const [searchTerm, setSearchTerm] = useState('')

  const {data: giftCardsQuery, loading: giftCardsQueryLoading} = useQuery(GET_GIFT_CARDS, {
    fetchPolicy: "network-only"
  })

  const [getGiftCard, {loading: getGiftCardLoading}] = useLazyQuery(GET_GIFT_CARD, {
    variables: {
      cardNumber: searchTerm.slice(0, 16)
    },
    onCompleted(data) {
      props.history.push(`/gift_cards/store/${props.match.params.storeId}/gift_card/${data.getGiftCard.id}/log`)
    }
  })

  const onSubmit = data => {
    getGiftCard()
  }

  const showGiftCardLog = (giftCardId) => {
    props.history.push(`/gift_cards/store/${props.match.params.storeId}/gift_card/${giftCardId}/log`)
  }

  if (giftCardsQueryLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>
  if (getGiftCardLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>
  
  let USDollar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
  });

  return (
    <div>
    <Container component="main" maxWidth="sm">
      <div>
        <h1> Check Gift Card Logs</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Swipe the card or enter the card number"
            name="cardNumber"
            inputRef={register({required: true})}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Swipe the card or enter the card number"
            fullWidth
            margin="normal"
            variant="outlined"
            inputProps={{ maxLength: 16 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
           <Button type='submit' variant="contained" color="primary" size="large" >
              Get Gift Card Logs
           </Button>        
        </form>
      </div>
    </Container>
    <br/>
      <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
                <th>Card Number</th>
                <th>Currrent Amount</th>
                <th>Purchased At</th>
                <th>Money Owed</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>

            {giftCardsQuery.giftCards.map((giftCard) => (
                <tr key={giftCard.id} onClick={() => showGiftCardLog(giftCard.id)}>
                  <td>{giftCard.id}</td>
                  <td>{giftCard.firstName}</td>
                  <td>{giftCard.lastName}</td>
                  <td>{giftCard.phoneNumber}</td>
                  <td>{giftCard.cardNumber}</td> 
                  <td>{USDollar.format(giftCard.amount)}</td>
                  <td>{giftCard.store.name}</td>
                  <td>{USDollar.format(giftCard.moneyOwed)}</td>
                  <td>{new Date(giftCard.createdAt.replace(/-/g, '/')).toLocaleDateString([], {timeZone:'America/New_York', hour: '2-digit', minute:'2-digit'})}</td>
                </tr> 
            ))}

            </tbody>
          </table> 
      </div>
    </div>
  )
}

export default GiftCardLogs
