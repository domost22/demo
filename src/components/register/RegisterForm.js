import React from "react";
import {withRouter} from 'react-router-dom';
import ApiClient from "../../network/ApiClient";
import AuthTabs from "../login/AuthTabs";
import {LanguageContext} from "../../context/LanguageContext";
import {translations} from "../../translation/Translations";
import ErrorAlert from "../general/ErrorAlert";

class RegisterForm extends React.Component {
    state = {
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        password: '',
        repeatedPassword: '',
        termsAccepted: false,
        error: null,
    };

    componentDidMount() {
        if (this.props.firstName) {
            this.setState({firstName: this.props.firstName});
        }
        if (this.props.lastName) {
            this.setState({lastName: this.props.lastName});
        }
        if (this.props.phoneNumber) {
            this.setState({phone: this.props.phoneNumber});
        }
        if (this.props.email) {
            this.setState({email: this.props.email});
        }
    }

    submitForm = (e) => {
        e.preventDefault();
        if (
            !this.state.termsAccepted
            && ('' !== this.state.email
            && '' !== this.state.firstName
            && '' !== this.state.lastName
            && '' !== this.state.phone
            && '' !== this.state.password
            && '' !== this.state.repeatedPassword)
        ) {


            this.setState({error: translations[this.context.language].errors.terms}, () => {
                this.removeMessage();

            });
            return;
        }
        if (
            '' !== this.state.email
            && '' !== this.state.firstName
            && '' !== this.state.lastName
            && '' !== this.state.phone
            && '' !== this.state.password
            && '' !== this.state.repeatedPassword
        ) {
            const apiClient = new ApiClient();
            apiClient.registerUser(
                this.state.email,
                this.state.password,
                this.state.firstName,
                this.state.lastName,
                this.state.phone
            ).then(
                (result) => {
                    this.setState({user: result.data, fetchingLocations: false});
                    this.props.setUser(result.data);
                    if (!this.props.hasOwnProperty('onSuccess')) {
                        this.props.history.push('/');
                    } else {
                        this.props.onSuccess();
                    }
                },
                (error) => {
                    this.setState({fetchingLocations: false});
                }
            );
        } else {
            this.setState({error: translations[this.context.language].errors.fillInfo}, () => {
                this.removeMessage();

            });
        }
    };

    setErrorIfPasswordsNotMatch = () => {
        if (this.state.password !== this.state.repeatedPassword) {
            this.setState({error: translations[this.context.language].errors.password}, () => {
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
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2"/>
                        <div className="col-lg-8">
                            <br/>
                            <br/>
                            <br/>
                            <div className="login-booking">
                                {this.props.includeTabs &&
                                <AuthTabs
                                    toLogin={this.props.toLogin}
                                    toRegister={this.props.toRegister}
                                    continueWithoutRegistration={this.props.continueWithoutRegistration}
                                    show={this.props.show}
                                />
                                }
                                <div id="tab-2" className="content-tab">
                                    <div className="register-form">
                                        {null !== this.state.error &&
                                        <ErrorAlert
                                            close={() => {this.setState({error: null})}}
                                            message={this.state.error}
                                        />

                                        }
                                        <form>
                                            <div className="one-half first-name">
                                                <label htmlFor="firstname">{translations[language].optionsPage.firstName} </label>
                                                <input type="text" id="firstname" placeholder="Ivan"
                                                       className={this.state.error && !this.state.firstName ? 'neka-klasa' : ''}
                                                       value={this.state.firstName}
                                                       onChange={(e) => this.setState({
                                                           firstName: e.target.value,
                                                           error: null
                                                       }, () => {
                                                           this.setErrorIfPasswordsNotMatch();
                                                       })}
                                                />
                                            </div>
                                            <div className="one-half last-name">
                                                <label htmlFor="lastname">{translations[language].optionsPage.lastName}</label>
                                                <input type="text" id="lastname" placeholder="Penović"
                                                       className={this.state.error && !this.state.lastName ? 'neka-klasa' : ''}
                                                       value={this.state.lastName}
                                                       onChange={(e) => this.setState({
                                                           lastName: e.target.value,
                                                           error: null
                                                       }, () => {
                                                           this.setErrorIfPasswordsNotMatch();
                                                       })}
                                                />
                                            </div>
                                            <div className="one-half email">
                                                <label htmlFor="email">{translations[language].optionsPage.email}</label>
                                                <input type="text" id="email" placeholder="info@croatia-airport-transfer.com"
                                                       className={this.state.error && !this.state.email ? 'neka-klasa' : ''}
                                                       value={this.state.email}
                                                       onChange={(e) => this.setState({
                                                           email: e.target.value,
                                                           error: null
                                                       }, () => {
                                                           this.setErrorIfPasswordsNotMatch();
                                                       })}
                                                />
                                            </div>
                                            <div className="one-half phone">
                                                <label htmlFor="phone">{translations[language].optionsPage.phone}</label>
                                                <input type="text" id="phone" placeholder="(+385) 95 816 0522"
                                                       className={this.state.error && !this.state.phone ? 'neka-klasa' : ''}
                                                       value={this.state.phone}
                                                       onChange={(e) => this.setState({
                                                           phone: e.target.value,
                                                           error: null
                                                       }, () => {
                                                           this.setErrorIfPasswordsNotMatch();
                                                       })}
                                                />
                                            </div>
                                            <div className="one-half pass ">
                                                <label htmlFor="pass">{translations[language].password}</label>
                                                <input type="password" name="pass" id="pass" placeholder="********"
                                                       className={this.state.error && !this.state.password ? 'neka-klasa' : ''}
                                                       value={this.state.password}

                                                       onChange={(e) => {
                                                           this.setState({
                                                               password: e.target.value,
                                                               error: null
                                                           }, () => {
                                                               this.setErrorIfPasswordsNotMatch();
                                                           });
                                                       }}
                                                />
                                            </div>
                                            <div className="one-half re-pass">
                                                <label htmlFor="re-pass">{translations[language].repeatPassword}</label>
                                                <input type="password" id="re-pass" placeholder="********"
                                                       className={this.state.error && !this.state.repeatedPassword ? 'neka-klasa' : ''}
                                                       value={this.state.repeatedPassword}
                                                       onChange={(e) => {
                                                           this.setState({
                                                               repeatedPassword: e.target.value,
                                                               error: null
                                                           }, () => {
                                                               this.setErrorIfPasswordsNotMatch();
                                                           });
                                                       }}
                                                />
                                            </div>
                                            <div className="one-half checkbox">
                                                <input  type="checkbox" name="accept" id="accept"
                                                />
                                                <label  className={this.state.error && !this.state.termsAccepted? 'neka-klasa2' : ''}  htmlFor="accept" onClick={() => {

                                                    this.setState({
                                                        termsAccepted: !this.state.termsAccepted,
                                                        error: null
                                                    });

                                                }}>{translations[language].terms}</label>
                                            </div>
                                            <div className="one-half btn-submit">
                                                <button type="submit" onClick={(e) => this.submitForm(e)}>{translations[language].register}
                                                </button>
                                            </div>
                                            <div className="clearfix"/>
                                        </form>
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

export default withRouter(RegisterForm);
RegisterForm.contextType = LanguageContext;
