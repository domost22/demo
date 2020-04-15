import React from "react";
import ErrorAlert from "../general/ErrorAlert";

class BookingMessage extends React.Component {
    render() {
        return (
            <ErrorAlert
                close={() => {this.props.close()}}
                message={this.props.message}
            />
        );
    }
}

export default BookingMessage;
