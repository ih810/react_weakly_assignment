import React from "react";

export default class SearchBar extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            search: "",
        };
    }
    //why do we have to make two function??
    handleSearchChange = (e) => {
        this.props.onSearchChange(e.currentTarget.value);
        //isn't this the same as app.js onSearchChange
        //callback?
        this.setState({
            search: e.currentTarget.value,
        });
    };

    render() {
        return (
            <>
            <input
            type="text"
            value={this.state.search}
            //this has onChange already??
            onChange={this.handleSearchChange}
            />
            </>
        );
    }
}