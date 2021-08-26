import React from "react";

export default class LinkList extends React.Component {
    render(){
        return (
        <>
        {/* use props cuz its refering to the app.js's state */}
        {this.props.links && this.props.links.length > 0 ? (
            //use map here so we dont chane props(immutable)
            this.props.links.map((link, i) => (
                //first map to map through all links
                <div key={i}>
                    <br/>
                    <a href={link.url}>{link.name}</a>
                    <br/>
                    {link.tags && link.tags.length > 0 ? (
                        link.tags.map((tag, j) => 
                        //secpmd ,map to map through all tags
                        <span key={j}>{tag.name}</span>
                        )
                    ):(
                        //if no tag the show this
                        <p>Please add some tags</p>
                    )}
                </div>
            ))
            ) : (
                //if no link then show this
                <p>please add some links</p>
            )
        }
        </>
        )
    }
}