import React, { useState, useCallback, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { useMutation } from '@apollo/client';
import { REDEEM_COUPON } from './coupons.mutation';
import { GET_COUPON } from './coupons.query';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CouponData = ({...props}) => {
  const { startOver, couponData: initialCouponData, onRedeemSuccess } = props;
  const coupon = props.couponData;
  const customer = coupon?.customer;
  const [isRedeemed, setIsRedeemed] = useState(coupon?.redeemedOn != null);
  const [redeemedDate, setRedeemedDate] = useState(coupon?.redeemedOn);
  const isActivated = coupon?.activatedOn != null;

  useEffect(() => {
    if (coupon?.redeemedOn) {
      setIsRedeemed(true);
      setRedeemedDate(coupon.redeemedOn);
    }
  }, [coupon?.redeemedOn]);
  const [errorOpen, setErrorOpen] = useState(false);
  const [mutationErrors, setMutationErrors] = useState([]);
  
  const handleErrorOpen = useCallback(() => setErrorOpen(true), []);
  const handleErrorClose = useCallback(() => setErrorOpen(false), []);

  const [redeemCoupon, { loading: redeemLoading }] = useMutation(REDEEM_COUPON, {
    onCompleted(data) {
      if (data.redeemCoupon.errors && data.redeemCoupon.errors.length > 0) {
        setMutationErrors(data.redeemCoupon.errors);
        handleErrorOpen();
      } else {
        setIsRedeemed(true);
        setRedeemedDate(data.redeemCoupon.coupon.redeemedOn);
        // Notify parent of successful redemption
        if (onRedeemSuccess) {
          onRedeemSuccess();
        }
        // Clear coupon data immediately
        if (startOver) {
          startOver();
        }
      }
    },
    onError(error) {
      setMutationErrors([error.message]);
      handleErrorOpen();
    }
  });

  const handleRedeem = () => {
    if (coupon?.id) {
      redeemCoupon({ variables: { couponId: coupon.id } });
    }
  };

  return (
    <Box mt={3}>
      <Snackbar
        open={errorOpen}
        autoHideDuration={6000} 
        onClose={handleErrorClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Alert onClose={handleErrorClose} severity="error">
          {mutationErrors.length > 0 ? mutationErrors[0] : 'An error occurred'}
        </Alert>
      </Snackbar>
      
      <Paper elevation={3} style={{ padding: '24px', marginBottom: '16px' }}>
        <Box mb={2}>
          <Typography variant="h4" component="h2" gutterBottom style={{ fontWeight: 'bold' }}>
            Coupon Code
          </Typography>
          <Typography variant="h5" component="div" style={{ fontFamily: 'monospace', letterSpacing: '2px', color: '#3f51b5' }}>
            {coupon?.code}
          </Typography>
        </Box>

        <Box mb={2} display="flex" gap={1} flexWrap="wrap">
          {isRedeemed && (
            <Chip 
              label="Redeemed" 
              color="secondary" 
              size="small"
              style={{ fontWeight: 'bold' }}
            />
          )}
          {isActivated && !isRedeemed && (
            <Chip 
              label="Activated" 
              color="primary" 
              size="small"
              style={{ fontWeight: 'bold' }}
            />
          )}
          {!isActivated && (
            <Chip 
              label="Not Activated" 
              style={{ backgroundColor: '#ff9800', color: 'white', fontWeight: 'bold' }}
              size="small"
            />
          )}
        </Box>

        {!isActivated && (
          <Box mb={2} p={1.5} style={{ backgroundColor: '#fff3cd', borderRadius: '4px', borderLeft: '4px solid #ff9800' }}>
            <Typography variant="body1" style={{ color: '#856404', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>⚠️</span>
              <span>This coupon has not been activated yet</span>
            </Typography>
          </Box>
        )}

        {isRedeemed && redeemedDate && (
          <Box mb={2}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Redeemed On
            </Typography>
            <Typography variant="body1" style={{ fontWeight: '500' }}>
              {new Date(redeemedDate).toLocaleString()}
            </Typography>
          </Box>
        )}
      </Paper>

      {customer ? (
        <Paper elevation={3} style={{ padding: '24px', marginBottom: '16px' }}>
          <Typography variant="h5" component="h3" gutterBottom style={{ fontWeight: 'bold', marginBottom: '16px' }}>
            Customer Information
          </Typography>
          <Divider style={{ marginBottom: '16px' }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                First Name
              </Typography>
              <Typography variant="body1" style={{ fontWeight: '500' }}>
                {customer.firstName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Last Name
              </Typography>
              <Typography variant="body1" style={{ fontWeight: '500' }}>
                {customer.lastName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Phone Number
              </Typography>
              <Typography variant="body1" style={{ fontWeight: '500' }}>
                {customer.phoneNumber}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Email
              </Typography>
              <Typography variant="body1" style={{ fontWeight: '500' }}>
                {customer.email}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <Paper elevation={3} style={{ padding: '24px', marginBottom: '16px', textAlign: 'center' }}>
          <Typography variant="h6" color="textSecondary">
            No customer associated with this coupon
          </Typography>
        </Paper>
      )}

      <Box mt={3} display="flex" gap={2} flexWrap="wrap">
        {!isRedeemed && isActivated && (
          <Button 
            type='button' 
            variant="contained" 
            color="primary"
            size="large"
            onClick={handleRedeem}
            disabled={redeemLoading}
            style={{ minWidth: '150px' }}
          >
            {redeemLoading ? 'Redeeming...' : 'Redeem Coupon'}
          </Button>
        )}
        {!isRedeemed && !isActivated && (
          <Button 
            type='button' 
            variant="contained" 
            color="default"
            size="large"
            disabled={true}
            style={{ minWidth: '150px' }}
          >
            Cannot Redeem - Not Activated
          </Button>
        )}
        <Button 
          type='button' 
          variant="contained" 
          color="secondary"
          size="large"
          onClick={() => startOver()}
          style={{ minWidth: '150px' }}
        >
          Start Over
        </Button>       
      </Box>
    </Box>
  )
}

export default CouponData

