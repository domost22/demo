import React from "react";
import {translations} from "../translation/Translations";
import {LanguageContext} from "../context/LanguageContext";

class Vehicle extends React.Component {
    render() {
        return (
            <LanguageContext.Consumer>
                {({language}) => (
                    <div className={this.props.boxclassName}>
                        <div className="image-car one-half">
                            <img src={require(`../images/booking/${this.props.imageName}`)} alt=""/>
                        </div>
                        <div className="box-text one-half">
                            <div className="top">
                                <h3>{this.props.name}</h3>
                                <div className="name-car">
                                    {this.props.typeName}
                                </div>
                            </div>
                            <div className="content">
                                <p>
                                    {this.props.description}
                                </p>
                                <ul>
                                    <li><img src={require('../images/booking/people.png')}
                                             alt=""/>{this.props.numberOfPeople}
                                    </li>
                                    <li><img src={require('../images/booking/vali.png')} alt=""/> {this.props.bags}
                                    </li>
                                </ul>
                            </div>
                            <div className="bottom">
                                <div className="price">
                                    {this.props.fetchingPrice
                                        ? <span>{translations[language].loading}</span>
                                        : <React.Fragment><span>{this.props.price}</span> / {this.props.currency}
                                        </React.Fragment>
                                    }
                                </div>
                                <div className="btn-select">

                            <span
                                onClick={() => this.props.selectVehicle(this.props.vehicleId)}
                                style={{
                                    lineHeight: "50px",
                                    height: "50px",
                                    padding: "0 85px 0 48px",
                                    color: "#fff",
                                    background: "#bf9c60",
                                    borderRadius: "4px",
                                    display: "block",
                                    position: "relative",
                                    cursor: "pointer"
                                }}>
                                {this.props.select}
                                            </span>
                                </div>
                            </div>
                        </div>
                        <div className="clearfix"/>
                    </div>
                )}
            </LanguageContext.Consumer>
        )
    }
}

export default Vehicle;
