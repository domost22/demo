import React from "react";
import {LanguageContext} from "../../context/LanguageContext";
import {translations} from "../../translation/Translations";
import DatePicker from "react-datepicker/es";

class TimeField extends React.Component {
    state = {
        time: null,
        isOpened: false,
    };

    constructor(props) {
        super(props);
        this.props.setTime(null);
    }

    componentDidMount() {
        if (this.props.selected) {
            this.setState({time: this.props.selected});
            this.props.setTime(this.props.selected);
        }
    }

    componentWillUnmount(): void {
    }

    static getDerivedStateFromProps(props, state) {
        if (props.selected) {
            return {time: props.selected};
        }

        return null;
    }

    render() {
        return (
            <LanguageContext.Consumer>
                {({language}) => (
                    <div className="pick-time js pointer" onClick={() => {
                        if (!this.state.isOpened) {
                            this.props.onDatepickerOpen();
                            this.setState({isOpened: true});
                        } else {
                            this.props.onDatepickerClose();
                            this.setState({isOpened: false});
                        }
                    }}>
                        <i className="fa fa-clock-o fa-lg  test"/>
                        <label>{translations[language].pickUpTime}</label>
                        <DatePicker
                            className="datum pointer"
                            selected={this.state.time}
                            onChange={(time) => {
                                this.setState({time: time});
                                this.props.setTime(time);
                                this.props.clearErrors();
                            }}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={5}
                            timeCaption={translations[language].pickUpTime}
                            dateFormat="h:mm aa"
                            placeholderText={translations[language].timePlaceholder}
                            isClearable
                        />
                    </div>
                )}
            </LanguageContext.Consumer>
        )
    }
}

export default TimeField;
