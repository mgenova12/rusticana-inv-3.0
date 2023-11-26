import React, {useState } from 'react';
import { useMutation } from '@apollo/client';
import Container from '@material-ui/core/Container';
import { CREATE_GIFTCARD } from './giftcard.mutation'
import Button from '@material-ui/core/Button';
import BeatLoader from "react-spinners/BeatLoader"

const GiftCardReview = ({...props}) => {
  const [errors, setErrors] = useState([])
  const [success, setSuccess] = useState(false)

  const [createGiftCard, {loading: createGiftCardLoading}] = useMutation(CREATE_GIFTCARD, {
    onCompleted(data) {
      setErrors(data.createGiftCard.errors)
      if (data.createGiftCard.errors.length === 0) {
        setSuccess(true)
      }
    }
  });

  const onSubmit = () => {
    const data = props.location.data
    if (data) {
      createGiftCard({
        variables: {
          cardNumber: data.cardNumber.slice(0, 16),
          amount: parseFloat(data.amount),
          storeId: parseInt(props.match.params.storeId),
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          paymentMethod: data.paymentMethod
        }
      })
    }
      else {
      setErrors(['ERROR'])
    }
  }
  if (createGiftCardLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>
  const cardInfo = props.location?.data;

  return (
    <div>
      {errors.length > 0 &&
        <div className="alert alert-danger" role="alert">
          {errors[0]}
        </div>   
      }
      { success &&
        <div className="alert alert-success" role="alert">
          Gift Card Activated!
        </div>         
      }
      <Container component="main" maxWidth="sm">
        <div>
          <h1> Please Review Gift Card details </h1>
          <hr/>
          <h3>First Name: {cardInfo?.firstName}</h3>
          <h3>Last Name: {cardInfo?.lastName} </h3>
          <h3>Phone Number: {cardInfo?.phoneNumber} </h3>
          <h3>Payment Method: {cardInfo?.paymentMethod}</h3>
          <h3>Card Number: {cardInfo?.cardNumber} </h3>

           <Button type='submit' variant="contained" color="primary" size="large" onClick={() => onSubmit()} >
              Activate Gift Card
           </Button>           

        </div>
      </Container>
    </div>
  )
}

export default GiftCardReview
