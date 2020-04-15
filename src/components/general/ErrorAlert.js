import React from "react";

class ErrorAlert extends React.Component {

    render() {
        return (
            <ul className="alert-box pb-5 center">
                <li className='danger'>
                    <img
                        src={require('../../images/icon/alert.png')}
                        alt=""
                    />
                    {this.props.message}
                    <span onClick={this.props.close}>
                    <img
                        src={require('../../images/icon/delete.png')} alt=""/>
                    </span>
                </li>
            </ul>
        )
    }
}

export default ErrorAlert;
