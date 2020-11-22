import axios from "axios";
// import { useEffect } from 'react';
import qs from 'querystring';

const Spotify = {

  getAccessToken() {
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
    // console.log("+++++++++++++++")
    // console.log(clientId);
    // console.log(clientSecret);
    const token = btoa(`${clientId}:${clientSecret}`);
    const body = qs.stringify({ grant_type: 'client_credentials' });
    // console.log(token);
    
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

  async commonSpoitifyCall(baseUrl, accessToken) {
    const response = await axios.get(baseUrl, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    });
    console.log("*************");
    console.log(response.data);
    return response.data;
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

      return this.commonSpoitifyCall(baseurl, accessToken);
    }
  },

  async topSongs(searchObj) {
    const value = searchObj.artistid;
    console.log(value);
    const accessToken = await Spotify.getAccessToken();
    console.log("accesstoken: " + accessToken);
    if(accessToken) {
      let baseurl = `https://api.spotify.com/v1/artists/${value}/top-tracks?market=US`;
    
      return this.commonSpoitifyCall(baseurl, accessToken);
    }
  },

  async browse(searchObj) {
    const accessToken = await Spotify.getAccessToken();
    console.log("accesstoken: " + accessToken);
    
    if(accessToken) {
      // let baseurl = 'https://api.spotify.com/v1/search?type=artist&q=Elvis&limit=5';
      let baseurl;
      let browseType = searchObj.browseType;
      
      if (browseType === 'newReleases') {
        baseurl = `https://api.spotify.com/v1/browse/new-releases?country=US`;
      } else {
        baseurl = `https://api.spotify.com/v1/browse/categories`;
      }

      console.log("baseurl: ", baseurl);

      return this.commonSpoitifyCall(baseurl, accessToken);
    }
  }

  // savePlaylist(name, trackUris) {
  //   if (!name || !trackUris.length) {
  //     return;
  //   }
  //   const accessToken = Spotify.getAccessToken();
  //   const headers = { Authorization: `Bearer ${accessToken}` };
  //   let userId;
  //   return axios.post('https://api.spotify.com/v1/me', {headers: headers}
  //   ).then(response => response.json()
  //   ).then(jsonResponse => {
  //     userId = jsonResponse.id;
  //     return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
  //       headers: headers,
  //       method: 'POST',
  //       body: JSON.stringify({name: name})
  //     }).then(response => response.json()
  //     ).then(jsonResponse => {
  //       const playlistId = jsonResponse.id;
  //       return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
  //         headers: headers,
  //         method: 'POST',
  //         body: JSON.stringify({uris: trackUris})
  //       });
  //     });
  //   });
  // }
};

export default Spotify;
