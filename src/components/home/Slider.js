import React from "react";
import SliderBackgroundImage from "../slider/SliderBackgroundImage";
import SearchBar from "../slider/SearchBar";
import {LanguageContext} from "../../context/LanguageContext";
import {translations} from "../../translation/Translations";
import LocationField from "../general/LocationField";
import {withRouter} from 'react-router-dom';
import {UserContext} from "../../context/UserContext";
import ApiClient from "../../network/ApiClient";
import Cookies from "universal-cookie";
import Notification from "../general/Notification";

class  Slider extends React.Component {
    state = {
        currentOption: 1,
        isDatepickerOpened: false,
        from: '',
        to: '',
        date: null,
        time: null,
        error: null,
        fromId: null,
        toId: null,
        active: null,
        excursions: [],
        lastTransferModal: false,
        lastTransferId: null,
        loadingLastTransfer: false,
    };

    cookies = new Cookies();

    componentDidMount() {
        if (this.props.location.search) {
            const queryParams = this.props.location.search.substring(1).split('&');
            queryParams.forEach((queryParam) => {
                const paramSplit = queryParam.split('=');
                if (2 === paramSplit.length && 'tab' === paramSplit[0] && 'excursions' === paramSplit[1]) {
                    this.setState({currentOption: 3});
                }
            });
        }

        const lastTransferId = this.cookies.get('last-transfer-id');
        if (lastTransferId && 'null' !== lastTransferId && 'undefined' !== lastTransferId) {
            this.setState({lastTransferModal: true, lastTransferId})
        }
    }

    fetchLastTransferId = () => {
        const apiClient = new ApiClient();
        this.setState({loadingLastTransfer: true}, () => {});
        apiClient.getTransferBookingById(this.state.lastTransferId).then(
            (result) => {
                if (result.data && result.data.id === this.state.lastTransferId && null === result.data.attributes.paidBy) {
                    const transferDateParts = result.data.attributes.transferDate.split(' ');
                    this.setState({
                        from: result.data.attributes.fromLocation,
                        to: result.data.attributes.toLocation,
                        date: new Date(transferDateParts[0]),
                        time: new Date(result.data.attributes.transferDate),
                        loadingLastTransfer: false,
                        lastTransferModal: false
                    });
                }
            },
            (error) => {
                this.setState({loadingLastTransfer: false, lastTransferModal: false});
            }
        );
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.excursions.length !== prevState.excursions.length) {
            if (this.props.location.search) {
                const queryParams = this.props.location.search.substring(1).split('&');
                let allExcursions = this.state.excursions.data;
                queryParams.forEach((queryParam) => {
                    const paramSplit = queryParam.split('=');
                    if (2 === paramSplit.length && 'excursion' === paramSplit[0] && paramSplit[1]) {
                        allExcursions = allExcursions.filter((excursion) => {
                            return excursion.id === paramSplit[1];
                        });
                    }
                });
                if (allExcursions.length === 1) {
                    const fromLocation = this.state.excursions.included.filter((location) => {
                        return location.id === allExcursions[0].relationships.fromLocation.data.id
                    });
                    const toLocation = this.state.excursions.included.filter((location) => {
                        return location.id === allExcursions[0].relationships.toLocation.data.id
                    });
                    if (1 === fromLocation.length && 1 === toLocation.length) {
                        this.setState({from: fromLocation[0].attributes.name, to: toLocation[0].attributes.name})
                    }
                }
            }
        }
    }

    static getDerivedStateFromProps(props, state) {
        return {excursions: props.excursions};
    }

    changeCurrentOption = (currentOption) => {
        this.setState({currentOption});
    };

    openLocationPicker = (active) => {
        this.setState({active});
    };

    closeLocationPicker = (isForce = false) => {
        if (!isForce && !this.state.to && this.state.from) {
            this.setState({active: 'to'});

            return;
        }

        if (!isForce && this.state.to && !this.state.from) {
            this.setState({active: 'from'});

            return;
        }
        this.setState({active: null});
    };

    onDatepickerOpen = () => {
        this.setState({isDatepickerOpened: true});
        const datepicker = document.getElementsByClassName('react-datepicker-popper')[0];
        document.getElementById('root').appendChild(datepicker);
    };

    onTimepickerOpen = () => {
        const datepicker = document.getElementsByClassName('react-datepicker-popper')[0];
        document.getElementById('root').appendChild(datepicker);
    };

    setFromId = (fromId) => {
        this.setState({fromId});
    };

    setToId = (toId) => {
        this.setState({toId});
    };

    onDatepickerClose = () => {
        this.setState({isDatepickerOpened: false});
        const datepicker = document.getElementsByClassName('react-datepicker-popper')[0];
        datepicker.parentNode.removeChild(datepicker);
    };

    onTimepickerClose = () => {
        const datepicker = document.getElementsByClassName('react-datepicker-popper')[0];
        datepicker.parentNode.removeChild(datepicker);
    };

    trimZipCode = (string) => {
        string = string.split(',');
        string.forEach((part, index) => {
            let numberFromPart = this.getNumberFromString(part);
            if (!isNaN(numberFromPart) && numberFromPart > 9999) {
                string.splice(index, 1);
            }
        });

        string = string.join(',').split(' ');

        string.forEach((part, index) => {
            let numberFromPart = this.getNumberFromString(part);
            if (!isNaN(numberFromPart) && numberFromPart > 500) {
                string.splice(index, 1);
            }
        });

        return string.join(' ');
    };

    getNumberFromString = (string) => {
        return parseInt(string.replace(' ', '').replace(',', ''));
    };

    setFrom = (from) => {
        this.setState({from: this.trimZipCode(from)});
    };

    setTo = (to) => {
        this.setState({to: this.trimZipCode(to)});
    };

    setDate = (date) => {
        this.setState({date});
    };

    setTime = (time) => {
        this.setState({time});
    };

    buildError = (error) => {
        if (null === this.state.error) {
            this.setState({error: error}, () => {
                setTimeout(() => {
                    this.setState({error: null});
                }, 3000);
            });
        }
    };

    clearErrors = () => {
        this.setState({error: null});
    };

    clearInput = (type) => {
        this.setState({[type]: ''});
    };

    render() {
        const {currentOption} = this.state;
        return (
            <LanguageContext.Consumer>
                {({language}) => (
                    <section className="tp-banner">
                        {this.state.lastTransferModal && <Notification
                            text={'Load transfer'}
                            from={this.cookies.get('last-transfer-from')}
                            loading={this.state.loadingLastTransfer}
                            to={this.cookies.get('last-transfer-to')}
                            close={() => {
                                this.setState({lastTransferModal: false});
                                this.cookies.set('last-transfer-id', null, {path: '/'});
                            }}
                            confirm={() => {this.fetchLastTransferId(this.cookies.get('last-transfer-id'))}}
                        />}
                        <SliderBackgroundImage/>
                        {null !== this.state.active && <div className="book-adress open">
                            <span className="close" onClick={() => this.closeLocationPicker(true)}><img
                                src={require('../../images/icon/close_x.png')} alt=""/></span>
                            <div className="container">
                                <div className="logo-calendar center">
                                    <span>
                                        <img className="logo" src={require('../../images/logo.png')} alt=""/>
                                    </span>
                                </div>
                            </div>

                            <div className="container">
                                <div className="form-address">
                                    <LocationField
                                        setField={'from' === this.state.active ? this.setFrom : this.setTo}
                                        clearErrors={this.clearErrors}
                                        locations={this.props.locations}
                                        setId={(id) => {
                                            if ('from' === this.state.active) {
                                                this.setFromId(id);
                                                this.props.setFromId(id);
                                            } else {
                                                this.setToId(id);
                                                this.props.setToId(id);

                                            }
                                        }}
                                        fetchingLocations={this.props.fetchingLocations}
                                        closeLocationPicker={this.closeLocationPicker}
                                        fieldType={this.state.active}
                                        additionalClass='botuncic'
                                    />
                                </div>
                            </div>
                        </div>
                        }
                        <section className="sdl-booking">
                            <ul className="tab_booking">

                                <li style={{cursor: 'pointer'}} className={1 === currentOption ? 'active' : ''}
                                    onClick={() => {
                                        this.changeCurrentOption(1)
                                    }}><span>{translations[language].airport}</span></li>
                                <li style={{cursor: 'pointer'}} className={2 === currentOption ? 'active' : ''}
                                    onClick={() => {
                                        this.changeCurrentOption(2)
                                    }}><span>{translations[language].private}</span></li>
                                <li style={{cursor: 'pointer'}} className={3 === currentOption ? 'active' : ''}
                                    onClick={() => {
                                        this.props.getExcursions();
                                        this.changeCurrentOption(3)
                                    }}><span>{translations[language].transfers}</span></li>

                            </ul>
                            {
                                null !== this.state.errors &&
                                <div style={{color: "red"}}>{this.state.error}</div>
                            }
                            {1 === currentOption &&
                            <SearchBar
                                onDatepickerOpen={this.onDatepickerOpen}
                                onDatepickerClose={this.onDatepickerClose}
                                onTimepickerOpen={this.onTimepickerOpen}
                                onTimepickerClose={this.onTimepickerClose}
                                setFrom={this.setFrom}
                                setTo={this.setTo}
                                setDate={this.setDate}
                                setTime={this.setTime}
                                from={this.state.from}
                                to={this.state.to}
                                date={this.state.date}
                                time={this.state.time}
                                buildError={this.buildError}
                                clearErrors={this.clearErrors}
                                locations={[]}
                                fetchingLocations={this.props.fetchingLocations}
                                setFromId={(fromId) => {
                                    this.setFromId(fromId);
                                    this.props.setFromId(fromId);
                                }}
                                setToId={(toId) => {
                                    this.setToId(toId);
                                    this.props.setToId(toId);
                                }}
                                fromId={this.state.fromId}
                                toId={this.state.toId}
                                activator={this.openLocationPicker}
                                index={1}
                                clear={this.clearInput}
                            />
                            }
                            {2 === currentOption &&
                            <SearchBar
                                onDatepickerOpen={this.onDatepickerOpen}
                                onDatepickerClose={this.onDatepickerClose}
                                onTimepickerOpen={this.onTimepickerOpen}
                                onTimepickerClose={this.onTimepickerClose}
                                setFrom={this.setFrom}
                                setTo={this.setTo}
                                setDate={this.setDate}
                                setTime={this.setTime}
                                from={this.state.from}
                                to={this.state.to}
                                date={this.state.date}
                                time={this.state.time}
                                buildError={this.buildError}
                                clearErrors={this.clearErrors}
                                locations={[]}
                                fetchingLocations={this.props.fetchingLocations}
                                setFromId={(fromId) => {
                                    this.setFromId(fromId);
                                    this.props.setFromId(fromId);
                                }}
                                setToId={(toId) => {
                                    this.setToId(toId);
                                    this.props.setToId(toId);
                                }}
                                fromId={this.state.fromId}
                                toId={this.state.toId}
                                activator={this.openLocationPicker}
                                index={2}
                                clear={this.clearInput}
                            />
                            }
                            {3 === currentOption &&
                            <SearchBar
                                onDatepickerOpen={this.onDatepickerOpen}
                                onDatepickerClose={this.onDatepickerClose}
                                onTimepickerOpen={this.onTimepickerOpen}
                                onTimepickerClose={this.onTimepickerClose}
                                setFrom={this.setFrom}
                                setTo={this.setTo}
                                setDate={this.setDate}
                                setTime={this.setTime}
                                from={this.state.from}
                                to={this.state.to}
                                date={this.state.date}
                                time={this.state.time}
                                buildError={this.buildError}
                                clearErrors={this.clearErrors}
                                locations={this.props.excursions}
                                fetchingLocations={this.props.fetchingLocations}
                                setFromId={(fromId) => {
                                    this.setFromId(fromId);
                                    this.props.setFromId(fromId);
                                }}
                                setToId={(toId) => {
                                    this.setToId(toId);
                                    this.props.setToId(toId);
                                }}
                                fromId={this.state.fromId}
                                toId={this.state.toId}
                                activator={this.openLocationPicker}
                                index={3}
                                clear={this.clearInput}
                            />
                            }
                        </section>

                    </section>
                )}
            </LanguageContext.Consumer>
        )
    }
}

export default withRouter(Slider);
Slider.contextType = UserContext;
