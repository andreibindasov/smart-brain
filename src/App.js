import React, { Component } from 'react';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import UserLinks from './components/UserLinks/UserLinks'
import './App.css';

const particlesOptions = {
  //customize this to your liking
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  },
  links:[],
  ranks: []
}


class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    this.loadRanking()
  }

  loadUser = (data) => {
    
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  loadLinks = (data) => {
    
    this.setState({links: data})
    
  }

  loadRanking = (data) => {
    // fetch('http://localhost:3333/ranking', {
    //     method: 'get',
    //     headers: {'Content-Type': 'application/json'}
    //   })
    //     .then(_response => _response.json())
    //     .then(ranking => {
    //       this.setState({ranks: ranking})
    //       console.log(this.state.ranks)
    // })
    this.setState({ranks: data})
  }

  calculateFaceLocations = (data) => {
    return data.outputs[0].data.regions.map(face=> {
      const clarifaiFace = face.region_info.bounding_box
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    });
  }

  displayFaceBoxes = (boxes) => {
    this.setState({boxes: boxes});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch('http://localhost:3333/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input,
          // boxes: this.state.boxes
        })
      })
      .then(response => response.json())
      .then(response => {
        this.displayFaceBoxes(this.calculateFaceLocations(response))
        if (response) {
         
          fetch('http://localhost:3333/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id,
              input: this.state.input,
              imageUrl: this.state.imageUrl,
              boxes: this.state.boxes
            })
          })
            .then(response => response.json())
            .then(count => {
              // console.log(typeof count)
              if (typeof count === 'object') {
                this.setState(Object.assign(this.state.user, { entries: count._entries}))
                this.setState(Object.assign(this.state.links, { links: count._links }))
                
                this.loadLinks(count._links)
              } else {
                this.setState(Object.assign(this.state.user, { entries: count}))
              }

              
              
            })
            .catch(console.log)

        }
        
      })
      .then(()=>{
        fetch('http://localhost:3333/ranking', {
            method: 'get',
            headers: {'Content-Type': 'application/json'}
          })
            .then(_response => _response.json())
            .then(ranking => {
              this.loadRanking(ranking)
              console.log(ranking)
        })
      })
    
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      return this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, route, boxes } = this.state;
    return (
      <div className="App">
         <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? <div className="user-i">
              <Logo/>
              <UserLinks
                // loadLinks={this.loadLinks}
                userLinks={this.state.links}
                userRanks={this.state.ranks} 
              />
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
            </div>
          : (
             route === 'signin'
             ? <Signin  loadRanking={this.loadRanking} loadUser={this.loadUser} loadLinks={this.loadLinks} onRouteChange={this.onRouteChange}/>
             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}

export default App;
