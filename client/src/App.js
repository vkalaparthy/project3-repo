import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginForm from './pages/Auth/LoginForm';
import SignupForm from './pages/Auth/SignupForm';
import SignupFailed from './pages/Auth/SignupFailed';
import Nav from "./components/Nav";
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import Artists from './pages/Artists';
import Tracks from './pages/Tracks';
import NewReleases from './pages/NewReleases';
import BrowseCategories from './pages/BrowseCategories';

import { ArtistsContext } from '../../client/src/utils/ArtistsContext';
import { TracksContext } from '../../client/src/utils/TracksContext';
import { NewReleasesContext } from './utils/NewReleasesContext';
import { BrowseCategContext } from './utils/BrowseCategContext';
import { PlaylistContext } from './utils/PlaylistContext';
import AUTH from './utils/AUTH';
import API from './utils/API';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [artistInfoArray, setArtistInfoArray]  = useState([]);
  const [tracksInfoArray, setTracksInfoArray] = useState([]);
  const [newReleasesArray, setNewReleasesArray] = useState([]);
  const [browseCategArray, setBrowseCategArray] = useState([]);
  const [playlistArray, setPlaylistArray] = useState([]);
  
  useEffect(() => {
    AUTH.getUser().then(response => {
        // console.log(response.data);
        console.log("+++++++++++++++");
        // console.log(response.data);
        if (response.data.user) {
          console.log("+++++++++++++++");
          console.log(response.data.user._id);
          setLoggedIn(true);
          setUser(response.data.user);
          API.getSongs().then(res => {
            console.log("+++++++++++++++");
            console.log(res.data);
            setPlaylistArray(res.data);
          })
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
      console.log("*************");
      console.log(response.data.user.playlist);
      if (response.status === 200) {
        // update the state
        setLoggedIn(true);
        setUser(response.data.user);
        setPlaylistArray(response.data.user.playlist);
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
              <NewReleasesContext.Provider value={{newReleasesArray, setNewReleasesArray}}>
              <BrowseCategContext.Provider value={{browseCategArray, setBrowseCategArray}}>
              <PlaylistContext.Provider value={{playlistArray, setPlaylistArray}}>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/Search" component={Search} />
                <Route exact path="/artists" component={Artists} />
                <Route exact path="/tracks" component={Tracks} />
                <Route exact path="/newreleases" component={NewReleases} />
                <Route exact path="/categories" component={BrowseCategories} />
              </PlaylistContext.Provider>
              </BrowseCategContext.Provider>
              </NewReleasesContext.Provider>
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