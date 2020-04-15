import React from "react";
import {LanguageContext, languages} from "../../context/LanguageContext";
import {Link} from "react-router-dom";
import {translations} from "../../translation/Translations";

class Nav extends React.Component {
    render() {
        return (
            <LanguageContext.Consumer>
                {({language, toggleLanguage}) => {
                    return (
                        <div className={this.props.isMenuOpened ? 'navigation active' : 'navigation'}>
                            <div id="main-menu" className={this.props.isMenuOpened ? 'main-menu active' : 'main-menu'}>
                                <ul className="top-menuleft">
                                    <li onClick={() => {
                                        this.props.closeMenu();
                                    }} className="x_close"><span className="close_x"><img
                                        src={require('../../images/icon/close_x.png')} alt=""/></span></li>
                                    <li className="x_logo"><span><img
                                        src={require('../../images/logo.png')} alt=""/></span><Link to={'/'}/></li>
                                    <li className="x_language">
                                        <img src={require('../../images/icon/web.png')} alt=""/>
                                        <select id="languages" onChange={(e) => {
                                            toggleLanguage(e.target.value);
                                            window.document.documentElement.lang = e.target.value;
                                            this.props.closeMenu();
                                        }}
                                        value={language}
                                        >
                                            {Object.keys(languages).map((languageValue) => {
                                                return (
                                                    <option key={languageValue}
                                                            value={languageValue}
                                                    >
                                                        {languages[languageValue].toUpperCase()}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </li>
                                </ul>
                                <ul className="menu">
                                    <li className="has-dropdown">
                                        <span><Link to={'/'} className='menu-item-link' onClick={() => {
                                            this.props.closeMenu();
                                        }}>{translations[language].home}</Link></span>
                                    </li>
                                    <li className="has-dropdown">
                                        <span><Link to={`/${language}/${translations[language].pages.contactUs}`}
                                                    className='menu-item-link' onClick={() => {
                                            this.props.closeMenu();
                                        }}>{translations[language].contacttUs}</Link></span>
                                    </li>
                                    <li className="has-dropdown">
                                        <span><Link to={`/${language}/${translations[language].pages.faq}`}
                                                    className='menu-item-link' onClick={() => {
                                            this.props.closeMenu();
                                        }}>{translations[language].faqq}</Link></span>
                                    </li>
                                    <li className="has-dropdown">
                                        <span><Link to={`/${language}/${translations[language].pages.blog}`}
                                                    className='menu-item-link' onClick={() => {
                                            this.props.closeMenu();
                                        }}>{translations[language].blogg}</Link></span>
                                    </li>

                                </ul>
                                <div className="button">
                                    <Link to={`/${language}/${translations[language].pages.quote}`} className='quote'
                                          onClick={() => {
                                              this.props.closeMenu();
                                          }}>{translations[language].quotee}</Link>
                                    <Link to={`/${language}/${translations[language].pages.home}`} className='booking'
                                          onClick={() => {
                                              this.props.closeMenu();
                                          }}>{translations[language].onlineBooking}</Link>
                                </div>
                                <ul className="social-ft">
                                    {[
                                        'facebook',
                                        'twitter',
                                        'instagram',
                                        'pinterest',
                                        'dribbble',
                                        'google'
                                    ].map((socialMedia) => {
                                        return (
                                            <li key={socialMedia}>
                                    <span>
                                        <i className={`fa fa-${socialMedia}`}/>
                                    </span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    )
                }}
            </LanguageContext.Consumer>
        )
    }
}

export default Nav;

