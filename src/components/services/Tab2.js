import React from "react";
import {LanguageContext} from "../../context/LanguageContext";
import {translations} from "../../translation/Translations";
class Tab2 extends React.Component {

    render() {
        return(
            <LanguageContext.Consumer>
                {({language}) => (
            <div className="content-box">
                <div className="position-content">
                    <p className="left-content">{translations[language].private}</p>
                    <p className="center-content">{translations[language].privateCenter}</p>
                    <p className="right-content">{translations[language].privateRight}</p>
                </div>
            </div>
                )}
            </LanguageContext.Consumer>
        )
    };
}

export default Tab2