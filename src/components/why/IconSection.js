import React from "react";
import {LanguageContext} from "../../context/LanguageContext";
import {translations} from "../../translation/Translations";

class IconSection extends React.Component {
    render() {
        return(
            <LanguageContext.Consumer>
                {({language}) => (
                    <div>
                        <section className="section-iconbox">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-3 col-sm-6 size-table">
                                        <div className="iconbox center">
                                            <div className="iconbox-icon">
                                                <img src={require('../../images/iconbox/01.png')} alt="" />
                                            </div>
                                            <div className="iconbox-content">
                                                <h3>
                                                    <span>{translations[language].whyChooseUs.step1}</span>
                                                </h3>
                                                <p>{translations[language].whyChooseUs.step1text}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-sm-6 size-table">
                                        <div className="iconbox center">
                                            <div className="iconbox-icon">
                                                <img src={require('../../images/iconbox/02.png')} alt="" />
                                            </div>
                                            <div className="iconbox-content">
                                                <h3>
                                                    <span>{translations[language].whyChooseUs.step2}</span>
                                                </h3>
                                                <p>{translations[language].whyChooseUs.step2text}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-sm-6 size-table">
                                        <div className="iconbox center">
                                            <div className="iconbox-icon">
                                                <img src={require('../../images/iconbox/03.png')} alt="" />
                                            </div>
                                            <div className="iconbox-content">
                                                <h3>
                                                    <span>{translations[language].whyChooseUs.step3}</span>
                                                </h3>
                                                <p>{translations[language].whyChooseUs.step3text}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-sm-6 size-table">
                                        <div className="iconbox center">
                                            <div className="iconbox-icon">
                                                <img src={require('../../images/iconbox/04.png')} alt="" />
                                            </div>
                                            <div className="iconbox-content">
                                                <h3>
                                                    <span>{translations[language].whyChooseUs.step4}</span>
                                                </h3>
                                                <p>{translations[language].whyChooseUs.step4text}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </section>
                    </div>
                )}
            </LanguageContext.Consumer>
        )
    }
}

export default IconSection