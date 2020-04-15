import React from "react";

class Modal extends React.Component {
    render() {
        return (
            <div className={'alert-boxes'}>
                <div className="alert-container">
                    <div className="alert-text"><h2>{this.props.text}</h2> <h4>{(this.props.from && this.props.to) && `${this.props.from} - ${this.props.to}`}</h4></div>
                <div className="alert-left">
                    <button className={'alert-button-left'} onClick={() => {this.props.confirm()}}>{this.props.loading ? 'Loading' : 'Yes'}</button>
                </div>
                    <div className="alert-right">
                    <button className={'alert-button-right'} onClick={() => {this.props.close()}}>No</button>
                </div>
            </div>
            </div>
        )
    }
}

export default Modal;
