import React from "react";
import {LanguageContext} from "../../context/LanguageContext";
import {translations} from "../../translation/Translations";

class LocationFieldPlaceholder extends React.Component {
    render() {
        return (
            <LanguageContext.Consumer>
                {({language}) => (
                    <div className="pick-address js">
                        <i className="fa fa-map-marker fa-lg test"/>
                        <label>{translations[language]['from' === this.props.fieldType ? 'pickUp' : 'dropOff']}</label>
                        <input className="input-stil pointer"
                               readOnly={true}
                               type="text"
                               placeholder={translations[language].pickUpPlaceholder}
                               value={this.props.initialValue}
                               onClick={() => {this.props.activator(this.props.fieldType)}}
                        />
                        {this.props.initialValue && typeof this.props.clear === 'function' && <button type="button" className={'from' === this.props.fieldType ? 'react-datepicker__close-icon botuncic' : 'react-datepicker__close-icon botuncic2'} onClick={() => {this.props.clear(this.props.fieldType)}}/>}
                    </div>
                )}
            </LanguageContext.Consumer>
        )
    }
}

export default LocationFieldPlaceholder;
