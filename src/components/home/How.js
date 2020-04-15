import React from "react";
import {translations} from "../../translation/Translations";
import {LanguageContext} from "../../context/LanguageContext";

class How extends React.Component {
    render() {
        return(
            <LanguageContext.Consumer>
                {({language}) => (
            <section className="about-box">
                <div className="container">
                    <div className="template-title has-over mtt">
                        <h3 className="title">{translations[language].howItWorks.title}</h3>
                        <span className="title_over">{translations[language].howItWorks.title}</span>
                        <p className="subtitle">{translations[language].howItWorks.subTitle}</p>
                    </div>
                    <div className="row">
                        <div className="col-md-7 full-sm">
                            <img src={require('../../images/about/how1.webp')} alt="" />
                        </div>
                        <div className="col-md-5 full-sm">
                            <ul>
                                <li>
                                    <h3>{translations[language].howItWorks.step1}</h3>
                                    <p>{translations[language].howItWorks.step1text}</p></li>
                                <li>
                                    <h3>{translations[language].howItWorks.step2}</h3>
                                    <p>{translations[language].howItWorks.step2text}</p></li>
                                <li>
                                    <h3>{translations[language].howItWorks.step3}</h3>
                                    <p>{translations[language].howItWorks.step3text}</p></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
                )}
            </LanguageContext.Consumer>
        )
    }
}

export default How
