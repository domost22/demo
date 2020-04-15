import React from "react";
import {LanguageContext} from "../../context/LanguageContext";
import {translations} from "../../translation/Translations";
import {UserContext} from "../../context/UserContext";

class BookingSteps extends React.Component {
    render() {
        const {currentStep} = this.props;
        return (
            <LanguageContext.Consumer>
                {({language}) => (
                    <UserContext.Consumer>
                        {({user}) => {
                            return (
                                <section className="booking-steps-area mht">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <ul className="booking-steps">
                                                    <li className={1 === currentStep ? 'active' : ''}
                                                        onClick={() => this.props.changeStep(1)}>
                                                        <span>1</span>
                                                        <div className="icon">
                                                            <img src={require('../../images/booking/car.png')} alt=""/>
                                                        </div>
                                                        <div className="text">
                                                            {translations[language].carClass}
                                                        </div>
                                                    </li>
                                                    <li className={2 === currentStep ? 'active' : ''}
                                                        onClick={() => this.props.changeStep(2)}>
                                                        <span>2</span>
                                                        <div className="icon">
                                                            <img src={require('../../images/booking/options.png')}
                                                                 alt=""/>
                                                        </div>
                                                        <div className="text">
                                                            {translations[language].options}
                                                        </div>
                                                    </li>
                                                    {!user &&
                                                    <li className={3 === currentStep ? 'active' : ''}
                                                        onClick={() => this.props.changeStep(3)}>
                                                        <span>3</span>
                                                        <div className="icon">
                                                            <img src={require('../../images/booking/login.png')}
                                                                 alt=""/>
                                                        </div>
                                                        <div className="text">
                                                            {translations[language].loginBooking}
                                                        </div>
                                                    </li>
                                                    }
                                                    <li className={4 === currentStep ? 'active' : ''}
                                                        onClick={() => this.props.changeStep(4)}>
                                                        <span>4</span>
                                                        <div className="icon">
                                                            <img src={require('../../images/booking/card.png')} alt=""/>
                                                        </div>
                                                        <div className="text">
                                                            {translations[language].payment}
                                                        </div>
                                                    </li>
                                                    <li className={5 === currentStep ? 'active' : ''}>
                                                        <span>5</span>
                                                        <div className="icon">
                                                            <img src={require('../../images/booking/check-out.png')}
                                                                 alt=""/>
                                                        </div>
                                                        <div className="text">
                                                            {translations[language].checkout}
                                                        </div>
                                                    </li>
                                                </ul>
                                                <div
                                                    className={this.props.isSearchBarOpened ? 'button-summary-bar open' : 'button-summary-bar'}
                                                    onClick={() => {
                                                        this.props.expandSearchBar(!this.props.isSearchBarOpened)
                                                    }}>
                                                    <div className="icon">
                                                        <span
                                                            className={this.props.isSearchBarOpened ? 'ion-ios-arrow-thin-up' : 'ion-ios-arrow-thin-down'}/>
                                                    </div>
                                                    <p className="show">{translations[language].details}</p>
                                                    <p className="hide">{translations[language].hide}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            )
                        }}
                    </UserContext.Consumer>
                )}
            </LanguageContext.Consumer>
        )
    }
}

export default BookingSteps