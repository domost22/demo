import React from "react";
import {UserContext} from "../../context/UserContext";
import {LanguageContext} from "../../context/LanguageContext";
import {translations} from "../../translation/Translations";
import ApiClient from "../../network/ApiClient";
import {withRouter} from 'react-router-dom';
import Cookies from 'universal-cookie';
import DatePicker from "react-datepicker";
import ErrorAlert from "../general/ErrorAlert";

class Options extends React.Component {
    state = {
        pickupAddressOrFlightNumber: '',
        dropOffAddress: '',
        message: '',
        passengers: 1,
        bags: 0,
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        error: null,
        returnDate: null,
        returnTime: null,
        showReturnFields: false,
        showAdditionalGear: false,
        infantSeat: false,
        childSeat: false,
        boosterSeat: false,
        bicycle: false,
        wheelchair: false,
        extraStop: false,
    };

    componentDidMount() {
        if (this.context && this.context.hasOwnProperty('user') && this.context.user) {
            this.setState({
                firstName: this.context.user.attributes.firstName,
                lastName: this.context.user.attributes.lastName,
                email: this.context.user.attributes.email,
                phoneNumber: this.context.user.attributes.phone,
            }, () => {
                this.props.setFirstName(this.state.firstName);
                this.props.setLastName(this.state.lastName);
                this.props.setEmail(this.state.email);
                this.props.setPhoneNumber(this.state.phoneNumber);
            });
        }
        if (this.props.pickupAddressOrFlightNumber) {
            this.setState({pickupAddressOrFlightNumber: this.props.pickupAddressOrFlightNumber})
        }
        if (this.props.dropOffAddress) {
            this.setState({dropOffAddress: this.props.dropOffAddress})
        }
        if (this.props.message) {
            this.setState({message: this.props.message})
        }
        if (this.props.passengers) {
            this.setState({passengers: this.props.passengers})
        }
        if (this.props.bags) {
            this.setState({bags: this.props.bags})
        }
        if (this.props.firstName) {
            this.setState({firstName: this.props.firstName})
        }
        if (this.props.lastName) {
            this.setState({lastName: this.props.lastName})
        }
        if (this.props.email) {
            this.setState({email: this.props.email})
        }
        if (this.props.phoneNumber) {
            this.setState({phoneNumber: this.props.phoneNumber})
        }
        if (this.props.returnDate) {
            this.setState({returnDate: this.props.returnDate, showReturnFields: true})
        }
        if (this.props.returnTime) {
            this.setState({returnTime: this.props.returnTime, showReturnFields: true})
        }
        if (this.props.infantSeat) {
            this.setState({infantSeat: this.props.infantSeat, showAdditionalGear: true})
        }
        if (this.props.childSeat) {
            this.setState({childSeat: this.props.childSeat, showAdditionalGear: true})
        }
        if (this.props.boosterSeat) {
            this.setState({boosterSeat: this.props.boosterSeat, showAdditionalGear: true})
        }
        if (this.props.bicycle) {
            this.setState({bicycle: this.props.bicycle, showAdditionalGear: true})
        }
        if (this.props.wheelchair) {
            this.setState({wheelchair: this.props.wheelchair, showAdditionalGear: true})
        }
        if (this.props.extraStop) {
            this.setState({extraStop: this.props.extraStop, showAdditionalGear: true})
        }
    }

    calculateDateTimeString = (dateObj) => {
        let month = dateObj.getUTCMonth() + 1;
        if (month < 10) {
            month = `0${month}`;
        }
        const day = dateObj.getUTCDate();
        const year = dateObj.getUTCFullYear();
        let hours = dateObj.getHours();
        let minutes = dateObj.getMinutes();
        if (hours < 10) {
            hours = `0${hours}`;
        }
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }

        return `${year}-${month}-${day} ${hours}:${minutes}:00`;
    };
    removeMessage = () => {
        setTimeout(() => {this.setState({error: null})}, 3000);
    };
    submitForm = async () => {
        if (
            this.state.pickupAddressOrFlightNumber
            && this.state.dropOffAddress
            && this.state.message
            && this.state.passengers
            && this.state.bags
            && this.state.firstName
            && this.state.lastName
            && this.state.email
            && this.state.phoneNumber
        ) {
            if (this.state.passengers > this.props.maxVehiclePassenger[this.props.selectedVehicle.toString()]) {

                this.setState({error: translations[this.context.language].errors.maxPeople}, () => {
                    this.removeMessage();
                });

                return;
            }

            if (this.state.bags > this.props.maxBagsPassenger[this.props.selectedVehicle.toString()]) {
                this.setState({error: translations[this.context.language].errors.maxLuggage}, () => {
                    this.removeMessage();
                });

                return;
            }

            const apiClient = new ApiClient();
            const cookies = new Cookies();
            const lastTransferId = cookies.get('last-transfer-id');
            const dateTime = this.calculateDateTimeString(new Date(this.props.match.params.date + ' ' + this.props.match.params.time));
            let returnDateTime = null;
            if (null !== this.state.returnDate && null !== this.state.returnTime) {
                const returnDateObj = this.state.returnDate;
                returnDateObj.setHours(this.state.returnTime.getHours());
                returnDateObj.setMinutes(this.state.returnTime.getMinutes());
                returnDateTime = this.calculateDateTimeString(returnDateObj);
            }
            this.props.setDateTime(dateTime);
            this.props.setReturnDateTime(returnDateTime);
            if (lastTransferId && 'null' !== lastTransferId) {
                await apiClient.updateTransferBooking(
                    lastTransferId,
                    this.props.from,
                    this.props.to,
                    dateTime,
                    returnDateTime,
                    this.state.pickupAddressOrFlightNumber,
                    this.state.dropOffAddress,
                    this.state.message,
                    this.state.passengers,
                    this.state.bags,
                    this.state.firstName,
                    this.state.lastName,
                    this.state.email,
                    this.state.phoneNumber,
                    this.props.price,
                    null,
                    this.props.selectedVehicle.toString(),
                    null,
                    this.state.infantSeat,
                    this.state.childSeat,
                    this.state.boosterSeat,
                    this.state.bicycle,
                    this.state.wheelchair,
                    this.state.extraStop,
                ).then(
                    async (result) => {
                        if (result.data) {
                            const date = new Date();
                            date.setDate(date.getDate() + 7);
                            await cookies.set('last-transfer-id', result.data.id, {expires: date, path: '/'});
                            await cookies.set('last-transfer-from', result.data.attributes.fromLocation, {expires: date, path: '/'});
                            await cookies.set('last-transfer-to', result.data.attributes.toLocation, {expires: date, path: '/'});
                        }
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            } else {
                await apiClient.createTransferBooking(
                    this.props.from,
                    this.props.to,
                    dateTime,
                    returnDateTime,
                    this.state.pickupAddressOrFlightNumber,
                    this.state.dropOffAddress,
                    this.state.message,
                    this.state.passengers,
                    this.state.bags,
                    this.state.firstName,
                    this.state.lastName,
                    this.state.email,
                    this.state.phoneNumber,
                    this.props.price,
                    null,
                    this.props.selectedVehicle.toString(),
                    null,
                    this.state.infantSeat,
                    this.state.childSeat,
                    this.state.boosterSeat,
                    this.state.bicycle,
                    this.state.wheelchair,
                    this.state.extraStop,
                ).then(
                    async (result) => {
                        if (result.data) {
                            const date = new Date();
                            date.setDate(date.getDate() + 7);
                            await cookies.set('last-transfer-id', result.data.id, {expires: date, path: '/'});
                            await cookies.set('last-transfer-from', result.data.attributes.fromLocation, {expires: date, path: '/'});
                            await cookies.set('last-transfer-to', result.data.attributes.toLocation, {expires: date, path: '/'});
                        }
                    },
                    (error) => {
                        console.log(error);
                    }
                );
            }

            this.props.changeStep((this.context && this.context.hasOwnProperty('user') && this.context.user) ? 4 : 3);
        } else {
            this.setState({error: translations[this.context.language].errors.fillInfo}, () => {
                this.removeMessage();
            });
        }
    };

    renderPassengerOptions = () => {
        const passengersOptions = [];
        for (let i = 1; i <= this.props.maxVehiclePassenger[this.props.selectedVehicle.toString()]; i++) {
            passengersOptions.push({
                value: i,
                label: this.normalizeDropDownValue(i),
            });
        }

        return passengersOptions;
    };

    renderBagsOptions = () => {
        const bagsOptions = [];
        for (let i = 0; i <= this.props.maxBagsPassenger[this.props.selectedVehicle.toString()]; i++) {
            bagsOptions.push({
                value: i,
                label: this.normalizeDropDownValue(i),
            });
        }

        return bagsOptions;
    };

    normalizeDropDownValue = (value) => {
        return value < 10 ? '0' + value.toString() : value.toString();
    };

    render() {
        return (
            <LanguageContext.Consumer>
                {({language}) => (
                    <UserContext.Consumer>
                        {({user}) => {
                            return (

                                <section className="options-area">
                                    {this.state.error &&
                                        <ErrorAlert
                                            close={() => {this.setState({error: null})}}
                                            message={this.state.error}
                                        />
                                    }
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-lg-2">
                                                <div className="form-options">
                                                    {this.state.showAdditionalGear ?
                                                        <React.Fragment>
                                                            <h3>{translations[language].addExtraFeatures}</h3>
                                                            <div className="dodatno4">
                                                                <label className="black">{translations[language].additional.infant}</label>
                                                                <div className="one-half">
                                                                <div className="remember">
                                                                    <input type="checkbox" name="infantSeat" defaultChecked={this.state.infantSeat} onClick={() => {
                                                                        this.setState({infantSeat: !this.state.infantSeat});
                                                                        this.props.setInfantSeat(!this.state.infantSeat);
                                                                    }}/>
                                                                    <label className="black">10€</label>
                                                                </div>
                                                                </div>
                                                                <label className="black">{translations[language].additional.child}</label>
                                                                <div className="one-half">
                                                                <div className="remember">
                                                                    <input type="checkbox" name="childSeat" defaultChecked={this.state.childSeat} onClick={() => {
                                                                        this.setState({childSeat: !this.state.childSeat});
                                                                        this.props.setChildSeat(!this.state.childSeat);
                                                                    }}/>
                                                                    <label className="black">5€</label>
                                                                </div>
                                                                </div>
                                                                <label className="black">{translations[language].additional.booster}</label>
                                                                <div className="one-half">
                                                                <div className="remember">
                                                                    <input type="checkbox" name="boosterSeat" defaultChecked={this.state.boosterSeat} onClick={() => {
                                                                        this.setState({boosterSeat: !this.state.boosterSeat});
                                                                        this.props.setBoosterSeat(!this.state.boosterSeat);
                                                                    }}/>
                                                                    <label className="black">5€</label>
                                                                </div>
                                                                </div>
                                                                <label className="black">{translations[language].additional.bicycle}</label>
                                                                <div className="one-half">
                                                                <div className="remember">
                                                                    <input type="checkbox" name="bicycle" defaultChecked={this.state.bicycle} onClick={() => {
                                                                        this.setState({bicycle: !this.state.bicycle});
                                                                        this.props.setBicycle(!this.state.bicycle);
                                                                    }}/>
                                                                    <label className="black">5€</label>
                                                                </div>
                                                                </div>
                                                                <label className="black">{translations[language].additional.wheelChair}</label>
                                                                <div className="one-half">
                                                                <div className="remember">
                                                                    <input type="checkbox" name="wheelchair" defaultChecked={this.state.wheelchair} onClick={() => {
                                                                        this.setState({wheelchair: !this.state.wheelchair});
                                                                        this.props.setWheelchair(!this.state.wheelchair);
                                                                    }}/>
                                                                    <label className="black">0€</label>
                                                                </div>
                                                                </div>
                                                                <label className="black">{translations[language].additional.extra}</label>
                                                                <div className="one-half">
                                                                <div className="remember">
                                                                    <input type="checkbox" name="extraStop" defaultChecked={this.state.extraStop} onClick={() => {
                                                                        this.setState({extraStop: !this.state.extraStop});
                                                                        this.props.setExtraStop(!this.state.extraStop);
                                                                    }}/>
                                                                    <label className="black">5€</label>
                                                                </div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <button className="no-bg clr-1 border-1"
                                                                        onClick={() => {
                                                                            this.setState({
                                                                                showAdditionalGear: false,
                                                                                infantSeat: false,
                                                                                childSeat: false,
                                                                                boosterSeat: false,
                                                                                bicycle: false,
                                                                                wheelchair: false,
                                                                                extraStop: false,
                                                                            })
                                                                        }}>{translations[language].remove}</button>
                                                            </div>
                                                        </React.Fragment>
                                                        : <div className="center"><h4>{translations[language].additional.extraFeatures}</h4><div className="botun">
                                                            <button className="no-bg clr-1 border-1" onClick={() => {
                                                                this.setState({showAdditionalGear: true})
                                                            }}>{translations[language].extraFeatures}</button>
                                                        </div></div>}
                                                </div>
                                            </div>
                                            <div className="col-lg-8">
                                                <div className="form-options">
                                                    <form action="#" method="post" acceptCharset="utf-8">
                                                        <div className="one-half number-pass">
                                                            <label
                                                                htmlFor="number-pass">{translations[language].optionsPage.passengers}</label>
                                                            <div className="select">
                                                                <select name="number-pass" onChange={(e) => {
                                                                    this.setState({passengers: e.target.value});
                                                                    this.props.setNumberOfPassengers(e.target.value);
                                                                    this.setState({error: null});

                                                                }}>
                                                                    {this.renderPassengerOptions().map((passenger) => {
                                                                        return (
                                                                            <option
                                                                                className={this.state.error && !this.state.passengers? 'neka-klasa' : ''}
                                                                                key={passenger.value}
                                                                                value={this.state.passengers}
                                                                            >
                                                                                {passenger.label}
                                                                            </option>
                                                                        );
                                                                    })}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="one-half number-bags">
                                                            <label
                                                                htmlFor="number-bags">{translations[language].optionsPage.bags}</label>
                                                            <div className="select">
                                                                <select name="number-pass" onChange={(e) => {
                                                                    this.setState({bags: e.target.value});
                                                                    this.props.setBags(e.target.value);
                                                                    this.setState({error: null});
                                                                }}>
                                                                    {this.renderBagsOptions().map((bag) => {
                                                                        return (
                                                                            <option
                                                                                className={this.state.error && !this.state.bags? 'neka-klasa' : ''}
                                                                                key={bag.value}
                                                                                value={this.state.bags}
                                                                            >
                                                                                {bag.label}
                                                                            </option>
                                                                        );
                                                                    })}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="one-half first-name">
                                                            <label
                                                                htmlFor="pickupAddressOrFlightNumber">{translations[language].optionsPage.pickup}</label>
                                                            <input
                                                                className={this.state.error && !this.state.pickupAddressOrFlightNumber? 'neka-klasa' : ''}
                                                                name='pickupAddressOrFlightNumber'
                                                                type="text"
                                                                placeholder="Antuna Mihanovića 29"
                                                                value={this.state.pickupAddressOrFlightNumber}
                                                                onChange={(e) => {
                                                                    this.setState({pickupAddressOrFlightNumber: e.target.value});
                                                                    this.props.setPickupAddressOrFlightNumber(e.target.value);
                                                                    this.setState({error: null});
                                                                }}/>
                                                        </div>
                                                        <div className="one-half first-name">
                                                            <label
                                                                htmlFor="dropOffAddress">{translations[language].optionsPage.dropoff}</label>
                                                            <input
                                                                className={this.state.error && !this.state.dropOffAddress? 'neka-klasa' : ''}
                                                                type="text"
                                                                name="dropOffAddress"
                                                                placeholder="Antuna Mihanovića 29"
                                                                value={this.state.dropOffAddress}
                                                                onChange={(e) => {
                                                                    this.setState({dropOffAddress: e.target.value});
                                                                    this.props.setDropOffAddress(e.target.value);
                                                                    this.setState({error: null});
                                                                }}
                                                            />
                                                        </div>

                                                        <div className="one-half first-name">
                                                            <label
                                                                htmlFor="firstname">{translations[language].optionsPage.firstName}</label>
                                                            <input
                                                                className={this.state.error && !this.state.firstName? 'neka-klasa' : ''}
                                                                type="text"
                                                                name="firstname"
                                                                value={this.state.firstName}
                                                                onChange={(e) => {
                                                                    this.setState({firstName: e.target.value});
                                                                    this.props.setFirstName(e.target.value);
                                                                    this.setState({error: null});
                                                                }}
                                                                placeholder="Mate"
                                                            />
                                                        </div>
                                                        <div className="one-half last-name">
                                                            <label
                                                                htmlFor="lastname">{translations[language].optionsPage.lastName}</label>
                                                            <input
                                                                className={this.state.error && !this.state.lastName? 'neka-klasa' : ''}
                                                                type="text"
                                                                name="lastname"
                                                                value={this.state.lastName}
                                                                onChange={(e) => {
                                                                    this.setState({lastName: e.target.value});
                                                                    this.props.setLastName(e.target.value);
                                                                    this.setState({error: null});
                                                                }}
                                                                placeholder="Matić"
                                                            />
                                                        </div>
                                                        <div className="one-half email">
                                                            <label
                                                                htmlFor="email">{translations[language].optionsPage.email}</label>
                                                            <input type="text" name="email"
                                                                   className={this.state.error && !this.state.email? 'neka-klasa' : ''}
                                                                   placeholder="info@croatia-airport-transfer.com"
                                                                   value={this.state.email}
                                                                   onChange={(e) => {
                                                                       this.setState({email: e.target.value});
                                                                       this.props.setEmail(e.target.value);
                                                                       this.setState({error: null});
                                                                   }}
                                                            />
                                                        </div>
                                                        <div className="one-half phone">
                                                            <label
                                                                htmlFor="phone">{translations[language].optionsPage.phone}</label>
                                                            <input type="text" name="phone"
                                                                   className={this.state.error && !this.state.phoneNumber? 'neka-klasa' : ''}
                                                                   placeholder="+385 95 816 0522"
                                                                   value={this.state.phoneNumber}
                                                                   onChange={(e) => {
                                                                       this.setState({phoneNumber: e.target.value});
                                                                       this.props.setPhoneNumber(e.target.value);
                                                                       this.setState({error: null});
                                                                   }}
                                                            />
                                                        </div>
                                                        <div className="infomation">
                                                            <label
                                                                htmlFor="infomation">{translations[language].optionsPage.additional}</label>
                                                            <textarea
                                                                className={this.state.error && !this.state.message? 'neka-klasa' : ''}
                                                                name="infomation" id="infomation"
                                                                      placeholder="Additional informations like baby seat, water, etc."
                                                                      value={this.state.message}
                                                                      onChange={(e) => {
                                                                          this.setState({message: e.target.value});
                                                                          this.props.setMessage(e.target.value);
                                                                          this.setState({error: null});
                                                                      }}/>
                                                        </div>
                                                    </form>
                                                    <div className="btn-submit">
                                                        <button
                                                            onClick={this.submitForm}>{translations[language].continue}</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-2">
                                                <div className="form-options">
                                                    {this.state.showReturnFields ?
                                                        <React.Fragment>
                                                            <h3>{translations[language].additional.returnTransfer}</h3>
                                                            <div className="dodatno1">
                                                                <DatePicker
                                                                    type="text"
                                                                    name="returnDate"
                                                                    placeholderText={translations[language].datePlaceholder}
                                                                    selected={this.state.returnDate}
                                                                    onChange={(date) => {
                                                                        this.setState({returnDate: date});
                                                                        this.props.setReturnDate(date);
                                                                    }}
                                                                    dateFormat={'yyyy-MM-dd'}
                                                                    calendarClassName="kalendar_pozadina"
                                                                    isClearable
                                                                />
                                                            </div>
                                                            <div className="dodatno2">
                                                                <DatePicker
                                                                    selected={this.state.returnTime}
                                                                    onChange={(time) => {
                                                                        this.setState({returnTime: time});
                                                                        this.props.setReturnTime(time);
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
                                                            <div className="dodatno3 center">
                                                                <button className="no-bg clr-1 border-1" onClick={() => {
                                                                    this.setState({showReturnFields: false, returnDate: false, returnTime: false})
                                                                }}>Remove</button>
                                                            </div>
                                                        </React.Fragment>
                                                        : <div className="center"><h4>{translations[language].additional.returnTransfer}</h4>
                                                        <div className="botun">
                                                            <button className="no-bg clr-1 border-1" onClick={() => {
                                                                this.setState({showReturnFields: true})
                                                            }}>{translations[language].returnTransfer}</button>
                                                        </div></div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </section>
                            )
                        }}
                    </UserContext.Consumer>
                )}
            </LanguageContext.Consumer>
        )
    }
}

export default withRouter(Options);
Options.contextType = UserContext;
