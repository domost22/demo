import React from "react";
import AuthTabs from "./AuthTabs";
import {withRouter} from 'react-router-dom';
import ApiClient from "../../network/ApiClient";
import {LanguageContext} from "../../context/LanguageContext";
import {translations} from "../../translation/Translations";
import {UserContext} from "../../context/UserContext";
import ErrorAlert from "../general/ErrorAlert";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: null,
            user: null,
        };
    }

    submitForm = (e) => {
        e.preventDefault();
        if ('' !== this.state.email && '' !== this.state.password) {
            const apiClient = new ApiClient();
            apiClient.loginUser(this.state.email, this.state.password).then(
                (result) => {
                    this.setState({user: result.data, fetchingLocations: false});
                    this.props.setUser(result.data);
                    if (!this.props.hasOwnProperty('onSuccess')) {
                        this.props.history.push('/');
                    } else {
                        this.props.onSuccess();
                    }
                },
                () => {
                    this.setState({fetchingLocations: false});
                }
            );
        } else {

            this.setState({error: translations[this.context.language].errors.fillInfo}, () => {
                this.removeMessage();
            });
        }
    };
    removeMessage = () => {
        setTimeout(() => {this.setState({error: null})}, 3000);
    };
    render() {
        return (
            <LanguageContext.Consumer>
                {({language}) => (
            <section className="login-booking-area">
                {this.state.error &&
                <ErrorAlert
                    close={() => {this.setState({error: null})}}
                    message={this.state.error}
                />}
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2"/>
                        <div className="col-lg-8">
                            <div className="login-booking">
                                {this.props.includeTabs &&
                                <AuthTabs
                                    toLogin={this.props.toLogin}
                                    toRegister={this.props.toRegister}
                                    continueWithoutRegistration={this.props.continueWithoutRegistration}
                                    show={this.props.show}
                                />
                                }
                                <br/>
                                <br/>
                                <br/>
                                <div className="login-content">
                                    <div id="tab-1" className="content-tab">
                                        <div className="login-form">
                                            <form acceptCharset="utf-8">
                                                <div className="one-half">
                                                    <div className="form-email">
                                                        <label>{translations[language].loginForm.email}</label>
                                                        <input type="text" name="username"
                                                               className={this.state.error && !this.state.email? 'neka-klasa' : ''}
                                                               placeholder={translations[language].username}
                                                               value={this.state.email}
                                                               onChange={(e) => {this.setState({email: e.target.value, error: null});}}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="one-half">
                                                    <div className="form-password">
                                                        <label>{translations[language].loginForm.password}</label>
                                                        <input type="password" name="password"
                                                               className={this.state.error && !this.state.password? 'neka-klasa' : ''}
                                                               placeholder="************"
                                                               value={this.state.password}
                                                               onChange={(e) => {this.setState({password: e.target.value, error: null});}}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="clearfix"/>
                                                <div className="one-half">
                                                    <div className="remember">
                                                        <input type="checkbox" name="remember" id="remember"/>
                                                        <label>{translations[language].loginForm.rememberMe}</label>
                                                    </div>
                                                </div>
                                                <div className="one-half">
                                                    <div className="btn-submit">
                                                        <span>{translations[language].loginForm.lostPassword}</span>
                                                        <button type="submit" onClick={(e) => this.submitForm(e)}>{translations[language].login}</button>
                                                    </div>
                                                </div>
                                                <div className="clearfix"/>
                                            </form>
                                        </div>
                                        <div className="login-social">
                                            <span>{translations[language].loginForm.or}</span>
                                            <p>{translations[language].loginForm.quick}</p>
                                            <ul className="social">
                                                <li className="facebook">
                                                    <span>
                                                        <span className="fa fa-facebook"/>{translations[language].loginForm.facebook}
                                                    </span>
                                                </li>
                                                <li className="twitter">
                                                    <span>
                                                        <span className="fa fa-twitter"/>{translations[language].loginForm.twitter}
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2"/>
                    </div>
                </div>
            </section>
                )}
            </LanguageContext.Consumer>
        )
    }
}

export default withRouter(LoginForm);
LoginForm.contextType = UserContext;
