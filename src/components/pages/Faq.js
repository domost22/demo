import React from "react";
import FaqTitle from "../faq/FaqTitle";
import {LanguageContext} from "../../context/LanguageContext";
import {translations} from "../../translation/Translations";
import FaqBody from "../faq/FaqBody";
import {Link} from "react-router-dom";

class Faq extends React.Component {
    state = {
        openedIndex: 1,
    };

    setOpenedIndex = (index) => {
        if (this.state.openedIndex === index) {
            index = null;
        }
        this.setState({openedIndex: index});
    };

    render() {
        return (
            <LanguageContext.Consumer>
                {({language}) => (
                    <div>
                        <section className="top-title">
                            <div className="top-page">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="top-page-heading">
                                                <h1>FAQ</h1>
                                                <p className="sub-title">Find out more helpful information's</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="breadcrumbs">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <ul>
                                                <li>
                                                    <Link to="/"><span>Home </span></Link>
                                                </li>
                                                <li>
                                                    / Faq
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="accordion-area">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-1"/>
                                    <div className="col-md-10">
                                        {[1, 2, 3, 4, 5, 6, 7,].map((index) => {
                                            return (
                                                <div className="accordion">
                                                    <div className="accordion-toggle">
                                                        <FaqTitle title={translations[language].faq[`title${index}`]} opened={this.state.openedIndex === index} index={index} openFaq={this.setOpenedIndex}/>
                                                        {this.state.openedIndex === index && <FaqBody body={translations[language].faq[`body${index}`]}/>}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="col-md-1"/>
                                </div>
                            </div>
                        </section>
                    </div>
                )}
            </LanguageContext.Consumer>
        )
    }
}

export default Faq