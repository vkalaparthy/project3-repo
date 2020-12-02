import axios from "axios";
import qs from 'querystring';

const Spotify = {

  getAccessToken() {
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

    const token = btoa(`${clientId}:${clientSecret}`);
    const body = qs.stringify({ grant_type: 'client_credentials' });
    
    return axios.post(
      'https://accounts.spotify.com/api/token',
      body,
      { headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${token}`
      },
      },
    ).then(res => {
      return res.data['access_token'] })
  },

  async commonSpotifyCall(baseUrl, accessToken) {
    const response = await axios.get(baseUrl, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    });
    return response.data;
  },

  async search(searchObj) {
    const accessToken = await Spotify.getAccessToken();
    
    if(accessToken) {
      const baseurl = `https://api.spotify.com/v1/search?q=${searchObj.query}&type=${searchObj.type}`;

      return this.commonSpotifyCall(baseurl, accessToken);
    }
  },

  async topSongs(searchObj) {
    const value = searchObj.artistId;
    const accessToken = await Spotify.getAccessToken();
    if(accessToken) {
      let baseurl = `https://api.spotify.com/v1/artists/${value}/top-tracks?market=US`;
    
      return this.commonSpotifyCall(baseurl, accessToken);
    }
  },

  async browse(searchObj) {
    const accessToken = await Spotify.getAccessToken();
    
    if(accessToken) {
      let baseurl;
      
      if (searchObj.browseType === 'newReleases') {
        baseurl = `https://api.spotify.com/v1/browse/new-releases?country=US`;
      } else if (searchObj.artistId) {
        baseurl= `https://api.spotify.com/v1/albums/${searchObj.artistId}/tracks?market=US`;

      }
      return this.commonSpotifyCall(baseurl, accessToken);
    }
  }
};

export default Spotify;
