import React, {useState, useCallback, useRef } from 'react';
import { useQuery } from '@apollo/client';
import MaterialTable from 'material-table';
import { GET_INVOICES } from './invoices.query'

const Invoices = () => {
  
  const {data: invoicesQuery, loading: invoicesQueryLoading} = useQuery(GET_INVOICES)
  
  const [total, setTotal] = useState(0);
  const tableRef = React.useRef();
  // const add = useCallback((rows) => {
  //   const newTotal = rows.reduce((a, b) => +a + +b.saleTotal, 0)
  //     window.setTimeout(() => {
  //       setTotal(newTotal);
  //     }, 5000)

  // }, [])

  // const add = (rows) => {
  //   setTotal(rows.reduce((a, b) => +a + +b.saleTotal, 0))
  //   // console.log("value set is ", total);
  // };

  // useEffect(() => {
  //   console.log("value set is ", total);
  //    // take action when isVisible Changed
  // }, [total])

  if (invoicesQueryLoading) return 'Loading...'

// setTotal(prev => ({...prev, total:'11111'}));
// setTotal((values) => ({...values, total: result}))
// setTotal(rows.reduce((a, b) => +a + +b.saleTotal, 0))
// tableRef.current.dataManager.changeRowSelected(false, [idx])
  console.log(total)
  return (
    <div>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        /> 
        {total}        
        <MaterialTable
          tableRef={tableRef}
          title="Invoices"
          localization={{ 
            toolbar: {
              nRowsSelected: `{0} Selected Total: ${total}`
            },
          }}
          onSelectionChange={(rows) =>  console.log(tableRef.current)}          
          options={{
            paging: false,
            selection: true,
          }}
          actions={[
            {
              icon: 'delete',
              onClick: (evt, data) => alert('You want to delete ' + data.length + ' rows')
            }
          ]}       
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

