import React from 'react'
import { gql, useQuery } from '@apollo/client';

	const GET_STORES = gql`
		query {
		  stores  {
		    name
		  }
		}
		`

const Home = () => {
  const result = useQuery(GET_STORES)

  if (result.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
      {result.data.stores.map(p => p.name).join(', ')}
    </div>
  )
}

export default Home






