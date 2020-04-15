import React from "react";

class BookingModal extends React.Component {
    render() {
        return (
            <div className={'alert-box'}>
                <p>NEki tekst</p>
                <p>Load transfer {this.props.from} - {this.props.to}</p>
                <div className="button-div">
                <button className={'btn btn-primary'} onClick={() => {this.props.confirm()}}>{this.props.loading ? 'Loading' : 'Yes'}</button>
                <button className={'btn btn-warning'} onClick={() => {this.props.close()}}>No</button>
                </div>
            </div>
        )
    }
}

export default BookingModal;
