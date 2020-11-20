import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginForm from './pages/Auth/LoginForm';
import SignupForm from './pages/Auth/SignupForm';
import SignupFailed from './pages/Auth/SignupFailed';
import Nav from "./components/Nav";
import Dashboard from './pages/Dashboard';
import Artists from './pages/Artists';
import Tracks from './pages/Tracks';
import { ArtistsContext } from '../../client/src/utils/ArtistsContext';
import { TracksContext } from '../../client/src/utils/TracksContext';
import AUTH from './utils/AUTH';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [artistInfoArray, setArtistInfoArray]  = useState([]);
  const [tracksInfoArray, setTracksInfoArray] = useState([]);
  
  useEffect(() => {
    AUTH.getUser().then(response => {
        // console.log(response.data);
        if (response.data.user) {
          setLoggedIn(true);
          setUser(response.data.user);
        } else {
          setLoggedIn(false);
          setUser(null);
        }
      });
      return () => {
        setLoggedIn(false);
        setUser(null);
      };
  }, []);
    const logout = (event) => {
    event.preventDefault();
    
        AUTH.logout().then(response => {
            // console.log(response.data);
            if (response.status === 200) {
                setLoggedIn(false);
        setUser(null);
            }
        });
    };
    const login = (username, password) => {
        AUTH.login(username, password).then(response => {
      console.log(response.data);
      if (response.status === 200) {
        // update the state
        setLoggedIn(true);
        setUser(response.data.user);
      }
    });
    };
  return (
    <div className="App">
      { loggedIn && (
        <div>
          <Nav user={user} logout={logout}/>
          <div className="main-view">
            <Switch>
              <ArtistsContext.Provider value={{artistInfoArray, setArtistInfoArray}}>
              <TracksContext.Provider value={{tracksInfoArray, setTracksInfoArray}}>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/artists" component={Artists} />
                <Route exact path="/tracks" component={Tracks} />
              </TracksContext.Provider>
              </ArtistsContext.Provider>
            </Switch>
          </div>
        </div>
      )}
      { !loggedIn && (
        <div className="auth-wrapper" style={{paddingTop:40}}>
          <Route exact path="/" component={() => <LoginForm login={login}/>} />
          <Route exact path="/books" component={() => <LoginForm user={login} />} />
          <Route exact path="/signup" component={SignupForm} />
          <Route exact path="/signupfailed" component={SignupFailed} />
        </div>
      )}
    </div>
  );
}
export default App;