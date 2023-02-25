
import './App.css';
import React from "react"
import SearchBar from './SearchBar/SearchBar';
import SearchResults from './SearchResults/SearchResults';
import Playlist from './Playlist/Playlist';
import Spotify from './util/Spotify'

export class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {searchResults: [{album: "Album",
    artist: "Artist",
    id: "",
    name: "Search the Spotify Database and save tracks in a playlist.",
    uri: ""

    }],
                  playlistName: "MyPlaylist",
                  playlistTracks: [],
                  term: ""
                  
                }
                
      this.addTrack = this.addTrack.bind(this)
      this.removeTrack = this.removeTrack.bind(this)
      this.updatePlaylistName = this.updatePlaylistName.bind(this)
      this.savePlaylist = this.savePlaylist.bind(this)
      this.search = this.search.bind(this)
      this.updateSearchTerm = this.updateSearchTerm.bind(this)
      this.savePlaylist = this.savePlaylist.bind(this)
  }

  async componentDidMount() {
    const searchResults = await Spotify.search('');
    this.setState({ searchResults });
  }
  
   async search(string){
    const searchResults = await Spotify.search(string);
    this.setState({ searchResults })
    
    }
   
  savePlaylist() {
  const trackArr = this.state.playlistTracks;
  const trackURIs = trackArr.map(track => track.uri);
  const playlistName = this.state.playlistName;
  Spotify.savePlaylist(playlistName, trackURIs);
  this.setState({playlistTracks:[]})
}
  updateSearchTerm(string){
    this.setState({term: string })

  }
  updatePlaylistName(name){
    this.setState({playlistName: name})
  }
  addTrack(track){
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;}
      const newPlaylist = this.state.playlistTracks
      newPlaylist.push(track)
      this.setState({playlistTracks: newPlaylist})
  }
  removeTrack(track){
    
    const newList = this.state.playlistTracks.filter(item=> {
      return item.id !== track.id
    })
    
    this.setState({playlistTracks:newList})
  }
  render()
  
  {return (
    
       <div className="App">
    <h1>Ja<span className="highlight">mmm</span>ing</h1>
    
    <SearchBar onSearch = {this.search} term = {this.state.term} onSearchChange = {this.updateSearchTerm}/>
      <div className="App-playlist">
        <SearchResults   onAdd = {this.addTrack} searchResults = {this.state.searchResults} playlistTracks = {this.state.playlistTracks}/>
        <Playlist  onNameChange = {this.updatePlaylistName}onRemove = {this.removeTrack} playlistName = {this.state.playlistName} playlistTracks =
        {this.state.playlistTracks} searchResults = {this.state.searchResults} onSave = {this.savePlaylist}/>
      </div>
    </div>
 
  );}
  
}

export default App;
