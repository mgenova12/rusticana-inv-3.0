import React, {useState, useCallback} from 'react';
import { useQuery } from '@apollo/client';
import Checkbox from '@material-ui/core/Checkbox';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { GET_ORDER } from './store.query'
import { GET_CATEGORIES } from '../Globals/globals.query'
import { GET_DISTRIBUTORS } from '../Globals/globals.query'

const Order = ({...props}) => {
  const {data: orderInventoriesQuery, loading: orderInventoriesQueryLoading} = useQuery(GET_ORDER, {
    variables: {
      orderId: parseInt(props.match.params.orderId)
    }
  })
  const {data: categoriesQuery, loading: categoriesQueryLoading} = useQuery(GET_CATEGORIES)
  const {data: distributorsQuery, loading: distributorsQueryLoading} = useQuery(GET_DISTRIBUTORS)

  const [activeTab, setActiveTab] = useState(null);
  const selectTab = useCallback((distributorId) => setActiveTab(distributorId), []);

  if (orderInventoriesQueryLoading) return 'Loading...'
  if (categoriesQueryLoading) return 'Loading...'
  if (distributorsQueryLoading) return 'Loading...'

  const results = !activeTab
    ? orderInventoriesQuery.orderInventories
    : orderInventoriesQuery.orderInventories.filter(inventory =>
        inventory.storeGoodIncludingDeleted.distributor.id === activeTab
      );

  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          value={activeTab}
        >
          <Tab
            label='All'
            style={{outlineStyle:'none'}}
            value={null}
            onClick={() => selectTab(null)}
          />

        { distributorsQuery.distributors.map((distributor) => (

          <Tab
            key={distributor.id}
            label={distributor.name}
            style={{outlineStyle:'none'}}
            onClick={() => selectTab(distributor.id)}
            value={distributor.id}
          />

        ))}

        </Tabs>
      </AppBar>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Checked</th>
              <th>Product</th>
              <th>Current Quantity</th>
              <th>Quantity Needed</th>
            </tr>
          </thead>

            { categoriesQuery.categories.map((category) => (
              <thead className="thead-dark" key={category.id}>
                <tr align='center'>
                  <th colSpan="4">{category.name}</th>
                </tr>
                
              { results.map((inventory) => (

                (inventory.storeGoodIncludingDeleted.productIncludingDeleted.category.id === category.id &&

                  <tr key={inventory.id}>
                    <td> <Checkbox value="checkedA" /> </td>
                    <td>{inventory.storeGoodIncludingDeleted.productIncludingDeleted.name} </td>
                    <td>{inventory.quantity} {inventory.storeGoodIncludingDeleted.countBy.name}</td>
                    <td>{inventory.quantityNeeded} </td>
                  </tr>

                )

              ))}

              </thead>
            ))}



        </table>
      </div>
    </div>
  )
}

export default Order






