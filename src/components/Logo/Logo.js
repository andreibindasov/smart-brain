import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className='ma4 mt0 div-tilt'>
      <h3>SMART BRAIN APP</h3>
      {/* <div className="div-tilt"> */}
        <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
          <div className="Tilt-inner pa3">
            <img style={{paddingTop: '1rem'}} alt='logo' src={brain}/>
          </div>
        </Tilt>
      {/* </div> */}
    </div>
  );
}

export default Logo;