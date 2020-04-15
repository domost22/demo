import React from "react";

class GroupAuthor extends React.Component {

    render() {


        return (
            <li className="author">
                <span><img className="ikona" src={require('../../images/icon/author.png')} alt="" />{this.props.author}</span>
            </li>
        )
    }
}

export default GroupAuthor
