import React from "react";

class GroupDate extends React.Component {

    render() {


    return (
        <li className="date">
            <span><img className="ikona" src={require('../../images/icon/date.png')} alt="" />{this.props.date}</span>
        </li>
    )
    }
}

export default GroupDate
