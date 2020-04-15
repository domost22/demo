import React from "react";
import {LanguageContext} from "../../context/LanguageContext";
import {translations} from "../../translation/Translations";

class FleetTitle extends React.Component {


    render() {

        return(
            <LanguageContext.Consumer>
                {({language}) => (
            <section className="template-title has-over">
                <div className="container">
                    <h3 className="title">{translations[language].fleetTitle}</h3>
                    <span className="title_over">{translations[language].fleetTitle}</span>
                    <p className="subtitle">{translations[language].fleetSubtitle}</p>
                </div>
            </section>
                )}
            </LanguageContext.Consumer>
        )
    };
}

export default FleetTitle