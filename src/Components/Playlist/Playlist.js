import "./Playlist.css"
import React from "react"
import TrackList from "../TrackList/TrackList"
export default class Playlist extends React.Component{
   constructor(props){
    super(props)
    this.handleNameChange = this.handleNameChange.bind(this)
   }
    handleNameChange(e){
        this.props.onNameChange(e.target.value)
        
    }

render(){
   
    return(
          <div className="Playlist">
        <h2 className = "box-heading">Create new Playlist</h2>
  <input onChange = {this.handleNameChange} defaultValue={"Enter Name"}/>
    <TrackList  onRemove= {this.props.onRemove} isRemoval= {true} 
     searchResults = {this.props.searchResults} 
     playlistTracks = {this.props.playlistTracks}
     renderLoc = "Playlist"/>
  <button className="Playlist-save" onClick = {this.props.onSave}>Save to Spotify</button>
</div>
    )
}
  
}