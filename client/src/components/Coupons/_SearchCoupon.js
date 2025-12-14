import React, {useState, useCallback } from 'react';
import { useLazyQuery } from '@apollo/client';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { useForm } from "react-hook-form";
import Button from '@material-ui/core/Button';
import { GET_COUPON } from './coupons.query'
import BeatLoader from "react-spinners/BeatLoader"
import CouponData from './_CouponData.js'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SearchCoupon = ({...props}) => {
  const { register, handleSubmit } = useForm({mode: "onBlur"});
  
  const [couponData, setCouponData] = useState(null)
  const [couponSwiped, setCouponSwiped] = useState(false)
  const [currentCouponCode, setCurrentCouponCode] = useState(null)
  const [successOpen, setSuccessOpen] = useState(false)
  
  const handleSuccessOpen = useCallback(() => setSuccessOpen(true), []);
  const handleSuccessClose = useCallback(() => setSuccessOpen(false), []);
  
  const handleRedeemSuccess = useCallback(() => {
    handleSuccessOpen();
  }, [handleSuccessOpen]);

  const [getCoupon, {loading: getCouponLoading, refetch: refetchCoupon}] = useLazyQuery(GET_COUPON, {
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
      <Snackbar
        open={successOpen}
        autoHideDuration={3000} 
        onClose={handleSuccessClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Alert onClose={handleSuccessClose} severity="success">
          Coupon has been redeemed successfully!
        </Alert>
      </Snackbar>
      <Container component="main" maxWidth="sm">
        <div>
          <h1> Search Coupon </h1>
          <hr/>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Enter the coupon code"
              name="couponCode"
              inputRef={register({required: true})}
              placeholder="Enter the coupon code"
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
              onRedeemSuccess={handleRedeemSuccess}
              refetch={() => {
                if (currentCouponCode) {
                  getCoupon({variables: { code: currentCouponCode }})
                }
              }}
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

export default SearchCoupon

