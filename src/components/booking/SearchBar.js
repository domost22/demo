import React from "react";
import {LanguageContext} from "../../context/LanguageContext";
import {translations} from "../../translation/Translations";
import LocationFieldPlaceholder from "../general/LocationFieldPlaceholder";
import DatePicker from "react-datepicker";
import {withRouter} from 'react-router-dom';
import SubmitButton from "../slider/SubmitButton";

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            from: this.props.from,
            to: this.props.to,
            date: this.props.date,
            time: this.props.time,
        };
    }

    setFrom = (from) => {
        this.setState({from});
    };

    setDate = (date) => {
        this.setState({date});
    };

    setTime = (time) => {
        this.setState({time});
    };

    render() {
        return (
            <LanguageContext.Consumer>
                {({language}) => (
            <ul>
                <li>
                    <LocationFieldPlaceholder  activator={this.props.activator} initialValue={this.props.from} fieldType='from' clear={this.props.clear}/>
                </li>
                <li>
                    <LocationFieldPlaceholder activator={this.props.activator} initialValue={this.props.to} fieldType='to' clear={this.props.clear}/>
                </li>
                <li>
                    <div className="pick-address js">
                        {translations[language].pickupDate}
                    </div>
                    <DatePicker
                        className="datum pointer test"
                        placeholderText={translations[language].datePlaceholder}
                        selected={this.state.date}
                        onChange={(date) => {this.setDate(date); this.props.changeDate(date);}}
                        dateFormat={'yyyy-MM-dd'}
                        calendarClassName="kalendar_pozadina"
                        onChangeRaw={this.handleDateChangeRaw}
                        isClearable
                        popperPlacement="top-end"
                    />
                </li>
                <li>
                    <div className="pick-address js">
                        {translations[language].pickUpTime}
                    </div>
                    <DatePicker
                        className="datum pointer test"
                        selected={this.state.time}
                        onChange={(time) => {
                            this.setState({time: time});
                            this.props.changeTime(time);
                        }}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={5}
                        timeCaption={translations[language].pickUpTime}
                        dateFormat="h:mm aa"
                        placeholderText={translations[language].timePlaceholder}
                        isClearable
                        popperPlacement="top-end"
                    />
                </li>
                <li>
                    <div className="pick-address js">
                        {translations[language].duration}
                    </div>
                    <div className="search_submit">
                    <SubmitButton
                    from={this.state.from}
                    to={this.state.to}
                    date={this.state.date}
                    time={this.state.time}
                    />
                    </div>
                </li>
            </ul>
                )}
            </LanguageContext.Consumer>
        )
    }
}

export default withRouter(SearchBar);
