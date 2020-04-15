import React from "react";
import Search from "../booking/Search";
import BookingSteps from "../booking/BookingSteps";
import SelectVehicle from "../booking/SelectVehicle";
import Options from "../pages/Options";
import {withRouter} from 'react-router-dom';
import LoginForm from "../login/LoginForm";
import BookingMessage from "../booking/BookingMessage";
import {UserContext} from "../../context/UserContext";
import ApiClient from "../../network/ApiClient";
import Payment from "./Payment";
import RegisterForm from "../register/RegisterForm";
import Cookies from 'universal-cookie';
import LocationField from "../general/LocationField";
import {translations} from "../../translation/Translations";
import {LanguageContext} from "../../context/LanguageContext";
import Notification from "../general/Notification";


class Booking extends React.Component {
    cookies = new Cookies();

    state = {
        selectedVehicle: null,
        pickupAddressOrFlightNumber: null,
        dropOffAddress: null,
        message: null,
        passengers: null,
        bags: null,
        firstName: null,
        lastName: null,
        email: null,
        phoneNumber: null,
        price: null,
        currentStep: 1,
        bookingStepsValidationMessage: '',
        isSearchBarOpened: false,
        fetchingPrice: false,
        fromId: null,
        toId: null,
        showLogin: true,
        showRegister: false,
        from: null,
        to: null,
        loadingLastTransfer: false,
        dateTime: null,
        active: null,
        fromSearch: null,
        fromIdSearch: null,
        toSearch: null,
        toIdSearch: null,
        dateSearch: null,
        timeSearch: null,
        error: null,
        returnDate: null,
        returnTime: null,
        returnDateTime: null,
        tab: 'airport',
        infantSeat: false,
        childSeat: false,
        boosterSeat: false,
        bicycle: false,
        wheelchair: false,
        extraStop: false,
        distance: 0,
        time: 0,
        pricePremium: 0,
        priceBusiness: 0,
        priceVan: 0,
        priceMinibus: 0,
        lastTransferModal: false,
    };

    maxVehiclePassenger = {
        "1": 3,
        "2": 3,
        "3": 7,
        "4": 19,
    };

    maxBagsPassenger = {
        "1": 3,
        "2": 3,
        "3": 7,
        "4": 19,
    };

    priceMap = {
        "1": "pricePremium",
        "2": "priceBusiness",
        "3": "priceVan",
        "4": "priceMinibus",
    };

    async componentDidMount() {
        window.scrollTo(0, 0);
        await this.setFromAndToId();
        if (this.props.location.search) {
            const queryParams = this.props.location.search.substring(1).split('&');
            queryParams.forEach((queryParam) => {
                const paramSplit = queryParam.split('=');
                if (2 === paramSplit.length && 'tab' === paramSplit[0]) {
                    this.setState({tab: paramSplit[1]});
                }
            });
        }
        if (null === this.state.price && this.state.from && this.state.to) {
            this.setState({fetchingPrice: true}, () => {
                this.fetchPriceByGoogleDistance();
            });
        }
        const cookies = new Cookies();
        const lastTransferId = cookies.get('last-transfer-id');
        if (lastTransferId && 'undefined' !== lastTransferId && 'null' !== lastTransferId) {
            this.setState({lastTransferModal: true});
        }

        if (!this.props.match.params.date) {
            this.setState({isSearchBarOpened: true});
        }
    }

    loadLastTransfer = (lastTransferId) => {
        this.setState({loadingLastTransfer: true}, async () => {
            const apiClient = new ApiClient();
            await apiClient.getTransferBookingById(lastTransferId).then(
                (result) => {
                    if (result.data && result.data.id === lastTransferId && null === result.data.attributes.paidBy && this.state.from === result.data.attributes.fromLocation && this.state.to === result.data.attributes.toLocation) {
                        this.setState({
                            lastTransferModal: false,
                            selectedVehicle: parseInt(result.data.attributes.vehicleType),
                            pickupAddressOrFlightNumber: result.data.attributes.pickUpAddressOrFlightNumber,
                            dropOffAddress: result.data.attributes.dropOffAddress,
                            message: result.data.attributes.message,
                            passengers: result.data.attributes.passengers,
                            bags: result.data.attributes.bags,
                            firstName: result.data.attributes.firstName,
                            lastName: result.data.attributes.lastName,
                            email: result.data.attributes.email,
                            phoneNumber: result.data.attributes.phone,
                            from: result.data.attributes.fromLocation,
                            to: result.data.attributes.toLocation,
                            currentStep: 2,
                            infantSeat: result.data.attributes.infantSeat,
                            childSeat: result.data.attributes.childSeat,
                            boosterSeat: result.data.attributes.boosterSeat,
                            bicycle: result.data.attributes.bicycle,
                            wheelchair: result.data.attributes.wheelchair,
                            extraStop: result.data.attributes.extraStop,
                            price: result.data.attributes.price,
                            loadingLastTransfer: false
                        });
                        if (result.data.attributes.returnDate) {
                            let dateTimeParts = result.data.attributes.returnDate.split(/[- :]/);
                            dateTimeParts[1]--;
                            this.setState({
                                returnDate: new Date(...dateTimeParts),
                                returnTime: new Date(...dateTimeParts),
                            })
                        }
                    }
                },
                (error) => {
                    this.setState({lastTransferModal: false, loadingLastTransfer: false})
                }
            );
        });
    };

    fetchPriceByGoogleDistance = () => {
        let priceMultiplier = 1;
        if ('hr' === this.context.language) {
            priceMultiplier = 7.5;
        }
        const apiClient = new ApiClient();
        apiClient.getPriceBetweenLocations(this.state.from, this.state.to).then(
            (result) => {
                this.setState({
                    distance: result.data.attributes.distance,
                    time: result.data.attributes.time,
                    pricePremium: result.data.attributes.pricePremium * priceMultiplier,
                    priceBusiness: result.data.attributes.priceBusiness * priceMultiplier,
                    priceVan: result.data.attributes.priceVan * priceMultiplier,
                    priceMinibus: result.data.attributes.priceMinibus * priceMultiplier,
                    fetchingPrice: false
                });
            },
            (error) => {
                this.setState({fetchingPrice: false});
            }
        );
    };

    setFromAndToId = async () => {
        this.setState({from: this.props.match.params.from});
        this.setState({to: this.props.match.params.to});
    };

    changeStep = (step) => {
        if ((null === this.state.selectedVehicle || !this.props.match.params.date || !this.props.match.params.time) && 1 !== step) {
            this.setState({bookingStepsValidationMessage: translations[this.context.language].errors.selectCar});

        } else if (false === this.areOptionsFilled() && step > 2) {
            this.setState({bookingStepsValidationMessage: translations[this.context.language].errors.fillInfo});
        } else {
            this.setState({currentStep: step, bookingStepsValidationMessage: ''});
            window.scrollTo(0, 0);
        }
    };

    setInfantSeat = (infantSeat) => {
        this.setState({infantSeat});
    };

    setChildSeat = (childSeat) => {
        this.setState({childSeat});
    };

    setBoosterSeat = (boosterSeat) => {
        this.setState({boosterSeat});
    };

    setBicycle = (bicycle) => {
        this.setState({bicycle});
    };

    setWheelchair = (wheelchair) => {
        this.setState({wheelchair});
    };

    setExtraStop = (extraStop) => {
        this.setState({extraStop});
    };

    setPickupAddressOrFlightNumber = (pickupAddressOrFlightNumber) => {
        this.setState({pickupAddressOrFlightNumber});
    };

    setNumberOfPassengers = (passengers) => {
        this.setState({passengers});
    };

    setBags = (bags) => {
        this.setState({bags});
    };

    setFirstName = (firstName) => {
        this.setState({firstName});
    };

    setLastName = (lastName) => {
        this.setState({lastName});
    };

    setEmail = (email) => {
        this.setState({email});
    };

    setPhoneNumber = (phoneNumber) => {
        this.setState({phoneNumber});
    };

    setMessage = (message) => {
        this.setState({message});
    };

    expandSearchBar = (isSearchBarOpened) => {
        this.setState({isSearchBarOpened});
    };

    setDateTime = (dateTime) => {
        this.setState({dateTime});
    };

    setReturnDate = (returnDate) => {
        this.setState({returnDate});
    };

    setReturnTime = (returnTime) => {
        this.setState({returnTime});
    };

    setReturnDateTime = (returnDateTime) => {
        this.setState({returnDateTime});
    };

    selectVehicle = (vehicle) => {
        if (!this.props.match.params.date || !this.props.match.params.time) {
            this.setState({bookingStepsValidationMessage: translations[this.context.language].errors.selectCar});

            return;
        }
        this.setState({
            selectedVehicle: vehicle,
            currentStep: 2,
            bookingStepsValidationMessage: '',
            price: this.state[this.priceMap[vehicle]],
        });
        window.scrollTo(0, 0);
    };

    setDropOffAddress = (dropOffAddress) => {
        this.setState({dropOffAddress});
    };

    areOptionsFilled = () => {
        return (
            null !== this.state.pickupAddressOrFlightNumber
            && null !== this.state.dropOffAddress
            && null !== this.state.message
            && null !== this.state.passengers
            && null !== this.state.bags
            && null !== this.state.firstName
            && null !== this.state.lastName
            && null !== this.state.email
            && null !== this.state.phoneNumber
        );
    };

    continueWithoutRegistration = () => {
        this.changeStep(4);
    };

    toLogin = () => {
        this.setState({showLogin: true, showRegister: false});
    };

    toRegister = () => {
        this.setState({showRegister: true, showLogin: false});
    };

    closeLocationPicker = () => {
        this.setState({active: null});
    };

    setFromSearch = (fromSearch) => {
        this.setState({fromSearch});
    };

    setToSearch = (toSearch) => {
        this.setState({toSearch});
    };

    setFromIdSearch = (fromIdSearch) => {
        this.setState({fromIdSearch});
    };

    setToIdSearch = (toIdSearch) => {
        this.setState({toIdSearch});
    };

    setDateSearch = (dateSearch) => {
        this.setState({dateSearch});
    };

    setTimeSearch = (timeSearch) => {
        this.setState({timeSearch});
    };

    clearErrors = () => {
        this.setState({error: null});
    };

    openLocationPicker = (active) => {
        this.setState({active});
    };

    render() {
        return (
            <UserContext.Consumer>
                {({user}) => {
                    let time = new Date();
                    if (this.state.timeSearch) {
                        time = this.state.timeSearch;
                    } else {
                        if (this.props.match.params.time) {
                            let addTime = 0;
                            if ('PM' === this.props.match.params.time.split(' ')[1]) {
                                addTime = 12;
                            }
                            time.setHours(parseInt(this.props.match.params.time.split(':')[0], 10) + addTime);
                            time.setMinutes(this.props.match.params.time.split(':')[1]);
                        } else {
                            time = null;
                        }
                    }
                    return (
                        <div>
                            {this.state.lastTransferModal && <Notification
                                text={'Recover search'}
                                from={this.cookies.get('last-transfer-from')}
                                loading={this.state.loadingLastTransfer}
                                to={this.cookies.get('last-transfer-to')}
                                close={() => {
                                    this.setState({lastTransferModal: false});
                                    this.cookies.set('last-transfer-id', null, {path: '/'});
                                }}
                                confirm={() => {this.loadLastTransfer(this.cookies.get('last-transfer-id'))}}
                            />}
                            <BookingSteps
                                changeStep={this.changeStep}
                                currentStep={this.state.currentStep}
                                expandSearchBar={this.expandSearchBar}
                                isSearchBarOpened={this.state.isSearchBarOpened}
                            />
                            {'' !== this.state.bookingStepsValidationMessage &&
                            <BookingMessage message={this.state.bookingStepsValidationMessage} close={() => this.setState({bookingStepsValidationMessage: null})}/>}
                            {this.state.lastTransferModal}
                            <Search
                                isOpened={this.state.isSearchBarOpened}
                                from={this.state.fromSearch ? this.state.fromSearch : this.props.match.params.from}
                                to={this.state.toSearch ? this.state.toSearch : this.props.match.params.to}
                                date={this.state.dateSearch ? this.state.dateSearch : (this.props.match.params.date ? new Date(this.props.match.params.date) : null)}
                                time={time}
                                locations={this.props.locations}
                                fetchingLocations={false}
                                activator={this.openLocationPicker}
                                changeDate={(date) => {this.setState({dateSearch: date})}}
                                changeTime={(time) => {this.setState({timeSearch: time})}}
                            />
                            {null !== this.state.active && <div className="book-adress open">
                            <span className="close" onClick={this.closeLocationPicker}><img
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
                                            setField={'from' === this.state.active ? this.setFromSearch : this.setToSearch}
                                            clearErrors={this.clearErrors}
                                            locations={this.props.locations}
                                            setId={(id) => {
                                                if ('from' === this.state.active) {
                                                    this.setFromIdSearch(id);
                                                } else {
                                                    this.setToIdSearch(id);
                                                }
                                            }}
                                            fetchingLocations={false}
                                            closeLocationPicker={this.closeLocationPicker}
                                            fieldType={this.state.active}
                                        />
                                    </div>
                                </div>
                            </div>
                            }
                            {1 === this.state.currentStep &&
                            <SelectVehicle selectVehicle={this.selectVehicle}
                                           pricePremium={this.state.pricePremium}
                                           priceBusiness={this.state.priceBusiness}
                                           priceVan={this.state.priceVan}
                                           priceMinibus={this.state.priceMinibus}
                                           fetchingPrice={this.state.fetchingPrice}
                            />
                            }
                            {2 === this.state.currentStep &&
                            <Options
                                setPickupAddressOrFlightNumber={this.setPickupAddressOrFlightNumber}
                                changeStep={this.changeStep}
                                setNumberOfPassengers={this.setNumberOfPassengers}
                                setBags={this.setBags}
                                setFirstName={this.setFirstName}
                                setLastName={this.setLastName}
                                setEmail={this.setEmail}
                                setPhoneNumber={this.setPhoneNumber}
                                setMessage={this.setMessage}
                                setDropOffAddress={this.setDropOffAddress}
                                setReturnDate={this.setReturnDate}
                                setReturnTime={this.setReturnTime}
                                pickupAddressOrFlightNumber={this.state.pickupAddressOrFlightNumber}
                                dropOffAddress={this.state.dropOffAddress}
                                message={this.state.message}
                                passengers={this.state.passengers}
                                bags={this.state.bags}
                                firstName={this.state.firstName}
                                lastName={this.state.lastName}
                                email={this.state.email}
                                phoneNumber={this.state.phoneNumber}
                                from={this.state.from}
                                to={this.state.to}
                                selectedVehicle={this.state.selectedVehicle}
                                price={this.state.price}
                                maxVehiclePassenger={this.maxVehiclePassenger}
                                maxBagsPassenger={this.maxBagsPassenger}
                                setDateTime={this.setDateTime}
                                returnDate={this.state.returnDate}
                                returnTime={this.state.returnTime}
                                setReturnDateTime={this.setReturnDateTime}
                                tab={this.state.tab}
                                setInfantSeat={this.setInfantSeat}
                                setChildSeat={this.setChildSeat}
                                setBoosterSeat={this.setBoosterSeat}
                                setBicycle={this.setBicycle}
                                setWheelchair={this.setWheelchair}
                                setExtraStop={this.setExtraStop}
                                infantSeat={this.state.infantSeat}
                                childSeat={this.state.childSeat}
                                boosterSeat={this.state.boosterSeat}
                                bicycle={this.state.bicycle}
                                wheelchair={this.state.wheelchair}
                                extraStop={this.state.extraStop}
                            />
                            }
                            {3 === this.state.currentStep && !user && this.state.showLogin &&
                            <LoginForm
                                includeTabs={true}
                                toLogin={this.toLogin}
                                toRegister={this.toRegister}
                                continueWithoutRegistration={this.continueWithoutRegistration}
                                show={'login'}
                                setUser={this.props.setUser}
                                onSuccess={() => {
                                    this.changeStep(4);
                                    window.scrollTo(0, 0)
                                }}
                            />
                            }
                            {3 === this.state.currentStep && !user && this.state.showRegister &&
                            <RegisterForm
                                includeTabs={true}
                                toLogin={this.toLogin}
                                toRegister={this.toRegister}
                                continueWithoutRegistration={this.continueWithoutRegistration}
                                show={'register'} setUser={this.props.setUser}
                                onSuccess={() => {
                                    this.changeStep(4);
                                    window.scrollTo(0, 0);
                                }}
                                firstName={this.state.firstName}
                                lastName={this.state.lastName}
                                phoneNumber={this.state.phoneNumber}
                                email={this.state.email}
                            />
                            }
                            {4 === this.state.currentStep &&
                            <Payment
                                includeTabs={true}
                                pickupAddressOrFlightNumber={this.state.pickupAddressOrFlightNumber}
                                dropOffAddress={this.state.dropOffAddress}
                                message={this.state.message}
                                passengers={this.state.passengers}
                                bags={this.state.bags}
                                firstName={this.state.firstName}
                                lastName={this.state.lastName}
                                email={this.state.email}
                                phoneNumber={this.state.phoneNumber}
                                from={this.state.from}
                                to={this.state.to}
                                selectedVehicle={this.state.selectedVehicle}
                                price={this.state.price}
                                maxVehiclePassenger={this.maxVehiclePassenger}
                                maxBagsPassenger={this.maxBagsPassenger}
                                dateTime={this.state.dateTime}
                                returnDate={this.state.returnDate}
                                returnTime={this.state.returnTime}
                                returnDateTime={this.state.returnDateTime}
                                infantSeat={this.state.infantSeat}
                                childSeat={this.state.childSeat}
                                boosterSeat={this.state.boosterSeat}
                                bicycle={this.state.bicycle}
                                wheelchair={this.state.wheelchair}
                                extraStop={this.state.extraStop}
                            />
                            }
                        </div>
                    )
                }}
            </UserContext.Consumer>
        )
    }
}

export default withRouter(Booking);
Booking.contextType = LanguageContext;
