import React from "react";
import {LanguageContext} from "../../context/LanguageContext";
import {translations} from "../../translation/Translations";

class AuthTabs extends React.Component {
    render() {
        return(
            <LanguageContext.Consumer>
                {({language}) => (
            <ul className="login-tab-list">
                <li className={'login' === this.props.show ? 'active' : ''} onClick={'login' === this.props.show ? () => {} : this.props.toLogin}><span>{translations[language].loginBooking}</span></li>
                <li className={'register' === this.props.show ? 'active' : ''} onClick={'register' === this.props.show ? () => {} : this.props.toRegister}><span>{translations[language].register}</span></li>
                <li onClick={this.props.continueWithoutRegistration}><span>{translations[language].continueWithout}</span></li>
            </ul>
                )}
            </LanguageContext.Consumer>
        )
    }
}

export default AuthTabs;
