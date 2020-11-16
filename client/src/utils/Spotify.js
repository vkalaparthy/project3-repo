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
    if(accessToken) {
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
    }
  
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

    return axios.get("").then(response => {
      console.log("Fake response" + response);
      return {
        "artists": {
          "href": "https://api.spotify.com/v1/search?query=Elvis&type=artist&offset=0&limit=5",
          "items": [
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/43ZHCT0cAZBISjO8DG9PnE"
              },
              "followers": {
                "href": null,
                "total": 4773159
              },
              "genres": [
                "rock-and-roll",
                "rockabilly"
              ],
              "href": "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE",
              "id": "43ZHCT0cAZBISjO8DG9PnE",
              "images": [
                {
                  "height": 640,
                  "url": "https://i.scdn.co/image/5629fbf1c4e0bc4155eca3e08a2b98065eedd305",
                  "width": 640
                },
                {
                  "height": 320,
                  "url": "https://i.scdn.co/image/de7df722a14208c879f169e26bd7792a9902c7ba",
                  "width": 320
                },
                {
                  "height": 160,
                  "url": "https://i.scdn.co/image/11386c4abb5bdf71a86862cdb1a5390f37a7d8a5",
                  "width": 160
                }
              ],
              "name": "Elvis Presley",
              "popularity": 82,
              "type": "artist",
              "uri": "spotify:artist:43ZHCT0cAZBISjO8DG9PnE"
            },
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/1c22GXH30ijlOfXhfLz9Df"
              },
              "followers": {
                "href": null,
                "total": 527102
              },
              "genres": [
                "latin",
                "latin pop",
                "tropical"
              ],
              "href": "https://api.spotify.com/v1/artists/1c22GXH30ijlOfXhfLz9Df",
              "id": "1c22GXH30ijlOfXhfLz9Df",
              "images": [
                {
                  "height": 640,
                  "url": "https://i.scdn.co/image/d25e1ff043120abfb948a315efb0474196a25d5b",
                  "width": 640
                },
                {
                  "height": 320,
                  "url": "https://i.scdn.co/image/8457120b13f90229463b6d0b433a47dd9672d2d1",
                  "width": 320
                },
                {
                  "height": 160,
                  "url": "https://i.scdn.co/image/33b574d9b2a83c9ddc493dac2597ef8ec20342c4",
                  "width": 160
                }
              ],
              "name": "Elvis Crespo",
              "popularity": 69,
              "type": "artist",
              "uri": "spotify:artist:1c22GXH30ijlOfXhfLz9Df"
            },
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/2BGRfQgtzikz1pzAD0kaEn"
              },
              "followers": {
                "href": null,
                "total": 362495
              },
              "genres": [
                "art rock",
                "dance rock",
                "folk",
                "folk rock",
                "lilith",
                "mellow gold",
                "new wave pop",
                "permanent wave",
                "power pop",
                "pub rock",
                "rock",
                "roots rock",
                "singer-songwriter"
              ],
              "href": "https://api.spotify.com/v1/artists/2BGRfQgtzikz1pzAD0kaEn",
              "id": "2BGRfQgtzikz1pzAD0kaEn",
              "images": [
                {
                  "height": 640,
                  "url": "https://i.scdn.co/image/07778aa00bf13e1d2eab799c275ef9184885fee4",
                  "width": 640
                },
                {
                  "height": 320,
                  "url": "https://i.scdn.co/image/008d6f59610f3e7c85e0f5de84737d67b03bdf1e",
                  "width": 320
                },
                {
                  "height": 160,
                  "url": "https://i.scdn.co/image/fb89b4e4cda758ea720ee73ed3a87d7a876c14ce",
                  "width": 160
                }
              ],
              "name": "Elvis Costello",
              "popularity": 63,
              "type": "artist",
              "uri": "spotify:artist:2BGRfQgtzikz1pzAD0kaEn"
            },
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/4qmHkMxr6pTWh5Zo74odpH"
              },
              "followers": {
                "href": null,
                "total": 178877
              },
              "genres": [
                "art rock",
                "dance rock",
                "folk rock",
                "mellow gold",
                "new wave",
                "new wave pop",
                "power pop",
                "pub rock",
                "rock",
                "roots rock"
              ],
              "href": "https://api.spotify.com/v1/artists/4qmHkMxr6pTWh5Zo74odpH",
              "id": "4qmHkMxr6pTWh5Zo74odpH",
              "images": [
                {
                  "height": 640,
                  "url": "https://i.scdn.co/image/ab67616d0000b273121c38d2ab42b64a7ec09f9e",
                  "width": 640
                },
                {
                  "height": 300,
                  "url": "https://i.scdn.co/image/ab67616d00001e02121c38d2ab42b64a7ec09f9e",
                  "width": 300
                },
                {
                  "height": 64,
                  "url": "https://i.scdn.co/image/ab67616d00004851121c38d2ab42b64a7ec09f9e",
                  "width": 64
                }
              ],
              "name": "Elvis Costello & The Attractions",
              "popularity": 60,
              "type": "artist",
              "uri": "spotify:artist:4qmHkMxr6pTWh5Zo74odpH"
            },
            {
              "external_urls": {
                "spotify": "https://open.spotify.com/artist/5a31Ij1sTxY9LUYVwgBp8m"
              },
              "followers": {
                "href": null,
                "total": 80089
              },
              "genres": [
                "anti-folk",
                "asheville indie",
                "indie garage rock",
                "indie psych-pop",
                "indie rock",
                "shimmer psych",
                "small room"
              ],
              "href": "https://api.spotify.com/v1/artists/5a31Ij1sTxY9LUYVwgBp8m",
              "id": "5a31Ij1sTxY9LUYVwgBp8m",
              "images": [
                {
                  "height": 640,
                  "url": "https://i.scdn.co/image/a9ee71f1c5522f21fd4e7328602fc0f508b709f2",
                  "width": 640
                },
                {
                  "height": 320,
                  "url": "https://i.scdn.co/image/ec6b7eea16ed13f0d41feef67293dbef9d94b5e0",
                  "width": 320
                },
                {
                  "height": 160,
                  "url": "https://i.scdn.co/image/045b76f98d68168b6c31230603104510c00c3912",
                  "width": 160
                }
              ],
              "name": "Elvis Depressedly",
              "popularity": 49,
              "type": "artist",
              "uri": "spotify:artist:5a31Ij1sTxY9LUYVwgBp8m"
            }
          ],
          "limit": 5,
          "next": "https://api.spotify.com/v1/search?query=Elvis&type=artist&offset=5&limit=5",
          "offset": 0,
          "previous": null,
          "total": 750
        }
      }  
    })
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