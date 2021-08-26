//Basic React Setup
import './App.css';
import React from 'react';

//import component from other js file
import LinkList from './Component/LinkList';
import AddButton from "./Component/AddButton";
import SearchBar from "./Component/SearchBar";

//class based component
export default class App extends React.Component {
  //called before mount
  constructor(props) {
    super(props);

    //getting all the data from local storage
    const storedLinks = localStorage.getItem("links");
    //if nothing in storedLinks, return empty array, if not, parse the thing
    const parsedLinks = storedLinks === "" || storedLinks === null ? [] : JSON.parse(storedLinks);

    //if parsedLink is an array, take parsed link, if not, make empty array
    this.state = {
      links: Array.isArray(parsedLinks) ? parsedLinks : [],
      search: "",
    };
  }

  onSearchChange = (search) => {
    this.setState({
      search,
    });
  }

  onAddButtonAddLink = (name, url, tags) => {
    //concat new data to existing state
    const newLinks = this.state.links.concat([{name, url, tags}]);
    this.setState({
      links: newLinks,
    });
    //update local storage
    localStorage.setItem("links", JSON.stringify(newLinks));
  };

  render() {
    //before return, turn all the shit into lower case cuz computer smart
    const lowerSearch = this.state.search.toLowerCase();
    //this is search function
    const filteredLinks = this.state.links.filter((link) => {
      return (
        link.name.toLowerCase().indexOf(lowerSearch) > -1 ||
        link.url.toLowerCase().indexOf(lowerSearch) > -1 ||
        link.tags.map((tag)=>{
          return tag.name.toLowerCase().indexOf(lowerSearch) > -1;
        })
        .indexOf(true) > -1
      );
    });

    return(
      <div className="container-fluid">
        <div className="row">
          <div className="col-4 left-panel centered">
            <p>Retard Programmer</p>
            <br />
            <p>Links: {this.state.links.length}</p>
            <AddButton onAddLink={this.onAddButtonAddLink}/>
          </div>
          <div className="col-8 right-panel centered">
            <h4>Search in stored links:</h4>
            {/* why make 2? */}
            <SearchBar onSearchChange={this.onSearchChange}/>
            <h4>Links for: {this.state.search}</h4>
            <LinkList links={filteredLinks}/>
          </div>
        </div>
      </div>
    )
  }
}

