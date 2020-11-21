import axios from "axios";
// import { useEffect } from 'react';
import qs from 'querystring';

const Spotify = {

  getAccessToken() {
    const clientId = '';
    const clientSecret = '';
    const token = btoa(`${clientId}:${clientSecret}`)
    const body = qs.stringify({ grant_type: 'client_credentials' });
    console.log(token);
    
    return axios.post(
      'https://accounts.spotify.com/api/token',
      body,
      { headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${token}`
      },
      },
    ).then(res => {
      console.log(res.data['access_token']);
      return res.data['access_token'] })
  },

  async search(searchObj) {
    const accessToken = await Spotify.getAccessToken();
    console.log("accesstoken: " + accessToken);
    
    if(accessToken) {
      // let baseurl = 'https://api.spotify.com/v1/search?type=artist&q=Elvis&limit=5';
      let baseurl;
      let query = searchObj.query;
      
      if (searchObj.type === 'artist') {
        baseurl = `https://api.spotify.com/v1/search?q=${query}&type=artist`;
      } else {
        baseurl = `https://api.spotify.com/v1/search?q=${query}&type=track`;
      }

      console.log("baseurl: ", baseurl);

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
    }
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
