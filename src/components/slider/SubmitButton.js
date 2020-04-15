import {withRouter} from 'react-router-dom';
import React from "react";
import {LanguageContext} from "../../context/LanguageContext";
import {translations} from "../../translation/Translations";
import Loader from "../general/Loader";

class SubmitButton extends React.Component {
    tabs = {
        "1": 'airport',
        "2": 'transfer',
        "3": 'excursion',
    };

    state = {
        loading: false,
    };

    submitted = async (lang) => {
        if (
            this.props.from
            && this.props.to
            && this.props.date
            && this.props.time
        ) {
            await this.setState({loading: true}, () => {
                this.props.history.push(`/${lang}/${translations[lang].pages.booking}/${this.props.from.replace(/\s+/g, '')}/${this.props.to.replace(/\s+/g, '')}/${this.props.date.toLocaleDateString('en').replace(/\//g, "-")}/${this.props.time.toLocaleTimeString('en').replace(/\//g, "-")}?tab=${this.tabs[this.props.index]}`);
            });
        } else {
            this.setState({loading: false});
            this.props.buildError(<ul className="alert-box">
                <li className='information'><img src={require('../../images/icon/alert.png')} alt=""/>Popuni polja<span><img
                    src={require('../../images/icon/delete.png')} alt=""/></span></li>
            </ul>);
        }
    };

    render() {
        if (this.state.loading) {
            return (<Loader/>);
        }

        return (
            <LanguageContext.Consumer>
                {({language}) => (
                    <div className="submit_button" onClick={() => {this.setState({loading: true}); this.submitted(language)}}>
                        <span className="register_now">{translations[language].reserved}<img
                            src={require('../../images/icon/arrow-white.png')} alt=""/></span>
                    </div>
                )}
            </LanguageContext.Consumer>
        )
    }
}

export default withRouter(SubmitButton);
SubmitButton.contextType = LanguageContext;
