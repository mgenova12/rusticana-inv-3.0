import React, {useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';
import { GET_GIFT_CARD } from './giftcard.query'
import BeatLoader from "react-spinners/BeatLoader"
import CardData from './_CardData.js'
import { Redirect } from 'react-router-dom';

const SwipeGiftCard = ({...props}) => {
  const { register, handleSubmit } = useForm({mode: "onBlur"});
  
  const [cardData, setCardData] = useState(null)
  const [cardSwiped, setCardSwiped] = useState(false)
  const [currentCardNumber, setCurrentCardNumber] = useState(null)
  const [redirect, setRedirect] = useState(false);


  const [getGiftCard, {loading: getGiftCardLoading}] = useLazyQuery(GET_GIFT_CARD, {
    fetchPolicy: "network-only",
    onCompleted(data) {
      setCardData(data.getGiftCard)
      setCardSwiped(true)
    }
  })

  const onSubmit = data => {
    setCurrentCardNumber(data.cardNumber)
    getGiftCard({variables: { cardNumber: data.cardNumber }})
  }

  if (getGiftCardLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>
  if (redirect) return <Redirect to={{ pathname: `/store/${props.match.params.storeId}/activate_gift_card`, data: { currentCardNumber } }} />

  return (
    <div>
      <Container component="main" maxWidth="sm">
        <div>
          <h1> Swipe Gift Card </h1>
          <hr/>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Swipe the card or enter the card number"
              name="cardNumber"
              inputRef={register({required: true})}
              placeholder="Swipe the card or enter the card number"
              fullWidth
              margin="normal"
              variant="outlined"
              onInput = {(e) =>{ e.target.value = e.target.value.toString().slice(0,16)}}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
             <Button type='submit' variant="contained" color="primary" size="large" >
                Search Gift Card
             </Button>        
          </form>

          {(cardData && cardSwiped) &&
            <CardData
              cardData={cardData}
              storeId={parseInt(props.match.params.storeId)}
              history={props.history}
            />
          }

          {(cardData == null && cardSwiped) &&
          <div>
            <h2> Card number: {currentCardNumber}</h2>
            <h2>NOT FOUND</h2>

             <Button 
              type='submit' 
              variant="contained" 
              color="primary" 
              size="large" 
              onClick={() => setRedirect(true)} >
                Activate Now
             </Button>

          </div>
          }

        </div>
      </Container>
    </div>
  )
}

export default SwipeGiftCard
