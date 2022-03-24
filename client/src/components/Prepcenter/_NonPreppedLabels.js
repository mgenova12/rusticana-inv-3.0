import React from "react";
import Barcode from 'react-barcode'

export class NonPreppedLabels extends React.PureComponent {
  render() {
  	const { inventories } = this.props;

	  const getUsebyDate = (daysTillExpire) => {
	    const date = new Date();
	    date.setDate(date.getDate() + daysTillExpire);
	    return date.toLocaleDateString();
	  }

	  const nonPreppedInventories = inventories.filter((inventory) => !inventory.storeGoodIncludingDeleted.productIncludingDeleted.prepped)

    return (	
    	<div> 
    	
				<style dangerouslySetInnerHTML={{__html: `
					@media print {
					  .print-button, .no-print *
					  {
					    display: none !important;
					  }	
						header, footer, aside, nav, form, iframe, .menu, .hero, .adslot {
						  display: none !important;
						}
						h3 {
							font-size: 15pt;
						}
					  div {
					    break-inside: avoid;
					  }						
						h4 {
							font-size: 13pt;
						}
						@page { 
							margin: 0; 
							size: 2.0in 2.0in;
						}
						body {
							-webkit-print-color-adjust: exact !important;
					  	margin: 0.25cm 0cm 0cm 0.8cm;
					  	padding: 0;
						}
					}
				`}}/>	

				{ nonPreppedInventories.map((inventory) => (
					Array.apply(null, { length: inventory.quantityNeeded }).map((e, i) => (
			    	
			    	<div key={i}>
				    	<h3><span> {inventory.storeGoodIncludingDeleted.productIncludingDeleted.name}</span> </h3>
				    	<h4> {new Date().toLocaleString()} </h4>
				    	<h4> CATEGORY: {inventory.storeGoodIncludingDeleted.productIncludingDeleted.category.name} </h4>
				    	<h4> DAYS TILL EXPIRE: {inventory.storeGoodIncludingDeleted.productIncludingDeleted.daysTillExpire} </h4>
				    	<h4><span> USE BY DATE: {getUsebyDate(inventory.storeGoodIncludingDeleted.productIncludingDeleted.daysTillExpire)}</span></h4>
				    	<h4> POST THAW ____________________</h4>
		          {inventory.storeGoodIncludingDeleted.productIncludingDeleted.category.name !== 'Dry' &&
		            <h4>KEEP REFRIGERATED!</h4>
		          }		    	
				    	<div className='barcode'> <Barcode value={inventory.storeGoodIncludingDeleted.productIncludingDeleted.barcode} height={25} margin={0} /> </div>
			    	</div>
		    	))
	    	))}
    	</div>
    );
  }
}

export default NonPreppedLabels
