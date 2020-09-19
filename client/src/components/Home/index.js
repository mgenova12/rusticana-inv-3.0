import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_STORES } from './stores.query'


const Home = () => {
  const result = useQuery(GET_STORES)

  if (result.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
    	TEST
      {result.data.stores.map(p => p.name).join(', ')}
    </div>
  )
}

export default Home






