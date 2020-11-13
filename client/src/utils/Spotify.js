import axios from "axios";

var SpotifyWebApi = require('spotify-web-api-node');
 
// credentials are optional
// var spotifyApi = new SpotifyWebApi({
//   clientId 
//   clientSecret 
//   redirectUri 
// });

let accessToken;

const Spotify = {
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
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_url}`;
      window.location = accessUrl;
    }
  },

  search() {
    const accessToken = Spotify.getAccessToken();
    console.log("accesstoken: "+ accessToken);
    const baseurl = 'https://api.spotify.com/v1/search?query=thriller&type=track&offset=0&limit=20';
    // let baseurl = 'https://api.spotify.com/v1/search?q=year%3A2001&type=artist&market=US';
    // let baseurl = 'https://api.spotify.com/v1/search?type=artist&q=Elvis';
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

    return fetch('https://api.spotify.com/v1/me', {headers: headers}
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

// getAccessToken() {
//   if (accessToken) {
//     return accessToken;
//   }
//   const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
//   const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
//   if (accessTokenMatch && expiresInMatch) {
//     accessToken = accessTokenMatch[1];
//     const expiresIn = Number(expiresInMatch[1]);
//     window.setTimeout(() => accessToken = '', expiresIn * 1000);
//     window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
//     return accessToken;
//   } else {
  
//     const accessUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=http://localhost:3000`;
//     window.location = accessUrl;
//   }
// },

// spotifyApi.setAccessToken(getAccessToken),

// getSpotify: function() {
//   return (
//     spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
//       function(data) {
//         console.log('Artist albums', data.body);
//       },
//       function(err) {
//         console.error(err);
//       }
//     )
//   )
  // works for trivia
  // return axios.get("https://opentdb.com/api_category.php");

  // return axios.get("https://api.musixmatch.com/ws/1.1/track.search?q_artist=justin%20bieber&page_size=3&page=1&s_track_rating=desc&apikey=be1cc81a929deed72d0e35af66a44251")

  // return (
    // +++++++++++++++++++++  Musixmatch
    // const BASEURL = "http://api.musixmatch.com/ws/1.1/track.search?q_artist=justin bieber&page_size=3&page=1&s_track_rating=desc";
    // const APIKEY = "apikey=be1cc81a929deed72d0e35af66a44251";
    // return axios.get(BASEURL + APIKEY);
      
      // "http://api.musixmatch.com/ws/1.1/track.search?q_artist=justin bieber&page_size=3&page=1&s_track_rating=desc&apikey=be1cc81a929deed72d0e35af66a44251");

    // ++++++++++++++++++++++++++++++++
    // return axios.get('/api/music');
    //   fetch("https://accounts.spotify.com/authorize?client_id=5835be81da724645ae63c6a6a496380e&response_type=code&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email&state=34fFs29kd09", {
    //     method: "GET",
    //     headers: {
    //       Authorization: `Bearer ${userAccessToken}`     
    //     }
    //   })
    //   .then(response => response.json())
    // )
    // .then(({beats})) => {
    //   beats.forEach((beat, index) => {
    //     console.log(`Beat ${index} starts at ${beat.start}`);
    //   })
    // }
  // );
  // const baseUrl = ""
  // return axios.get(baseUrl+APIKEY)
// }