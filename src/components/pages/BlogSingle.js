import React from "react";
import SingleTitle from "../blog/SingleTitle";
import SingleBody from "../blog/SingleBody";
import SingleImage from "../blog/SingleImage";
import {LanguageContext} from "../../context/LanguageContext";
import {translations} from "../../translation/Translations";
import {Link} from "react-router-dom";

class BlogSingle extends React.Component {
    blogs = {
        hr: {
            "1": "/hr/blog/zasto-je-vazno-rezervirati-prijevoz-na-vrijeme",
            "2": "/hr/blog/prijevoz-gostiju-s-svih-aerodroma-u-hrvatskoj",
            "3": "/hr/blog/kako-rezervirati-transfer-sa-aerodroma-u-hrvatskoj"
        },
        en: {
            "1": "/en/blog/why-is-it-important-to-book-airport-transfer-in-croatia-on-time",
            "2": "/en/blog/transfers-from-and-to-all-airports-in-croatia",
            "3": "/en/blog/how-to-book-a-transfer-in-croatia"
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
                                                <p className="sub-title">Latest news</p>
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
                                                    <span>Home </span>
                                                </li>
                                                <li>
                                                    / Blog
                                                </li>
                                                <li>
                                                    / Naziv
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
                                                    <SingleImage index={this.props.index}/>
                                                </div>
                                                <SingleTitle title={this.props.title}
                                                             author={this.props.author}
                                                             date={this.props.date}
                                                />
                                                <SingleBody body_main={this.props.body_main1}
                                                            body_highlight={this.props.main_highlight}
                                                            body_footer={this.props.body_main_footer}
                                                />

                                            </article>
                                            <div className="direction">
                                                <div className="tags">
                                                    <span>Tags:</span>
                                                    <span>Croatia,</span>
                                                    <span>Airport,</span>
                                                    <span>Transfer,</span>
                                                    <span>Service</span>
                                                </div>
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
                                                            to={this.blogs[language][previousIndex.toString()]}
                                                            onClick={() => {
                                                                window.scrollTo(0, 0);
                                                            }}
                                                        >
                                                            <div className="icon">
                                                                <img src={require('../../images/icon/prev.png')}
                                                                     alt=""/>
                                                            </div>
                                                            <div className="text">
                                                                <h4>{translations[language].blogSingle.previous}</h4>
                                                                <Link
                                                                    to={this.blogs[language][previousIndex.toString()]}
                                                                    onClick={() => {
                                                                        window.scrollTo(0, 0);
                                                                    }}
                                                                >{translations[language].blogSingle[`title${previousIndex}`]}</Link>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                    <li className="next">
                                                        <Link
                                                            to={this.blogs[language][nextIndex.toString()]}
                                                            onClick={() => {
                                                                window.scrollTo(0, 0);
                                                            }}
                                                        >
                                                            <div className="icon">
                                                                <img src={require('../../images/icon/next.png')}
                                                                     alt=""/>
                                                            </div>
                                                            <div className="text">
                                                                <h4>{translations[language].blogSingle.next}</h4>
                                                                <Link
                                                                    to={this.blogs[language][nextIndex.toString()]}
                                                                    onClick={() => {
                                                                        window.scrollTo(0, 0);
                                                                    }}
                                                                >{translations[language].blogSingle[`title${nextIndex}`]}</Link>
                                                            </div>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-md-2"></div>
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
