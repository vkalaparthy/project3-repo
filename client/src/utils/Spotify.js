import axios from "axios";
// import { useEffect } from 'react';
import qs from 'querystring';

// let accessToken;

const Spotify = {

  getAccessToken() {
    const clientId = '5835be81da724645ae63c6a6a496380e';
    const clientSecret = '0db64beaa6b846b2b70ea13414da9359';
    const token = btoa(`${clientId}:${clientSecret}`)
    const body = qs.stringify({ grant_type: 'client_credentials' });
    console.log(token);
    
    axios.post(
      'https://accounts.spotify.com/api/token',
      body,
      { headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${token}`
      },
      },
    ).then(res => res['access_token'])
  },

  search() {
    const accessToken = Spotify.getAccessToken();
    console.log("accesstoken: " + accessToken);
    // const baseurl = 'https://api.spotify.com/v1/search?query=thriller&type=track&offset=0&limit=20';
    // let baseurl = 'https://api.spotify.com/v1/search?q=year%3A2001&type=artist&market=US';
    let baseurl = 'https://api.spotify.com/v1/search?type=artist&q=Elvis&limit=5';
    // return fetch(`https://api.spotify.com/v1/search?type=artist&q=Elvis`, {
    return axios.get(baseurl, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      console.log("*************");
      console.log(response.data);
      return response.data;
    })
    // .then(jsonResponse => {
    //   // if (!jsonResponse.tracks) {
    //   //   return [];
    //   // }
    //   return jsonResponse.artists.items.map(item => ({
    //     id: item.id,
    //     name: item.name,
    //     artist: item.artists[0].name,
    //     album: item.album.name,
    //     uri: item.uri
    //   }));
    // });
  },

  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;
    return axios.post('https://api.spotify.com/v1/me', {headers: headers}
    ).then(response => response.json()
    ).then(jsonResponse => {
      userId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackUris})
        });
      });
    });
  }
};

export default Spotify;