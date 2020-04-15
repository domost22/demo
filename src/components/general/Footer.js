import React from "react";
import {LanguageContext} from "../../context/LanguageContext";
import {translations} from "../../translation/Translations";
import {Link} from "react-router-dom";

class Footer extends React.Component {
    render() {
        return (
            <LanguageContext.Consumer>
                {({language}) => (
                    <div>
                        <footer id="footer" className="footer-01">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-3 ft1">
                                        <div className="widget-footer widget-about">
                                            <div className="logo-ft">
                                        <span>
                                            <img src={require('../../images/logo.png')} alt=""/>
                                        </span>
                                            </div>
                                            <ul className="infomation-ft">
                                                <li>
                                                    {translations[language].contactUs.address}
                                                </li>
                                                <li>{translations[language].contactUs.phone}</li>
                                                <li>{translations[language].contactUs.email}</li>
                                            </ul>
                                            <ul className="social-ft">
                                                <li>
                                                    <a href="https://web.facebook.com/CroatiaAirportTransfer/">
                                                        <i className="fa fa-facebook" aria-hidden="true"/>
                                                    </a>
                                                </li>
                                                <li>
                                             <span>
                                                <i className="fa fa-twitter" aria-hidden="true"/>
                                            </span>
                                                </li>
                                                <li>
                                                    <a href="https://www.instagram.com/croatiaairporttransfer/">
                                                        <i className="fa fa-instagram" aria-hidden="true"/>
                                                    </a>
                                                </li>
                                                <li>
                                             <span>
                                                <i className="fa fa-pinterest" aria-hidden="true"/>
                                            </span>
                                                </li>
                                                <li>
                                             <span>
                                                <i className="fa fa-dribbble" aria-hidden="true"/>
                                             </span>
                                                </li>
                                                <li>
                                                    <a href="https://g.page/r/Cf8jQnWg4UndEAE">
                                                        <i className="fa fa-google" aria-hidden="true"/>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-2 ft2">
                                        <div className="widget-footer widget-services">
                                            <h3 className="title-ft">
                                                {translations[language].services}
                                            </h3>
                                            <ul>
                                                <li>
                                                    <span>{translations[language].private}</span>
                                                </li>
                                                <li>
                                                    <span>{translations[language].airport}</span>
                                                </li>
                                                <li>
                                                    <span>{translations[language].transfers}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-2 ft2">
                                        <div className="widget-footer widget-services">
                                            <h3 className="title-ft">
                                                {translations[language].aboutUs}
                                            </h3>
                                            <ul>
                                                <li>
                                                    <span>{translations[language].quote}</span>
                                                </li>
                                                <li>
                                                    <span>{translations[language].about}</span>
                                                </li>
                                                <li>
                                            <span><Link to={`/${language}/${translations[language].pages.blog}`}
                                                        onClick={() => {
                                                            this.props.closeMenu();
                                                        }}>{translations[language].blogg}</Link></span>
                                                </li>
                                                <li>
                                              <span><Link to={`/${language}/${translations[language].pages.faq}`}
                                                          onClick={() => {
                                                              this.props.closeMenu();
                                                          }}>{translations[language].faqq}</Link></span>
                                                </li>
                                                <li>
                                             <span><Link to={`/${language}/${translations[language].pages.contactUs}`}
                                                         onClick={() => {
                                                             this.props.closeMenu();
                                                         }}>{translations[language].contacttUs}</Link></span>
                                                </li>
                                                <li>
                                                    <span>Terms &amp; Conditions</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-2 ft2">
                                        <div className="widget-footer widget-services">
                                            <h3 className="title-ft">
                                                {translations[language].ourFleet}
                                            </h3>
                                            <ul>
                                                <li>
                                                    <span>Mercedes E-Class</span>
                                                </li>
                                                <li>
                                                    <span>Mercedes S-Class</span>
                                                </li>
                                                <li>
                                                    <span>Mercedes Vito</span>
                                                </li>
                                                <li>
                                                    <span>Mercedes Viano</span>
                                                </li>
                                                <li>
                                                    <span>Mercedes V-Class</span>
                                                </li>
                                                <li>
                                                    <span>Mercedes Sprinter</span>
                                                </li>
                                                <li>
                                                    <span>Mercedes Tourismo</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-3 ft1">
                                        <div className="widget-footer widget-apps">
                                            <ul>
                                                <li className="app-store">
                                            <span>
                                                <div className="image-app">
                                                    <img src={require('../../images/icon/app-store.png')} alt=""/>
                                                </div>
                                                <div className="text">
                                                    <h5>{translations[language].appStore}</h5>
                                                    <p>{translations[language].appStoreText}</p>
                                                </div>
                                            </span>
                                                </li>
                                                <li className="google-play">
                                            <span title="google-play">
                                                <div className="image-app">
                                                    <img src={require('../../images/icon/google-play.png')} alt=""/>
                                                </div>
                                                <div className="text">
                                                    <h5>{translations[language].googlePlay}</h5>
                                                    <p>{translations[language].googlePlayText}</p>
                                                </div>
                                            </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </footer>
                        <section className="footer-bottom bottom-01">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="title">
                                            {translations[language].airportsWeCover}
                                        </div>
                                        <ul className="city">
                                            <li>
                                                <span>Zagreb</span>
                                            </li>
                                            <li>
                                                <span>Split</span>
                                            </li>
                                            <li>
                                                <span>Dubrovnik</span>
                                            </li>
                                            <li>
                                                <span>Zadar</span>
                                            </li>
                                            <li>
                                                <span>Rijeka</span>
                                            </li>
                                            <li>
                                                <span>Osijek</span>
                                            </li>
                                            <li>
                                                <span>Pula</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="copyright cpr-01">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <p>{translations[language].copyright}</p>
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

export default Footer
