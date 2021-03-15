import React from 'react'
import './UserLinks.css';

const UserLinks = ({ name, userLinks, userRanks }) => {
    return (
      <div>
        
        <div className='white ranking-table'>
          TOP LEADERS:
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th className="td-name">User</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody id="scrollable">
            {userRanks ? userRanks.map(userRank=> {

              return (
                        <tr key= {userRanks.indexOf(userRank)}
                            className={name===userRank.name ? "__show" : ""}>
                          <td>{userRanks.indexOf(userRank)+1}</td>
                          <td className="td-name">{userRank.name}</td>
                          <td>{userRank.entries}</td>
                        </tr>
                    )
          }) : 
            <tr>
              <td></td>
              <td className="td-name">NO DATA YET</td>
              <td></td>
            </tr>
          }

            </tbody>
            <tfoot>
              <tr id="borderTop"></tr>
            </tfoot>
          </table>
          {/* <span>{userRanks}</span> */}
        </div>
        <div className='white f1 user-link'>
          {userLinks.map(userLink=> {
              return <img className="pointer user-link__image" alt='ImageLink' key={userLink.link} src={userLink.link}/>
          })}
        </div>
      </div>
    );
}

export default UserLinks




// class Test3 extends Component{
//   state = {
//       loading: true,
//       coordinates: null,
//   }
//   intervalId = null;

//   fetchData = async () => {
//    const url = "https://ttr.vsbbn.nl:4000/gps_history?team_id=10";
//       const response = await fetch(url);
//       const data = await response.json();

//       this.setState({coordinates: data, loading: false });
//   }

//   async componentDidMount(){
//    await this.fetchData();

//    this.intervalId = setInterval(() => {
//       this.fetchData();
//    }, 1000 * 60)
//   }

//   componentWillUnmount() {
//     clearInterval(this.intervalId)
//   }

//   render(){
//       const { loading, coordinates } = this.state
//       return(
//           <div>
//               {loading || !coordinates ? (
//                   <div>loading...</div>
//               ) : (
//                   <div>
//                       {coordinates.map((coordinate, index) => {
//                            return (
//                              <div key={index}>
//                                   <p>Longitute: {coordinate.lon}</p>
//                                   <p>Latitude: {coordinate.lat}</p>
//                                   <p>Time: {coordinate.timestamp}</p>
//                                   <p>...............</p>
//                              </div> 
//                            )
//                        })}
//                   </div>
//               )}
//           </div>
//       )
//   }
// }