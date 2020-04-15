import React from "react";
import {Link} from "react-router-dom";
import GroupImage from "../blog/GroupImage";
import GroupTitile from "../blog/GroupTitile";
import GroupAuthor from "../blog/GroupAuthor";
import GroupDate from "../blog/GroupDate";
import {translations} from "../../translation/Translations";
import {LanguageContext} from "../../context/LanguageContext";
import {withRouter} from 'react-router-dom';

class Blog extends React.Component {
    state = {
        openedIndex: 1,
    };

    blogRoutes = {
        en: {
            "1": "/blog/why-is-it-important-to-book-airport-transfer-in-croatia-on-time",
            "2": "/blog/transfers-from-and-to-all-airports-in-croatia",
            "3": "/blog/how-to-book-a-transfer-in-croatia",
        },
        hr: {
            "1": "/blog/zasto-je-vazno-rezervirati-prijevoz-na-vrijeme",
            "2": "/blog/prijevoz-gostiju-s-svih-aerodroma-u-hrvatskoj",
            "3": "/blog/kako-rezervirati-transfer-sa-aerodroma-u-hrvatskoj",
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
                        <section className="top-title">
                            <div className="top-page">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="top-page-heading">
                                                <h1>BLOG</h1>
                                                <p className="sub-title">Read latest blog posts</p>
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
                                                    / Blog
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section id="main-post">
                            <div className="container">
                                <div className="row">
                                    {[1, 2, 3].map((index) => {
                                        return (
                                            <Link to={'/' + language + this.blogRoutes[language][index.toString()]}
                                                  className="col-lg-4 col-sm-6" key={index}>
                                                <article className="post">
                                                    <GroupImage img={translations[language].blog[`img${index}`]}/>
                                                    <div className="entry-content">

                                                        <GroupTitile
                                                            title={translations[language].blog[`title${index}`]}/>
                                                        <ul>
                                                            <GroupAuthor
                                                                author={translations[language].blog[`author${index}`]}/>
                                                            <GroupDate
                                                                date={translations[language].blog[`date${index}`]}/>
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
                                                <li className="prev">
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

export default withRouter(Blog);
