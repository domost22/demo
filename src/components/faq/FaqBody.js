import React from "react";

class FaqBody extends React.Component {
    render() {
        return (
            <div className="toggle-content">
                <p>
                    {this.props.body}
                </p>
                <div className="clearfix" />
            </div>
        )
    }
}

export default FaqBody;
