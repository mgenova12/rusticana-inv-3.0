import React from 'react';
import { useQuery } from '@apollo/client';
import Container from '@material-ui/core/Container';
import BeatLoader from "react-spinners/BeatLoader"
import { GET_COUPONS } from './coupons.query'

const Coupons = ({...props}) => {
  const {data: couponsQuery, loading: couponsQueryLoading} = useQuery(GET_COUPONS, {
    fetchPolicy: "network-only"
  })

  if (couponsQueryLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>

  return (
    <div>
    <Container component="main" maxWidth="md">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <h1>Coupons</h1>
      </div>
    </Container>
    <br/>
      <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Code</th>
                <th>Used By</th>
              </tr>
            </thead>
            <tbody>
            {couponsQuery.coupons.map((coupon) => (
                <tr key={coupon.id}>
                  <td>{coupon.id}</td>
                  <td>{coupon.code}</td>
                  <td>
                    {coupon.customer ? (
                      `${coupon.customer.firstName} ${coupon.customer.lastName} (${coupon.customer.email})`
                    ) : (
                      'Not used'
                    )}
                  </td>
                </tr> 
            ))}

            </tbody>
          </table> 
      </div>
    </div>
  )
}

export default Coupons

