import React from "react";
import SingleTitle from "../excursion/SingleTitle";
import SingleBody from "../excursion/SingleBody";
import SingleImage from "../excursion/SingleImage";
import {LanguageContext} from "../../context/LanguageContext";
import {translations} from "../../translation/Translations";
import {Link} from "react-router-dom";

class BlogSingle extends React.Component {
    singleRoutes = {
        en: {
            "1": "/en/excursion/national-park-krka-waterfalls",
            "2": "/en/excursion/national-park-plitvice-lakes",
            "3": "/en/excursion/split-and-trogir-private-tour",
        },
        hr: {
            "1": "/hr/izlet/nacionalni-park-slapovi-krke",
            "2": "/hr/izlet/nacionalni-park-plitvicka-jezera",
            "3": "/hr/izlet/split-i-trogir-privatni-izlet",
        },
    };

    getNextIndex = (currentIndex) => {
        let nextIndex = currentIndex + 1;
        if (nextIndex > 3) {
            nextIndex = 1;
        }

        return nextIndex;
    };

    getPreviousIndex = (currentIndex) => {
        let previousIndex = currentIndex - 1;
        if (previousIndex < 1) {
            previousIndex = 3;
        }

        return previousIndex;
    };

    render() {
        const nextIndex = this.getNextIndex(this.props.index);
        const previousIndex = this.getPreviousIndex(this.props.index);
        console.log(`url(${require('../../images/template/' + this.props.full)}) no-repeat center center;`);
        return (
            <LanguageContext.Consumer>
                {({language}) => (
                    <div>
                        <section style={{background:`url(${require('../../images/template/' + this.props.full)}) no-repeat center center`}} className="excursion-title" >
                            <div className="top-page">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="top-page-heading ">
                                                <h1>{this.props.title}</h1>
                                                <p className="sub-title">{translations[language].excursion.sub_text}</p>
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

                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section id="main-single">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-2"/>
                                    <div className="col-md-8">
                                        <div className="block-single">
                                            <article className="post-single">
                                                <div className="featured-post">
                                                </div>

                                                <SingleBody body_main={this.props.body_main1}
                                                            body_highlight={this.props.main_highlight}
                                                            body_footer={this.props.body_main_footer}
                                                />

                                            </article>
                                            <div className="direction">
                                                <div className="tags">
                                                    <span>Tags:</span>
                                                    <span>Croatia,</span>
                                                    <span>Excursion,</span>
                                                    <span>Tours,</span>
                                                    <span>Krka Waterfalls</span>
                                                </div>
                                                <SingleTitle
                                                    author={this.props.author}
                                                    date={this.props.date}
                                                />
                                                <div className="share">
                                                    <span>Share:</span>
                                                    <a href="https://www.facebook.com/sharer.php" title="Facebook">
                                                        <i className="fa fa-facebook"/>
                                                    </a>
                                                    <a href="https://twitter.com/intent/tweet" title="Twitter">
                                                        <i className="fa fa-twitter"/>
                                                    </a>
                                                    <a href="https://instagram.com/" title="Instagram">
                                                        <i className="fa fa-instagram"/>
                                                    </a>
                                                    <a href="http://pinterest.com/pin/create/link/?url=" title="Pinterest">
                                                        <i className="fa fa-pinterest"/>
                                                    </a>
                                                    <a href="https://dribbble.com/" title="Dribble">
                                                        <i className="fa fa-dribbble"/>
                                                    </a>
                                                    <a href="https://plus.google.com/share" title="Google">
                                                        <i className="fa fa-google"/>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="nav-single">
                                                <ul>
                                                    <li className="prev">
                                                        <Link
                                                            to={this.singleRoutes[language][previousIndex.toString()]}
                                                            onClick={() => {
                                                                window.scrollTo(0, 0);
                                                            }}
                                                        >
                                                            <div className="icon">
                                                                <img src={require('../../images/icon/prev.png')}
                                                                     alt=""/>
                                                            </div>
                                                            <div className="text">
                                                                <h4>{translations[language].excursion.previous}</h4>
                                                                <Link
                                                                    to={this.singleRoutes[language][previousIndex.toString()]}
                                                                    onClick={() => {
                                                                        window.scrollTo(0, 0);
                                                                    }}
                                                                >{translations[language].excursion[`title${previousIndex}`]}</Link>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                    <li className="next">
                                                        <Link
                                                            to={this.singleRoutes[language][nextIndex.toString()]}
                                                            onClick={() => {
                                                                window.scrollTo(0, 0);
                                                            }}
                                                        >
                                                            <div className="icon">
                                                                <img src={require('../../images/icon/next.png')}
                                                                     alt=""/>
                                                            </div>
                                                            <div className="text">
                                                                <h4>{translations[language].excursion.next}</h4>
                                                                <Link
                                                                    to={this.singleRoutes[language][nextIndex.toString()]}
                                                                    onClick={() => {
                                                                        window.scrollTo(0, 0);
                                                                    }}
                                                                >{translations[language].excursion[`title${nextIndex}`]}</Link>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-md-2"/>
                                </div>
                            </div>
                        </section>
                    </div>
                )}
            </LanguageContext.Consumer>
        )
    }
}

export default BlogSingle;
