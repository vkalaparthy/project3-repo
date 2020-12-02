import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginForm from './pages/Auth/LoginForm';
import SignupForm from './pages/Auth/SignupForm';
import SignupFailed from './pages/Auth/SignupFailed';
import Navigation from "./components/Nav";
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import NewReleases from './pages/NewReleases';
import ReactNotifications from 'react-notifications-component';
import { ArtistsContext } from '../../client/src/utils/ArtistsContext';
import { TracksContext } from '../../client/src/utils/TracksContext';
import { NewReleasesContext } from './utils/NewReleasesContext';
import { AlbumContext } from './utils/AlbumContext';
import { PlaylistContext } from './utils/PlaylistContext';
import AUTH from './utils/AUTH';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [artistInfoArray, setArtistInfoArray]  = useState([]);
  const [tracksInfoArray, setTracksInfoArray] = useState([]);
  const [newReleasesArray, setNewReleasesArray] = useState([]);
  const [playlistArray, setPlaylistArray] = useState([]);
  const [albumImage, setAlbumImage] = useState([]);
  
  useEffect(() => {
    AUTH.getUser().then(response => {
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
            if (response.status === 200) {
              setLoggedIn(false);
              setUser(null);
            }
        });
    };
    const login = (username, password) => {
      AUTH.login(username, password).then(response => {
        if (response.status === 200) {
          setLoggedIn(true);
          setUser(response.data.user);
          setPlaylistArray(response.data.user.playlist);
        }
      })
      .catch(err => {
        setLoggedIn(false);
        console.log("Could not login" + err);
      });
    };
  return (
    <div className="App">
      { loggedIn && (
        <div>
          <Navigation user={user} logout={logout}/>
          <div className="main-view">
            <ReactNotifications types={[{
              htmlClasses: ['notification__item--awesome'],
              name: 'awesome'
            }]}/>
            <Switch>
              <ArtistsContext.Provider value={{artistInfoArray, setArtistInfoArray}}>
              <TracksContext.Provider value={{tracksInfoArray, setTracksInfoArray}}>
              <NewReleasesContext.Provider value={{newReleasesArray, setNewReleasesArray}}>
              <AlbumContext.Provider value={{albumImage, setAlbumImage}}>
              <PlaylistContext.Provider value={{playlistArray, setPlaylistArray}}>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/search" component={Search} />
                <Route exact path="/newreleases" component={NewReleases} />
              </PlaylistContext.Provider>
              </AlbumContext.Provider>
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
          <Route exact path="/signup" component={SignupForm} />
          <Route exact path="/signupfailed" component={SignupFailed} />
        </div>
      )}
    </div>
  );
}
export default App;