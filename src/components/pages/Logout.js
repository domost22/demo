import React from "react";
import {withRouter} from 'react-router-dom';
import {UserContext} from "../../context/UserContext";

class Logout extends React.Component {
    componentDidMount() {
        this.context.setUser(null);
        this.props.history.push('/');
    }

    render() {
        return (<React.Fragment></React.Fragment>);
    }
}

export default withRouter(Logout);
Logout.contextType = UserContext;
