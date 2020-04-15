import React from "react";
import Tab1 from "../services/Tab1";
import Tab2 from "../services/Tab2";
import Tab3 from "../services/Tab3";
import {LanguageContext} from "../../context/LanguageContext";
import {translations} from "../../translation/Translations";

class IconBox extends React.Component {
    state = {
        currentOption: 1,

    };
    changeCurrentOption = (currentOption) => {
        this.setState({currentOption});
    };

    render() {
        const {currentOption} = this.state;
        return(
            <LanguageContext.Consumer>
                {({language}) => (
                        <section className="icon-box">
                            <div className="container">
                                <ul className="tab_services" >
                                    <li  className={1 === currentOption ? 'active' : ''} onClick={() => {this.changeCurrentOption(1)}}><span>
                                <img style={{cursor:'pointer'}} src={require('../../images/icon/forma1.png')} alt="" />
                                        {translations[language].transfers}
                            </span></li>
                                    <li  className={2 === currentOption ? 'active' : ''} onClick={() => {this.changeCurrentOption(2)}}><span>
                                <img style={{cursor:'pointer'}} src={require('../../images/icon/forma2.png')} alt="" />
                                        {translations[language].private}
                            </span></li>
                                    <li  className={3 === currentOption ? 'active' : ''} onClick={() => {this.changeCurrentOption(3)}}><span>
                                <img style={{cursor:'pointer'}} src={require('../../images/icon/forma3.png')} alt="" />
                                        {translations[language].airport}
                            </span></li>
                                </ul>
                                {1 === currentOption &&
                                <Tab1 />
                                }
                                {2 === currentOption &&
                                <Tab2 />
                                }
                                {3 === currentOption &&
                                <Tab3 />
                                }
                            </div>
                            <hr />
                        </section>
                )}
            </LanguageContext.Consumer>
        )
    };
}

export default IconBox
