import React, {useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';
import { GET_COUPON } from './coupons.query'
import BeatLoader from "react-spinners/BeatLoader"
import CouponData from './_CouponData.js'

const SwipeCoupon = ({...props}) => {
  const { register, handleSubmit } = useForm({mode: "onBlur"});
  
  const [couponData, setCouponData] = useState(null)
  const [couponSwiped, setCouponSwiped] = useState(false)
  const [currentCouponCode, setCurrentCouponCode] = useState(null)

  const [getCoupon, {loading: getCouponLoading}] = useLazyQuery(GET_COUPON, {
    fetchPolicy: "network-only",
    onCompleted(data) {
      setCouponData(data.getCoupon)
      setCouponSwiped(true)
    }
  })
  
  const handleStartOver = () => {
    setCouponSwiped(false)
    setCouponData(null)
  }  

  const onSubmit = data => {
    setCurrentCouponCode(data.couponCode)
    getCoupon({variables: { code: data.couponCode }})
  }

  if (getCouponLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>

  return (
    <div>
      <Container component="main" maxWidth="sm">
        <div>
          <h1> Swipe Coupon </h1>
          <hr/>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Swipe the coupon or enter the coupon code"
              name="couponCode"
              inputRef={register({required: true})}
              placeholder="Swipe the coupon or enter the coupon code"
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
             <Button type='submit' variant="contained" color="primary" size="large" >
                Search Coupon
             </Button>        
          </form>

          {(couponData && couponSwiped) &&
            <CouponData
              couponData={couponData}
              startOver={handleStartOver}
            />
          }

          {(couponData == null && couponSwiped) &&
          <div>
            <h2> Coupon code: {currentCouponCode}</h2>
            <h2>NOT FOUND</h2>

             <Button
                type='submit' 
                variant="contained" 
                color="secondary"
                size="large"
                className="button m-2"
                onClick={() => handleStartOver()}
                >
                Start Over
             </Button>              
          </div>
          }

        </div>
      </Container>
    </div>
  )
}

export default SwipeCoupon

