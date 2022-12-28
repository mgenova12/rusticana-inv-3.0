import React, {useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';
import { GET_GIFT_CARD_LOGS } from './giftcard.query'

// import AddValue from './_AddValue.js'

const GiftCardLogs = ({...props}) => {
  const { register, handleSubmit, reset } = useForm({mode: "onBlur"});
  const [searchTerm, setSearchTerm] = useState('')

  const [cardData, setCardData] = useState(null)
  
  const [getGiftCard, {data: getGiftCardQuery, loading: getGiftCardLoading}] = useLazyQuery(GET_GIFT_CARD_LOGS, {
    variables: {
      cardNumber: searchTerm.slice(0, 16)
    },
    onCompleted(data) {
      setCardData(data.getGiftCard)
    }
  })

  const onSubmit = data => {
    getGiftCard()
  }

  return (
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

        {cardData &&
        
{/*          <AddValue
            cardData={cardData}
          />*/}
        }

      </div>
    </Container>
  )
}

export default GiftCardLogs
