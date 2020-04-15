import React from "react";
import Modal from "./Modal";

class Notification extends React.Component {
    state = {
        isModalOpened: false
    };

    render() {
        return (
            <div>
                {this.state.isModalOpened && <Modal
                    text={this.props.text}
                    from={this.props.from}
                    loading={this.props.loading}
                    to={this.props.to}
                    close={this.props.close}
                    confirm={this.props.confirm}
                />}
                <div onClick={() => {
                    this.setState({isModalOpened: !this.state.isModalOpened})
                }} className="container-notification">
                    <div className="notification"/>
                </div>
            </div>
        )
    }
}

export default Notification;
