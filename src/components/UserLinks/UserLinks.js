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
        <div className='white ranking-table'>
          Current Standing:
          
          {userRanks ? userRanks.map(userRank=> {
            return (<table key= {userRanks.indexOf(userRank)}>
                      <tr>
                        <td>{userRanks.indexOf(userRank)+1}</td>
                        <td>{userRank.name}</td>
                        <td>{userRank.entries}</td>
                      </tr>
                      
                    </table>)
          }) : 
            <hr></hr>
          }
          {/* <span>{userRanks}</span> */}
        </div>
      </div>
    );
}

export default UserLinks