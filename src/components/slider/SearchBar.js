import React from "react";
import DateField from "../general/DateField";
import TimeField from "../general/TimeField";
import SubmitButton from "./SubmitButton";
import LocationFieldPlaceholder from "../general/LocationFieldPlaceholder";

class SearchBar extends React.Component {
    render() {
        return (
            <div className="schedule-booking fw" style={{overflow: "inherit"}}>
                <h1 className="text-over">RESERVE NOW</h1>
                <form className="form-booking">
                    <LocationFieldPlaceholder activator={this.props.activator} initialValue={this.props.from} fieldType='from' clear={this.props.clear}/>
                    <LocationFieldPlaceholder activator={this.props.activator} initialValue={this.props.to} fieldType='to' clear={this.props.clear}/>
                    <DateField onDatepickerOpen={this.props.onDatepickerOpen} onDatepickerClose={this.props.onDatepickerClose} setDate={this.props.setDate} clearErrors={this.props.clearErrors} selected={this.props.date}/>
                    <TimeField onDatepickerOpen={this.props.onTimepickerOpen} onDatepickerClose={this.props.onTimepickerClose} setTime={this.props.setTime} clearErrors={this.props.clearErrors} selected={this.props.time}/>
                    <SubmitButton from={this.props.from} to={this.props.to} date={this.props.date} time={this.props.time} buildError={this.props.buildError} fromId={this.props.fromId} toId={this.props.toId} index={this.props.index}/>
                </form>
            </div>
        )
    }
}

export default SearchBar;
