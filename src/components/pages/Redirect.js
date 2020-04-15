import React from "react";
import {withRouter} from 'react-router-dom';

class Redirect extends React.Component {
    componentDidMount() {
        this.props.history.push(this.props.to);
    }

    render() {
        return (
          <React.Fragment></React.Fragment>
        );
    }
}

export default withRouter(Redirect);
