import React from 'react';

const QuickOrderSuccess = ({...props}) => {

  return (
    <div className="center">
      <div>
        <i style={{color: "#9ABC66", fontSize: 100}} className="checkmark">✓</i>
      </div>

      <h1>Success</h1> 
      <p>Your Quick Order has been submitted<br/> we'll be in touch shortly!</p>
    </div>
  )
}

export default QuickOrderSuccess
