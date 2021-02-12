import React from 'react'
import './UserLinks.css';

const UserLinks = ({ userLinks, userRanks }) => {
    return (
      <div>
        <div className='white f1 user-link'>
          {userLinks.map(userLink=> {
              return <img className="pointer dim user-link__image" alt='ImageLink' key={userLink.link} src={userLink.link}/>
          })}
        </div>
        <div className='white f1 user-link'>
          Current Standing:
        </div>
      </div>
    );
}

export default UserLinks