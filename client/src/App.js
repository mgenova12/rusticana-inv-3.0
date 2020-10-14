import React, {useEffect} from 'react';
import { Routes } from './routes'
import { Navbar } from './navbar'


function App() {

  return (
    <div>
	    <React.Fragment>
		    <Navbar />
      	<Routes />
      </React.Fragment>	

    </div>
  );
}

export default App;
