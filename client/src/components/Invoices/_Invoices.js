import React, { useState, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import MaterialTable, { MTableToolbar } from 'material-table';
import { GET_INVOICES } from './invoices.query'
import { GET_STORES } from '../Home/home.query'
import { MARK_ORDER_PAID} from './invoices.mutation'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import BeatLoader from "react-spinners/BeatLoader"

const Invoices = ({...props}) => {
  const {data: storesQuery, loading: storesQueryLoading } = useQuery(GET_STORES)
  const {data: invoicesQuery, loading: invoicesQueryLoading, refetch: invoicesRefetch} = useQuery(GET_INVOICES, {
    fetchPolicy: "network-only",
  })

  const [markOrderPaid] = useMutation(MARK_ORDER_PAID);
  
  const handleMarkPaid = (selectedRows) => {
    const orderIds = selectedRows.map(selectedRow => parseInt(selectedRow.id))
    markOrderPaid({
      variables: { 
        orderIds: orderIds,
      }
    }).then(() => invoicesRefetch()); 
  }

  const handleRowClick = (event, rowData) => {
    props.history.push(`/invoices/order/${rowData.id}`)
  }

  const handleDeliveryDate = (rowData) => {
    if (rowData.isQuickOrder) {
      return (new Date(rowData.createdAt?.replace(/-/g, '/')).toLocaleDateString([], "en-US", { weekday: 'long'}))
    } else {
      return (new Date(rowData.storeOrder?.deliveryDate?.replace(/-/g, '/')).toLocaleDateString([], "en-US", { weekday: 'long'}))
    }
  }

  const [components] = useState({
    Toolbar: props => (
      <div>
        {props.selectedRows.length > 0  &&  
          <div
            style={{
              backgroundColor: 'rgb(255, 226, 236)', 
              fontSize: '20px', 
              color: '#f50057',
              position: 'relative',
              height: '70px'
          }}>
              <p style={{textAlign: 'center'}}>
                {props.selectedRows.length} Item(s) Selected <br/>
                Total: $ {props.selectedRows.reduce((a, b) => +a + +b.saleTotal, 0)}

              <Button 
                style={{
                  position:'absolute',
                  right: '15px',
                  top: '15px'                  
                }}
                onClick={() => handleMarkPaid(props.selectedRows)} 
                variant="contained"
                color="secondary" 
                size="medium"
              > Mark Paid </Button>       
            </p>
          </div>
        }
        <MTableToolbar {...props} />
      </div>
    ),
  });

  const [activeTab, setActiveTab] = useState(null);
  const selectTab = useCallback((store) => setActiveTab(store), []);

  if (invoicesQueryLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>
  if (storesQueryLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>

  const results = !activeTab
    ? invoicesQuery.invoices
    : invoicesQuery.invoices.filter(invoice =>
        invoice.store.id === activeTab
      );

  const calculateUnpaidTotal = (storeId) => {
    return invoicesQuery.invoices
      .filter(invoice => invoice.store.id === storeId && invoice.status !== 'PAID')
      .reduce((total, invoice) => total + parseFloat(invoice.saleTotal), 0);
  };

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

          {storesQuery.stores.map(store =>
            <Tab
              key={store.id}
              label={`${store.name} (Unpaid: $${calculateUnpaidTotal(store.id).toFixed(2)})`}
              style={{outlineStyle:'none'}}
              onClick={() => selectTab(store.id)}
              value={store.id}
            />
          )}
        </Tabs>
      </AppBar>    

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        /> 
        <MaterialTable
          components={components}
          onRowClick={handleRowClick}
          title="Invoices"    
          options={{
            paging: false,
            selection: true,
            showTextRowsSelected: false,
          }}

          columns={[
            { title: 'ID', field: 'id', editable: 'never' },
            { title: 'Delivery Date',
              render: rowData => handleDeliveryDate(rowData)
            },
            { title: 'Time Placed', field: 'createdAt',
              render: row => <span>{ new Date(row["createdAt"].replace(/-/g, '/')).toLocaleDateString([], {timeZone:'America/New_York', hour: '2-digit', minute:'2-digit'})}</span>
            },
            { title: 'Store', field: 'store',
              render: row => row['isQuickOrder'] ? <span>{row["store"].name}(quick order)</span> : row["store"].name
            },
            { title: 'Status', field: 'status',
              render: row => row['status'] === 'PAID' ? <span className="text-success"> {row["status"]}</span> : <span>{row['status']}</span>
            },
            { title: 'Total', field: 'saleTotal', type: "currency" },
          ]}
          data={JSON.parse(JSON.stringify(results))}   
        />
    </div>
  )
}

export default Invoices

