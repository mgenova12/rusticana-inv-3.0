import React, {useState, useCallback} from 'react';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';
import { GET_GIFT_CARD } from './giftcard.query'

const SwipeGiftCard = ({...props}) => {
  const { register, handleSubmit, reset } = useForm({mode: "onBlur"});
  const [searchTerm, setSearchTerm] = useState('')

  const [cardData, setCardData] = useState(null)
  
  const [getGiftCard, {data: getGiftCardQuery, loading: getGiftCardLoading}] = useLazyQuery(GET_GIFT_CARD, {
    variables: {
      cardNumber: searchTerm.slice(0, 16)
    },
    onCompleted(data) {
      setCardData(data.getGiftCard)
      console.log(data.getGiftCard)
      // handleCounter(data.getOrder.pendingInventoriesCount)
    }
  })

  const onSubmit = data => {
    getGiftCard()
  } 

  return (
    <Container component="main" maxWidth="sm">
    <div>
      <h1> Swipe Gift Card </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Swipe the card or enter the card number"
          name="cardNumber"
          inputRef={register({required: true})}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Swipe the card or enter the card number"
          fullWidth
          margin="normal"
          type="number"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
         <Button type='submit' variant="contained" color="primary" size="large" >
            Search Gift Card
         </Button>        
      </form>

      {cardData &&
        <div>
          <h2>Amount: ${cardData.amount} </h2>
          <h2>Card Number: {cardData.cardNumber} </h2>

         <Button type='submit' variant="contained" color="primary" size="large" >
            Search Gift Card
         </Button>
         <Button type='submit' variant="contained" color="primary" size="large" >
            Search Gift Card
         </Button>
                            
        </div>


      }

    </div>
    </Container>
  )
}

export default SwipeGiftCard
