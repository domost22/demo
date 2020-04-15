import React from "react";
import {LanguageContext} from "../../context/LanguageContext";
import {translations} from "../../translation/Translations";
import ApiClient from "../../network/ApiClient";
import ErrorAlert from "../general/ErrorAlert";

class ContactForm extends React.Component {
    state = {
        email: '',
        name: '',
        message: '',
        error: null,
        formSent: false,
    };

    submitForm = async (e) => {
        e.preventDefault();
        if (
            !this.state.message
            || !this.state.email
            || !this.state.name
        ) {
            this.setState({error: translations[this.context.language].contactUs.fillAllFields});

            return;
        }

        const apiClient = new ApiClient();
        await apiClient.sendContactUsEmail(
            this.state.email,
            this.state.name,
            this.state.message,
        ).then(
            (result) => {
                this.setState({formSent: true});
            },
            (error) => {
                this.setState({message: translations[this.context.language].contactUs.sendFailed});
            }
        );
    };

    render() {
        return (
            <LanguageContext.Consumer>
                {({language}) => (
                    <section className="contact-area ver-1">
                        <div className="container">
                            <div className="template-title center has-over">
                                <h1>{translations[language].contactUs.mainTitle}</h1>
                                <span>{translations[language].contactUs.mainTitle}</span>
                            </div>
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="contact-item center">
                                        <div className="icon">
                                            <img src={require('../../images/icon/address-1.png')} alt=""/>
                                        </div>
                                        <div className="content-text">
                                            <h4>{translations[language].contactUs.addressTitle}</h4>
                                            <p>{translations[language].contactUs.address}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="contact-item center">
                                        <div className="icon">
                                            <img src={require('../../images/icon/phone-1.png')} alt=""/>
                                        </div>
                                        <div className="content-text">
                                            <h4>{translations[language].contactUs.formEmailTitle}</h4>
                                            <p>{translations[language].contactUs.email}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="contact-item center">
                                        <div className="icon">
                                            <img src={require('../../images/icon/email-1.png')} alt=""/>
                                        </div>
                                        <div className="content-text">
                                            <h4>{translations[language].contactUs.formPhone}</h4>
                                            <p>{translations[language].contactUs.phone}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="hours center">
                                        <h5>{translations[language].contactUs.workHours}</h5>
                                        <ul>
                                            <li>{translations[language].contactUs.workHoursText}</li>
                                        </ul>
                                    </div>
                                    <div className="follow center">
                                        <h5>{translations[language].contactUs.followUs}</h5>
                                        <ul>
                                            <li>
                                        <span>
                                            <i className="fa fa-facebook" aria-hidden="true"/>
                                        </span>
                                            </li>
                                            <li>
                                        <span>
                                            <i className="fa fa-twitter" aria-hidden="true"/>
                                        </span>
                                            </li>
                                            <li>
                                        <span>
                                            <i className="fa fa-instagram" aria-hidden="true"/>
                                        </span>
                                            </li>
                                            <li>
                                        <span>
                                            <i className="fa fa-pinterest" aria-hidden="true"/>
                                        </span>
                                            </li>
                                            <li>
                                        <span>
                                            <i className="fa fa-dribbble" aria-hidden="true"/>
                                        </span>
                                            </li>
                                            <li>
                                        <span>
                                            <i className="fa fa-google" aria-hidden="true"/>
                                        </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-2"/>
                                <div className="col-lg-8">
                                    <div className="contact-form ver-1">
                                        {!this.state.formSent && <h4 className="center">{translations[language].contactUs.formTitle}</h4>}
                                        {null !== this.state.error &&   <ErrorAlert
                                            close={() => {this.setState({error: null})}}
                                            message={this.state.error}
                                        />}
                                        {this.state.formSent ? <ul className="alert-box pb-5 center">
                                            <li className='success'><img src={require('../../images/icon/alert.png')}
                                                                        alt=""/>{translations[language].contactUs.formSent}<span><img
                                                src={require('../../images/icon/delete.png')} alt=""/></span></li>
                                        </ul> : <form>
                                            <div className="form form-name one-half">
                                                <label
                                                    htmlFor="name">{translations[language].contactUs.formFirstName}</label>
                                                <input type="text" id="name" name="your-name" placeholder="John"
                                                       value={this.state.name} onChange={(e) => {
                                                    this.setState({name: e.target.value, error: null})
                                                }}/>
                                            </div>
                                            <div className="form form-email one-half">
                                                <label
                                                    htmlFor="email">{translations[language].contactUs.formEmailTitle}</label>
                                                <input type="text" id="email" name="your-email"
                                                       placeholder="info@croatia-airport-transfer.com"
                                                       value={this.state.email} onChange={(e) => {
                                                    this.setState({email: e.target.value, error: null})
                                                }}/>
                                            </div>
                                            <div className="form form-comment">
                                                <label
                                                    htmlFor="comment">{translations[language].contactUs.formDescription}</label>
                                                <textarea name="comment" id="comment"
                                                          placeholder={translations[language].contactUs.messagePlaceholder}
                                                          value={this.state.message} onChange={(e) => {
                                                    this.setState({message: e.target.value, error: null})
                                                }}/>
                                            </div>
                                            <div className="btn-submit-form">
                                                <button type="submit"
                                                        onClick={(e) => this.submitForm(e)}>{translations[language].contactUs.formSubmit}<img
                                                    src={require('../../images/icon/right-3.png')} alt=""/></button>
                                            </div>
                                        </form>}
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

export default ContactForm;
ContactForm.contextType = LanguageContext;
