import React from "react";
import {LanguageContext} from "../../context/LanguageContext";
import {translations} from "../../translation/Translations";
import {Link, withRouter} from 'react-router-dom';
import GroupImage from "../excursion/GroupImage";
import GroupTitile from "../excursion/GroupTitile";
import GroupAuthor from "../excursion/GroupAuthor";
import GroupDate from "../excursion/GroupDate";

class Excursions extends React.Component {
    state = {
        openedIndex: 1,
    };
    excursionRoutes = {
        en: {
            "1": "/excursion/national-park-krka-waterfalls",
            "2": "/excursion/national-park-plitvice-lakes",
            "3": "/excursion/split-and-trogir-private-tour",
        },
        hr: {
            "1": "/izlet/nacionalni-park-slapovi-krke",
            "2": "/izlet/nacionalni-park-plitvicka-jezera",
            "3": "/izlet/split-i-trogir-privatni-izlet",
        },
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
                        <section className="template-title has-over">
                            <div className="container">
                                <h3 className="title">{translations[language].excursion.title}</h3>
                                <span className="title_over">{translations[language].excursion.title}</span>
                                <p className="subtitle">{translations[language].excursion.sub_text}</p>
                            </div>
                        </section>
                        <section id="main-post">
                            <div className="container">
                                <div className="row">
                                    {[1, 2, 3].map((index) => {
                                        return (
                                            <Link to={'/' + language + this.excursionRoutes[language][index.toString()]}
                                                  className="col-lg-4 col-sm-6" key={index}>
                                                <article className="post">
                                                    <GroupImage img={translations[language].excursion[`img${index}`]}/>
                                                    <div className="entry-content">

                                                        <GroupTitile
                                                            title={translations[language].excursion[`title${index}`]}/>
                                                        <ul>
                                                            <GroupAuthor
                                                                author={translations[language].excursion[`author${index}`]}/>
                                                            <GroupDate
                                                                date={translations[language].excursion[`date${index}`]}/>
                                                        </ul>
                                                    </div>
                                                </article>
                                            </Link>
                                        );
                                    })}
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="pagination-area">
                                            <ul>
                                                <li className="prev ">
                                                    <span className="waves-effect">
                                                        <img src={require('../../images/icon/prev.png')} alt=""/>
                                                    </span>
                                                </li>
                                                <li className="active">
                                                    <span className="waves-effect">1</span>
                                                </li>

                                                <li className="next">
                                                    <span className="waves-effect">
                                                        <img src={require('../../images/icon/next.png')} alt=""/>
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )}
            </LanguageContext.Consumer>
        )
    }
}

export default withRouter(Excursions);
