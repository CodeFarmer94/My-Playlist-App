import React from "react";
import Track from "../Track/Track";
import "./TrackList.css";

export default class TrackList extends React.Component {
  

  render() {
    const listOfSavedTracks = this.props.playlistTracks.map((track) => {
      return (
        <Track
          isRemoval={true}
          onRemove={this.props.onRemove}
          track={track}
          key={track.id}
          playlistTracks={this.props.playlistTracks}
          renderLoc={this.props.renderLoc}
        />
      );
    });

    const listOfSearchResults = this.props.searchResults.map((track) => {
      return (
        <Track
          isRemoval={true}
          onRemove={this.props.onRemove}
          onAdd={this.props.onAdd}
          track={track}
          key={track.id}
          playlistTracks={this.props.playlistTracks}
          renderLoc={this.props.renderLoc}
        />
      );
    });

    return (
      <div className="TrackList">
        {this.props.renderLoc === "Playlist" ? (
          <div className="TrackList-Saved">
            <h2>{this.props.playlistName}</h2>
            {listOfSavedTracks}
          </div>
        ) : (
          <div className="TrackList-Results">
           
            {listOfSearchResults}
          </div>
        )}
      </div>
    );
  }
}
