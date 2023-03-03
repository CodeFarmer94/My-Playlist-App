


const Spotify = {};

let accessToken = '';

Spotify.getAccessToken = () => {
  if (accessToken) {
    return Promise.resolve(accessToken);
  }

  const url = window.location.href;
  const tokenMatch = url.match(/access_token=([^&]*)/);
  const expiresMatch = url.match(/expires_in=([^&]*)/);
  if (tokenMatch && expiresMatch) {
    accessToken = tokenMatch[1];
    const expiresIn = Number(expiresMatch[1]);
    // Set the access token to expire in expiresIn seconds
    window.setTimeout(() => accessToken = '', expiresIn * 1000);
    // Clear the URL parameters for security reasons
    window.history.pushState('Access Token', null, '/');
    return Promise.resolve(accessToken);


    
  } else {
    const clientId = 'd34a6d197e1d4570a125bed82c842f74';
    const redirectUri = "http://localhost:3000/callback/";
    const scope = 'playlist-modify-public';
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scope}`;

    return new Promise((resolve, reject) => {
      
      window.location = authUrl;
      window.addEventListener('popstate', () => {
        if (accessToken) {
          resolve(accessToken);
        } else {
          reject(new Error('Failed to obtain access token'));
        }
      });
    });
  }
};
Spotify.search = async function(searchTerm) {
    const accessToken = await Spotify.getAccessToken();
    console.log(accessToken)
    const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  
    if (!response.ok) {
      throw new Error('Request failed');
    }
  
    const jsonResponse = await response.json();
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
  }
  
  Spotify.savePlaylist = async function(playlistName, trackURIs) {
    if (!playlistName || !trackURIs.length) {
      return;
    }
  
    const accessToken = await Spotify.getAccessToken();
    const headers = {Authorization : `Bearer ${accessToken}`};
  
    let userId;
  
    try {
      const response = await fetch('https://api.spotify.com/v1/me', { headers });
      if (response.ok) {
        const data = await response.json();
        userId = data.id;
      } else {
        throw new Error('Failed to get user ID');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      return;
    }
  
    let playlistId;
  
    try {
      const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: {...headers, 'Content-Type': 'application/json'},
        body: JSON.stringify({name: playlistName})
      });
  
      if (response.ok) {
        const data = await response.json();
        playlistId = data.id;
      } else {
        throw new Error('Failed to create playlist');
      }
    } catch (error) {
      console.error('Error creating playlist:', error);
      return;
    }
  
    try {
      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: {...headers, 'Content-Type': 'application/json'},
        body: JSON.stringify({uris: trackURIs})
      });
  
      if (!response.ok) {
        throw new Error('Failed to add tracks to playlist');
      }
    } catch (error) {
      console.error('Error adding tracks to playlist:', error);
      return;
    }
  };
  Spotify.getCurrentUserId = async function() {
    if (Spotify.userId) {
      return Promise.resolve(Spotify.userId);
    }
    
    const accessToken = await Spotify.getAccessToken();
    console.log(accessToken)
    const headers = { Authorization: `Bearer ${accessToken}` };
  
    try {
      const response = await fetch('https://api.spotify.com/v1/me', { headers });
      if (response.ok) {
        const data = await response.json();
        Spotify.userId = data.id;
        return Promise.resolve(Spotify.userId);
      } else {
        throw new Error('Failed to get user ID');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      return Promise.reject(error);
    }
  };
  Spotify.getUserPlaylists = async function() {
    const accessToken = await Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
  
    // Get the user ID
    const userId = await Spotify.getCurrentUserId();
  
    let playlists = [];
  
    try {
      const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, { headers });
  
      if (response.ok) {
        const data = await response.json();
        playlists = data.items.map(playlist => ({
          id: playlist.id,
          name: playlist.name,
        }));
      } else {
        throw new Error('Failed to retrieve user playlists');
      }
    } catch (error) {
      console.error('Error fetching user playlists:', error);
    }
  
    return playlists;
  };
  Spotify.getPlaylist = async function(id) {
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
  
    // Get the user ID
    const userId = await Spotify.getCurrentUserId();
  
    let tracks = [];
  
    try {
      const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${id}/tracks`, { headers });
  
      if (response.ok) {
        const data = await response.json();
        tracks = data.items.map(item => ({
          id: item.track.id,
          name: item.track.name,
          artist: item.track.artists[0].name,
          album: item.track.album.name,
          uri: item.track.uri
        }));
      } else {
        throw new Error('Failed to retrieve playlist tracks');
      }
    } catch (error) {
      console.error('Error fetching playlist tracks:', error);
    }
  
    return tracks;
  };
export default Spotify;