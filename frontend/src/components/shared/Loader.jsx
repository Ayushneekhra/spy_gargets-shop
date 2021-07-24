import React from "react";
//import { Spinner } from "react-bootstrap";
import { MDBSpinner } from 'mdb-react-ui-kit';
 

const Loader = () => {
  return (
    <>

      <MDBSpinner grow style={{ width: '2px', height: '2px' , padding: "50% 50%", display: "flex",
          justifyContent: "center",
          alignItems: "center"}}>
        <span className='visually-hidden'>.</span>
      </MDBSpinner>
    </>
  );
};

export default Loader;


