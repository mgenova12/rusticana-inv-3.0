import React, {useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';
// import { GET_GIFT_CARD_LOGS } from './giftcard.query'
import { GET_GIFT_CARDS} from './giftcard.query'
import BeatLoader from "react-spinners/BeatLoader"

// import AddValue from './_AddValue.js'

const GiftCardLogs = ({...props}) => {
  const { register, handleSubmit, reset } = useForm({mode: "onBlur"});
  const [searchTerm, setSearchTerm] = useState('')

  const {data: giftCardsQuery, loading: giftCardsQueryLoading, refetch: giftCardsRefetch} = useQuery(GET_GIFT_CARDS)

  // const [cardData, setCardData] = useState(null)
  
  // const [getGiftCard, {data: getGiftCardLogsQuery, loading: getGiftCardLogsLoading}] = useLazyQuery(GET_GIFT_CARD_LOGS, {
  //   variables: {
  //     cardNumber: searchTerm.slice(0, 16)
  //   },
  //   onCompleted(data) {
  //     setCardData(data.getGiftCard)
  //   }
  // })
  const showGiftCardLog = (giftCardId) => {
    props.history.push(`/gift_cards/store/${props.match.params.storeId}/logs/gift_card/${giftCardId}`)
  }

  const onSubmit = data => {
    // getGiftCard()
  }

  if (giftCardsQueryLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>

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
                <th>Card Number</th>
                <th>Currrent Amount</th>
              </tr>
            </thead>
            <tbody>

            {giftCardsQuery.giftCards.map((giftCard) => (
                <tr key={giftCard.id} onClick={() => showGiftCardLog(giftCard.id)}>
                  <td>{giftCard.id}</td>
                  <td>{giftCard.cardNumber}</td> 
                  <td>${giftCard.amount}</td>
                </tr> 
            ))}

            </tbody>
          </table> 
      </div>
    </div>
  )
}

export default GiftCardLogs
