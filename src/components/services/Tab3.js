import React from "react";
import {LanguageContext} from "../../context/LanguageContext";
import {translations} from "../../translation/Translations";
class Tab3 extends React.Component {

    render() {
        return(
            <LanguageContext.Consumer>
                {({language}) => (
            <div className="content-box">
                <div className="position-content">
                    <p className="left-content"> {translations[language].airport}</p>
                    <p className="center-content"> {translations[language].airportCenter}</p>
                    <p className="right-content"> {translations[language].airportRight}</p>
                </div>
            </div>
                )}
            </LanguageContext.Consumer>
        )
    };
}

export default Tab3