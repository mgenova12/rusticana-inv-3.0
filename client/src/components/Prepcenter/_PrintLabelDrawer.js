import React, { useRef } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Barcode from 'react-barcode'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import { useReactToPrint } from 'react-to-print';
import Label from './_Label.js'

const PrintLabelDrawer = ({ visible, onClose, currentProduct }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
			<Drawer 
        open={visible}
        variant="temporary"
        keepMounted={true}
        anchor="right"
        onClose={onClose}
      >
        <h3 
        className="mr-2 ml-2 text-wrap" 
        align="center"
        style={{width: "20rem"}}
        >Print: {currentProduct.product.name}</h3>
        <List >

          <ListItem>{new Date().toLocaleString()}</ListItem>
          <ListItem>CATEGORY: {currentProduct.product.category.name}</ListItem>
          <ListItem>DAYS TILL EXPIRE: {currentProduct.product.daysTillExpire}</ListItem>
          <ListItem>USE BY DATE: ???</ListItem>
          <ListItem>POST THAW ____________________</ListItem>
          {currentProduct.product.category.name !== 'Dry' &&
            <ListItem>KEEP REFRIGERATED!</ListItem>
          }
          <ListItem><Barcode value={currentProduct.product.barcode} height={25} margin={0} /></ListItem>

          <ListItem> 

            <Button type='submit' variant="contained" color="primary" onClick={handlePrint}>Print Label</Button>
            
            <div style={{ display: "none" }}>
              <Label 
                currentProduct={currentProduct}
                ref={componentRef} 
              />
            </div>

          </ListItem>

          </List>
      </Drawer> 
    </div>
  );
};

export default PrintLabelDrawer
