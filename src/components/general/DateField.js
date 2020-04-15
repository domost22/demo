import React from "react";
import DatePicker from "react-datepicker";
import {LanguageContext} from "../../context/LanguageContext";
import {translations} from "../../translation/Translations";

class DateField extends React.Component {
    state = {
        date: null,
    };

    componentDidMount() {
        if (this.props.selected) {
            this.setDate(this.props.selected);
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.selected) {
            return {date: props.selected};
        }

        return null;
    }

    setDate = (date) => {
        this.setState({date});
    };

    handleDateChangeRaw = (e) => {
        e.preventDefault();
    };

    render() {
        return (
            <LanguageContext.Consumer>
                {({language}) => (
            <div className="pick">
                <i className="fa fa-calendar  test"/><label className="kalendar">{translations[language].pickupDate}</label>
                <DatePicker
                    className="datum pointer"
                    placeholderText={translations[language].datePlaceholder}
                    selected={this.state.date}
                    onChange={(date) => {this.setDate(date); this.props.setDate(date); this.props.clearErrors()}}
                    onCalendarClose={this.props.onDatepickerClose}
                    onCalendarOpen={this.props.onDatepickerOpen}
                    dateFormat={'yyyy-MM-dd'}
                    calendarClassName="kalendar_pozadina"
                    onChangeRaw={this.handleDateChangeRaw}
                    isClearable
                    popperPlacement='top-start'
                />
            </div>
                )}

            </LanguageContext.Consumer>
        )
    }
}

export default DateField;
