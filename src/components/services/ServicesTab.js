import React from "react";
import {LanguageContext} from "../../context/LanguageContext";
import {translations} from "../../translation/Translations";

class ServicesTab extends React.Component {

    render() {
        return(
            <LanguageContext.Consumer>
                {({language}) => (
            <section className="template-title has-over top60">
                <div className="container">
                    <h3 className="title">{translations[language].services}</h3>
                    <span className="title_over">{translations[language].services}</span>
                    <p className="subtitle">{translations[language].servicesText}</p>
                </div>
            </section>
                )}
            </LanguageContext.Consumer>
)
};
}

export default ServicesTab