import React from "react";
import {LanguageContext} from "../../context/LanguageContext";
import {translations} from "../../translation/Translations";
class Tab1 extends React.Component {

    render() {
        return(
            <LanguageContext.Consumer>
                {({language}) => (
            <div className="content-box">
                <div className="position-content">
                    <p className="left-content">{translations[language].transfers}</p>
                    <p className="center-content">{translations[language].transfersCenter}</p>
                    <p className="right-content">{translations[language].transfersRight}</p>
                </div>
            </div>
                )}
            </LanguageContext.Consumer>
        )
    };
}

export default Tab1