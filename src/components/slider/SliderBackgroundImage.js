import React from "react";
import {LanguageContext} from "../../context/LanguageContext";
import {translations} from "../../translation/Translations";

class SliderBackgroundImage extends React.Component {

    render() {
        return (
            <LanguageContext.Consumer>
                {({language}) => (
                    <div className="main-slider">
                        <img className="slider_image" src={require('../../images/slider/home01.webp')} alt=""/>
                        <h1 className="heading">{translations[language].slider.text}</h1>
                        <h2 className="heading_sub">  {translations[language].slider.sub_text}</h2>
                    </div>
                )}
            </LanguageContext.Consumer>
        )
    }
}

export default SliderBackgroundImage;
