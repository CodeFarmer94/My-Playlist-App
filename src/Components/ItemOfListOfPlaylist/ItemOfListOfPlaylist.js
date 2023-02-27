import React from "react"
import "./ItemOfListOfPlaylist.css"
export default class ItemOfListOfPlaylist extends React.Component{

    constructor(props){
        super(props)
        this.handleGetPlaylist = this.handleGetPlaylist.bind(this)
    }

    handleGetPlaylist(e){
        this.props.getPlaylist(e.target.id)
    }
    render(){
        return <div><p className="playlist-name" onClick = {this.handleGetPlaylist}id={this.props.id}>{this.props.name}</p></div>
    }
}