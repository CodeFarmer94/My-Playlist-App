import "./SearchBar.css"
import React from "react"


export default class SearchBar extends React.Component{
    
    constructor(props){
        super(props)
        
        this.search = this.search.bind(this)
        this.handleTermChange = this.handleTermChange.bind(this)
    }
    
    handleTermChange(e){
        this.props.onSearchChange(e.target.value)
        
    }
    search(){
      return  this.props.onSearch(this.props.term)
    }
    render(){
        return(
            <div className="SearchBar">
            <input placeholder="Enter A Song, Album, or Artist" onChange = {this.handleTermChange}/>
            <button  onClick = {this.search} className="SearchButton">Search</button>
            </div>
        )
    }
}