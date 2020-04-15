import React from "react";
import {LanguageContext} from "../../context/LanguageContext";
import {translations} from "../../translation/Translations";
import IconSection from "../why/IconSection";


class Why extends React.Component {
    render() {
        return(
            <LanguageContext.Consumer>
                {({language}) => (
<div>
                <section className="template-title has-over">
                    <div className="container">
                        <h3 className="title">{translations[language].whyChooseUs.title}</h3>
                        <span className="title_over">{translations[language].whyChooseUs.title}</span>
                        <p className="subtitle">{translations[language].whyChooseUs.subTitle}</p>
                    </div>
                </section>
                <IconSection />
</div>
                )}
            </LanguageContext.Consumer>
        )
    }
}

export default Why