import React from "react";
import {LanguageContext} from "../../context/LanguageContext";

class PremiumVan extends React.Component {
    render() {
        return(
            <LanguageContext.Consumer>
                {({language}) => (
                    <div className="owl-item active">
                    <div className="fleet-item">
                        <div className="images">
                            <img src={require('../../images/fleet/bus_2.webp')} alt="" />
                        </div>
                        <div className="fleet-content">
                            <h4 className="fleet-title">
                                <span>Mercedes Benz V-Class</span>
                            </h4>
                            <ul>
                                <li className="author">
                                    <span><img src={require('../../images/icon/author.png')} alt="" />Max . 7</span>
                                </li>
                                <li className="mail">
                                    <span><img src={require('../../images/icon/mail.png')} alt="" />Max . 7</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    </div>
                )}
            </LanguageContext.Consumer>
        )
    }
}

export default PremiumVan
