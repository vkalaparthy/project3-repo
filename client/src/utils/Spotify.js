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

  async commonSpotifyCall(baseUrl, accessToken) {
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
      const baseurl = `https://api.spotify.com/v1/search?q=${searchObj.query}&type=${searchObj.type}`;

      console.log("baseurl: ", baseurl);

      return this.commonSpotifyCall(baseurl, accessToken);
    }
  },

  async topSongs(searchObj) {
    const value = searchObj.artistId;
    console.log(value);
    const accessToken = await Spotify.getAccessToken();
    console.log("accesstoken: " + accessToken);
    if(accessToken) {
      let baseurl = `https://api.spotify.com/v1/artists/${value}/top-tracks?market=US`;
    
      return this.commonSpotifyCall(baseurl, accessToken);
    }
  },

  async browse(searchObj) {
    const accessToken = await Spotify.getAccessToken();
    console.log("accesstoken: " + accessToken);
    
    if(accessToken) {
      let baseurl;
      console.log(searchObj.browseType);
      console.log(searchObj.artistId);
      
      if (searchObj.browseType === 'newReleases') {
        baseurl = `https://api.spotify.com/v1/browse/new-releases?country=US`;
      } else if (searchObj.artistId) {
        baseurl= `https://api.spotify.com/v1/albums/${searchObj.artistId}/tracks?market=US`;

      }
      // else {
      //   baseurl = `https://api.spotify.com/v1/browse/categories`;
      // }

      console.log("baseurl: ", baseurl);

      return this.commonSpotifyCall(baseurl, accessToken);
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
