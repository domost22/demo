import React from "react";
import {LanguageContext} from "../../context/LanguageContext";
import {translations} from "../../translation/Translations";
class Banner extends React.Component {
    render() {
        return(
            <LanguageContext.Consumer>
                {({language}) => (
<section className="info-box parallax parallax_one">
    <div className="container">
        <div className="wrapper-content">
            <h3 className="title">
                {translations[language].banner.title}
            </h3>
            <p className="content">{translations[language].banner.text}</p>
            <p className="contact">{translations[language].banner.phone}</p>
            <span className="booking">{translations[language].banner.buttonText}<img src={require('../../images/icon/arrow-white.png')} alt="" /></span>
        </div>
    </div>
</section>
                )}
            </LanguageContext.Consumer>
        )
    }
}

export default Banner