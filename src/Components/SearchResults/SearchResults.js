import "./SearchResults.css"
import React from "react"
import TrackList from "../TrackList/TrackList"


export default class SearchResults extends React.Component{
   

    render(){
        
   
        return( <div className="SearchResults">
        <h2 className= "box-heading">Search Results</h2>
        <TrackList
        searchResults = {this.props.searchResults} 
        playlistTracks = {this.props.playlistTracks}
        onAdd = {this.props.onAdd} 
        isRemoval = {false} 
        renderLoc = "SearchResults"/>
</div>)
       
    }
}