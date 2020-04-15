import React from "react";
import {LanguageContext} from "../../context/LanguageContext";
import {translations} from "../../translation/Translations";

class SuccessForm extends React.Component {
    vehicles = {
        "1": {image: "eklasa.png", name: 'premium'},
        "2": {image: "sklasa.png", name: 'business'},
        "3": {image: "van.png", name: 'van'},
        "4": {image: "minibus.png", name: 'minibus'},
    };

    render() {
        return (
            <LanguageContext.Consumer>
                {({language}) => (
                    <section className="check-out-area">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="check-out">
                                        <div className="top">
                                            <div className="thanks">
                                                <span><img src={require('../../images/icon/thanks.png')} alt=""/></span>
                                                {translations[language].thankYou}
                                            </div>
                                            <p>{translations[language].thankNotice}<br/>
                                                {translations[language].thankNotice1}</p>
                                        </div>
                                        <div className="middle">
                                            <h2>{translations[language].reservationDetails}</h2>
                                            <ul className="summary-bar">
                                                <li>
                                                    <div className="info">
                                                        {translations[language].optionsPage.pickup}
                                                    </div>
                                                    <p>{this.props.transferBooking.attributes.fromLocation}</p>
                                                </li>
                                                <li>
                                                    <div className="info">
                                                        {translations[language].optionsPage.dropoff}
                                                    </div>
                                                    <p>{this.props.transferBooking.attributes.toLocation}</p>
                                                </li>
                                                <li>
                                                    <div className="info">
                                                        {translations[language].pickupDate}
                                                    </div>
                                                    <p>{this.props.transferBooking.attributes.transferDate.split(' ')[0]}</p>
                                                </li>
                                                <li>
                                                    <div className="info">
                                                        {translations[language].pickUpTime}
                                                    </div>
                                                    <p>{this.props.transferBooking.attributes.transferDate.split(' ')[1].split(':').slice(0, -1).join(':')}</p>
                                                </li>
                                                <li>
                                                    <div className="info">
                                                        {translations[language].duration}
                                                    </div>
                                                    <p>xxx udaljenost About 5 hours – Distance: 476.2 km </p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="bottom">
                                            <h2>{translations[language].selectedCar}</h2>
                                            <p>{translations[language].vehicles[this.vehicles[this.props.transferBooking.attributes.vehicleType].name]}</p>
                                            <div className="car-choose">
                                                <img src={require(`../../images/booking/${this.vehicles[this.props.transferBooking.attributes.vehicleType].image}`)}  alt=""/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </LanguageContext.Consumer>

        )
    }
}

export default SuccessForm;
