import React from "react"
import "./ListOfPlaylist.css"
import ItemOfListOfPlaylist from "../ItemOfListOfPlaylist/ItemOfListOfPlaylist"

export default class ListOfPlaylist extends React.Component{


    render(){

        const ListOfPlaylistArr = this.props.playlistArray.map(item=> <ItemOfListOfPlaylist getPlaylist = {
            this.props.getPlaylist} id={item.id} key={item.id} name= {item.name}/>)
      
            return(
                <div className="playlists-container ListOfPlaylist">
                    <h2 className="box-heading">Saved Playlists</h2>
                    {ListOfPlaylistArr}</div>
            )
    }
}