import React from "react";

class GroupTitile extends React.Component {

    render() {


        return (
            <div className="entry-post-title">
                <span> <h4 className="post-title">{this.props.title}</h4></span>
            </div>
        )
    }
}

export default GroupTitile
