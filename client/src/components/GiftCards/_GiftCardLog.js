import React from 'react';
import {useQuery } from '@apollo/client';
import { GET_GIFT_CARD_CHANGES} from './giftcard.query'
import BeatLoader from "react-spinners/BeatLoader"

const GiftCardLog = ({...props}) => {

  const {data: getGiftCardChangesQuery, loading: getGiftCardChangesQueryLoading} = useQuery(GET_GIFT_CARD_CHANGES, {
    fetchPolicy: "network-only",
    variables: {
      giftCardId: parseInt(props.match.params.giftCardId)
    }
  })

  if (getGiftCardChangesQueryLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>

  return (
    <div>
      <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Card Number</th>
                <th>Change Value</th>
                <th>Store</th>
                <th>Payment Method</th>
                <th>Ticket Number</th>
                <th>Time Stamp</th>
              </tr>
            </thead>
            <tbody>

            {getGiftCardChangesQuery.getGiftCardChanges.map((giftCardChange) => (
                <tr key={giftCardChange.id}>
                  <td>{giftCardChange.id}</td>
                  <td>{giftCardChange.giftCard.cardNumber}</td>
                  {giftCardChange.changeEvent === 'add' ? 
                    <td> + ${giftCardChange.changeValue} </td>
                    :
                    <td> - ${giftCardChange.changeValue} </td>
                  }
                  <td>{giftCardChange.store.name}</td>
                  <td>{giftCardChange.paymentMethod}</td>
                  <td>{giftCardChange.ticketNumber}</td>
                  <td>{new Date(giftCardChange.createdAt.replace(/-/g, '/')).toLocaleDateString([], {timeZone:'America/New_York', hour: '2-digit', minute:'2-digit'})}</td>
                </tr> 
            ))}

            </tbody>
          </table> 
      </div>
    </div>
  )
}

export default GiftCardLog
