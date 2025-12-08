import React from 'react';
import Button from '@material-ui/core/Button';

const CouponData = ({...props}) => {
  const { startOver } = props;
  const coupon = props.couponData;
  const customer = coupon?.customer;

  return (
    <div>
      <h2>Coupon Code: {coupon?.code}</h2>
      {customer ? (
        <div>
          <h2>Customer Information:</h2>
          <h3>First Name: {customer.firstName}</h3>
          <h3>Last Name: {customer.lastName}</h3>
          <h3>Phone Number: {customer.phoneNumber}</h3>
          <h3>Email: {customer.email}</h3>
        </div>
      ) : (
        <h2>No customer associated with this coupon</h2>
      )}

      <div className="d-inline-block">
       <Button 
          type='submit' 
          variant="contained" 
          color="secondary"
          size="large"
          className="button m-2"
          onClick={() => startOver()}
          >
          Start Over
       </Button>       
      </div>
    </div>
  )
}

export default CouponData

