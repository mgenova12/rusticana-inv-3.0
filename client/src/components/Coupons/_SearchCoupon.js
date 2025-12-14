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
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';

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
          <Box mt={3}>
            <Paper elevation={3} style={{ padding: '24px', marginBottom: '16px' }}>
              <Box mb={2}>
                <Typography variant="h4" component="h2" gutterBottom style={{ fontWeight: 'bold' }}>
                  Coupon Code
                </Typography>
                <Typography variant="h5" component="div" style={{ fontFamily: 'monospace', letterSpacing: '2px', color: '#3f51b5' }}>
                  {currentCouponCode}
                </Typography>
              </Box>

              <Box mb={2} display="flex" gap={1} flexWrap="wrap">
                <Chip 
                  label="Not Found" 
                  style={{ backgroundColor: '#f44336', color: 'white', fontWeight: 'bold' }}
                  size="small"
                />
              </Box>

              <Box mb={2} p={1.5} style={{ backgroundColor: '#ffebee', borderRadius: '4px', borderLeft: '4px solid #f44336' }}>
                <Typography variant="body1" style={{ color: '#c62828', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>❌</span>
                  <span>The coupon code you entered does not exist in our system. Please check the code and try again.</span>
                </Typography>
              </Box>
            </Paper>

            <Box mt={3} display="flex" gap={2} flexWrap="wrap">
              <Button
                type='button' 
                variant="contained" 
                color="secondary"
                size="large"
                onClick={() => handleStartOver()}
                style={{ minWidth: '150px' }}
              >
                Start Over
              </Button>              
            </Box>
          </Box>
          }

        </div>
      </Container>
    </div>
  )
}

export default SearchCoupon

