import React from "react";
import {Link, withRouter} from 'react-router-dom';
import Nav from "./Nav";
import {UserContext} from "../../context/UserContext";
import {LanguageContext} from "../../context/LanguageContext";
import {translations} from "../../translation/Translations";

class HeaderNav extends React.Component {
    state = {
        isMenuOpened: false,
    };

    closeMenu = () => {
        this.setState({isMenuOpened: false});
    };

    render() {
        return (
            <LanguageContext.Consumer>
                {({language}) => (
                    <UserContext.Consumer>
                        {({user}) => {
                            if ((
                                '/login' === this.props.location.pathname
                                || '/register' === this.props.location.pathname
                            ) && user) {
                                this.props.history.push('/')
                            }
                            return (
                                <header id="header"
                                        className={
                                            this.props.location.pathname.includes('booking')
                                            || this.props.location.pathname.includes('rezervacija')
                                            || '/en/login' === this.props.location.pathname
                                            || '/hr/prijava' === this.props.location.pathname
                                            || '/en/register' === this.props.location.pathname
                                            || '/hr/registracija' === this.props.location.pathname
                                            || '/en/contact-us' === this.props.location.pathname
                                            || '/hr/kontaktiraj-nas' === this.props.location.pathname
                                            || '/en/forgot-password' === this.props.location.pathname
                                            || '/en/reservations' === this.props.location.pathname
                                            || '/hr/rezervacije' === this.props.location.pathname
                                            || '/en/success' === this.props.location.pathname
                                            || '/hr/uspjesno' === this.props.location.pathname
                                            || '/en/quote' === this.props.location.pathname
                                            || '/hr/ponuda' === this.props.location.pathname
                                                ? 'header-01 fix_headerbk' : 'header-01'
                                        }>
                                    <div className="container-fuild">
                                        <div className="onclick" onClick={() => {
                                            this.setState({isMenuOpened: !this.state.isMenuOpened});
                                        }}>
                                            <span/>
                                        </div>
                                        <Nav isMenuOpened={this.state.isMenuOpened} closeMenu={this.closeMenu}/>
                                        <div id="logo" className="logo-pro">
                                            <Link to="/"><img className="logo" src={require('../../images/logo.png')} alt=""/></Link>
                                        </div>
                                        <div className="box-right">
                                            <div className="search">
                                                <span className="view_search"><i className="pe-7s-phone"/><i
                                                    className="pe-7s-mail"/></span>
                                            </div>
                                            {!user &&
                                            <div className="login">
                                                <Link to={`/${language}/${translations[language].pages.login}`}>{translations[language].login_header}</Link>
                                                <span> / </span>
                                                <Link to={`/${language}/${translations[language].pages.register}`}>{translations[language].register_header}</Link>
                                            </div>
                                            }
                                            {user &&
                                            <div className="login">
                                                <Link to={`/${language}/${translations[language].pages.reservations}`}>{translations[language].reservations_header}</Link>
                                                <span> / </span>
                                                <Link to={`/${language}/${translations[language].pages.logout}`}>{translations[language].logout_header}</Link>
                                            </div>
                                            }
                                        </div>
                                    </div>
                                </header>
                            )
                        }}
                    </UserContext.Consumer>
                )}
            </LanguageContext.Consumer>
        );
    }
}

export default withRouter(HeaderNav);
