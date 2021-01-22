import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import MaterialTable, { MTableToolbar } from 'material-table';
import { GET_INVOICES } from './invoices.query'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';

const Invoices = () => {
  
  const {data: invoicesQuery, loading: invoicesQueryLoading} = useQuery(GET_INVOICES)
  
  const [components] = useState({
    Toolbar: props => (
      <div>
        {props.selectedRows.length > 0  &&  
          <div
            style={{
              backgroundColor: 'rgb(255, 226, 236)', 
              fontSize: '20px', 
              color: '#f50057',
              height: '70px',          
          }}>

          <div class='text-center'>
            <p>
              {props.selectedRows.length} Item(s) Selected <br/>
              Total: $ {props.selectedRows.reduce((a, b) => +a + +b.saleTotal, 0)}
            </p>
          </div>

            <div style={{float: "right"}}>
            <Button 
              // onClick={} 
              
              variant="contained" Í
              color="secondary" 
              size="medium"
            > Mark Paid </Button>       
            </div>
          </div>
        }

        <MTableToolbar {...props} />
      </div>
    ),
  });


  if (invoicesQueryLoading) return 'Loading...'

  return (
    <div>
       <AppBar position="static" color="default">
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          // value={activeTab}
        >

          <Tab
            label='Store1'
            style={{outlineStyle:'none'}}
            value={'nonPrepped'}
            // onClick={()  => selectTab('nonPrepped')}
          />

          <Tab
            label='Store2'
            style={{outlineStyle:'none'}}
            // onClick={() => selectTab('prepped')}
            value={'prepped'}
          />

        </Tabs>
      </AppBar>    

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        /> 
        <MaterialTable
          components={components}
          title="Invoices"    
          options={{
            paging: false,
            selection: true,
            showTextRowsSelected: false,
          }}
      
          columns={[
            { title: 'ID', field: 'id', editable: 'never' },
            { title: 'Time Placed', field: 'createdAt', 
              render: row => <span>{ new Date(row["createdAt"].replace(/-/g, '/')).toLocaleDateString([], {timeZone:'America/New_York', hour: '2-digit', minute:'2-digit'})}</span>
            },
            { title: 'Store', field: 'store.name' },
            { title: 'Status', field: 'status' },
            { title: 'Total', field: 'saleTotal', type: "currency" },
          ]}
          data={JSON.parse(JSON.stringify(invoicesQuery.invoices))}           
        />      	
        
    </div>
  )
}

export default Invoices

