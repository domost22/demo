import React from "react";
import BookingSteps from "../booking/BookingSteps";
import RegisterForm from "../register/RegisterForm";

class Register extends React.Component {

    render() {
        return (
            <div>
                {this.props.includeTabs &&
                <BookingSteps/>
                }
                <RegisterForm setUser={this.props.setUser}/>
            </div>

        )
    }
}

export default Register;
