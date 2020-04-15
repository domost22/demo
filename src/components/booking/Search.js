import React from "react";
import SearchBar from "./SearchBar";

class Search extends React.Component {
    render() {
        return (
            <section className={this.props.isOpened ? 'summary-bar-area open' : 'summary-bar-area'}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <ul className={this.props.isOpened ? 'summary-bar open' : 'summary-bar'}>

                                {this.props.isOpened &&
                                <SearchBar
                                    from={this.props.from}
                                    to={this.props.to}
                                    date={this.props.date}
                                    time={this.props.time}
                                    locations={this.props.locations}
                                    fetchingLocations={this.props.fetchingLocations}
                                    activator={this.props.activator}
                                    clear={this.props.clear}
                                    changeDate={this.props.changeDate}
                                    changeTime={this.props.changeTime}
                                />
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Search;

