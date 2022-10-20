import React, {useState, useCallback} from 'react';
import { useQuery } from '@apollo/client';
import MaterialTable from 'material-table';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PrintLabelDrawer from './_PrintLabelDrawer.js'
import { GET_PREPCENTER_LABELS } from './prepcenter.query'
import BeatLoader from "react-spinners/BeatLoader"

const PrintLabels = ({...props}) => {
  const {data: prepcenterLabelsQuery, loading: prepcenterLabelsQueryLoading} = useQuery(GET_PREPCENTER_LABELS, {
    variables: {
      prepcenterId: parseInt(props.match.params.prepcenterId)
    }
  })
  const [ currentProduct, setCurrentProduct ] = useState(null);

  const [activeTab, setActiveTab] = useState('nonPrepped');
  const selectTab = useCallback((prepped) => setActiveTab(prepped), []);

  const [visible, setVisible] = useState(false);
  const onOpen = useCallback(() => setVisible(true), []);
  const onClose = useCallback(() => setVisible(false), []);

  if (prepcenterLabelsQueryLoading) return <div className="center"><BeatLoader color={"#3f51b5"} size={50} /></div>
  
  const results = activeTab === 'nonPrepped'
    ? prepcenterLabelsQuery.getPrepcenter.storeGoods.filter(storeGood => storeGood.product.prepped === false)
    : prepcenterLabelsQuery.getPrepcenter.storeGoods.filter(storeGood => storeGood.product.prepped === true)

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
            label='Non-prepped'
            style={{outlineStyle:'none'}}
            value={'nonPrepped'}
            onClick={() => selectTab('nonPrepped')}
          />

          <Tab
            label='Prepped'
            style={{outlineStyle:'none'}}
            onClick={() => selectTab('prepped')}
            value={'prepped'}
          />

        </Tabs>
      </AppBar>

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <MaterialTable
          title="Print Labels"
          options={{
            paging: false,
            actionsColumnIndex: -1,
          }}          
          columns={[
            { title: 'ID', field: 'id' },
            { title: 'Name', field: 'product.name' },
            { title: 'Barcode', field: 'product.barcode' },
          ]}
          actions={[
            {
              icon: 'print',
              tooltip: 'Print Label',
              onClick: (event, rowData) => {
                setCurrentProduct(rowData)
                onOpen()
              }
            },           
          ]}           
        data={JSON.parse(JSON.stringify(results))} 
        /> 

        { currentProduct &&
          <PrintLabelDrawer
            visible={visible} 
            onClose={onClose}
            currentProduct={currentProduct}
          />  
        }
    </div>
  )
}

export default PrintLabels
