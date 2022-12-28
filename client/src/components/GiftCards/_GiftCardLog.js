import React, {useState } from 'react';
import {useQuery } from '@apollo/client';
// import TextField from '@material-ui/core/TextField';
// import Container from '@material-ui/core/Container';
// import { useForm } from "react-hook-form";
// import Button from '@material-ui/core/Button';
// import { GET_GIFT_CARD_LOGS } from './giftcard.query'
import { GET_GIFT_CARD_CHANGES} from './giftcard.query'
import BeatLoader from "react-spinners/BeatLoader"

// import AddValue from './_AddValue.js'

const GiftCardLog = ({...props}) => {
  // const { register, handleSubmit, reset } = useForm({mode: "onBlur"});
  // const [searchTerm, setSearchTerm] = useState('')

  const {data: getGiftCardChangesQuery, loading: getGiftCardChangesQueryLoading} = useQuery(GET_GIFT_CARD_CHANGES, {
    fetchPolicy: "network-only",
    variables: {
      giftCardId: parseInt(props.match.params.giftCardId)
    }
  })

  // const [cardData, setCardData] = useState(null)
  
  // const [getGiftCard, {data: getGiftCardLogsQuery, loading: getGiftCardLogsLoading}] = useLazyQuery(GET_GIFT_CARD_LOGS, {
  //   variables: {
  //     cardNumber: searchTerm.slice(0, 16)
  //   },
  //   onCompleted(data) {
  //     setCardData(data.getGiftCard)
  //   }
  // })


  // const onSubmit = data => {
  //   // getGiftCard()
  // }

  if (getGiftCardChangesQueryLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>

  return (
    <div>
      <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Store</th>
                <th>Change Value</th>
                <th>Card Number</th>
              </tr>
            </thead>
            <tbody>

            {getGiftCardChangesQuery.getGiftCardChanges.map((giftCardChange) => (
                <tr key={giftCardChange.id}>
                  <td>{giftCardChange.id}</td>
                  <td>{giftCardChange.store.name}</td>
                  {giftCardChange.changeEvent === 'add' ? 
                    <td> +{giftCardChange.changeValue} </td>
                    :
                    <td> -{giftCardChange.changeValue} </td>
                  }
                  <td>{giftCardChange.giftCard.cardNumber}</td>
                </tr> 
            ))}

            </tbody>
          </table> 
      </div>
    </div>
  )
}

export default GiftCardLog
