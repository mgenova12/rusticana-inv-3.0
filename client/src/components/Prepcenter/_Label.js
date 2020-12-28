import React from "react";
import Barcode from 'react-barcode'

export class Label extends React.PureComponent {
  render() {
  	const { currentProduct } = this.props;

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

	    	<div>
		    	<h3><span> {currentProduct.product.name}</span> </h3>
		    	<h4> {new Date().toLocaleString()} </h4>
		    	<h4> CATEGORY: {currentProduct.product.category.name} </h4>
		    	<h4> DAYS TILL EXPIRE: {currentProduct.product.daysTillExpire} </h4>
		    	<h4><span> USE BY DATE:  ???</span></h4>
		    	<h4> POST THAW ____________________</h4>
          {currentProduct.product.category.name !== 'Dry' &&
            <h4>KEEP REFRIGERATED!</h4>
          }		    	
		    	<div className='barcode'> <Barcode value={currentProduct.product.barcode} height={25} margin={0} /> </div>
	    	</div>
    	</div>
    );
  }
}

export default Label