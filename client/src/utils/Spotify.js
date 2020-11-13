import axios from "axios";

// var SpotifyWebApi = require('spotify-web-api-node');
 
// credentials are optional
// var spotifyApi = new SpotifyWebApi({
  // clientId 
  // clientSecret 
  // redirectUri 
// });

let accessToken;

const Spotify = {
  // let clientId = {process.env.CLIENT_ID};

  // redirectUri: process.env.REDIRECT_URI,

  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=http://localhost:3000/`;
      window.location = accessUrl;
    }
  },

  search() {
    const accessToken = Spotify.getAccessToken();
    console.log("accesstoken: "+ accessToken);
    // const baseurl = 'https://api.spotify.com/v1/search?query=thriller&type=track&offset=0&limit=20';
    // let baseurl = 'https://api.spotify.com/v1/search?q=year%3A2001&type=artist&market=US';
    let baseurl = 'https://api.spotify.com/v1/search?type=artist&q=Elvis';
    // return fetch(`https://api.spotify.com/v1/search?type=artist&q=Elvis`, {
    return axios.get(baseurl, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      console.log("*************");
      console.log(response.data);
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    });
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