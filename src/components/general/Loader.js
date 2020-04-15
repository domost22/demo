import React from "react";

class Loader extends React.Component {

    render() {
        return (
            <div id="loading-overlay">
                <div className="loader"></div>
            </div>
        )
    }
}

export default Loader;
