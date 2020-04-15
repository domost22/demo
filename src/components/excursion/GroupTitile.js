import React from "react";

class GroupTitile extends React.Component {

    render() {


        return (
            <div className="entry-post-title">
                <h4 className="post-title"><span>{this.props.title}</span></h4>
            </div>
        )
    }
}

export default GroupTitile
