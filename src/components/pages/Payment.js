import React from "react";
import PaymentForm from "../payment/PaymentForm";
import {translations} from "../../translation/Translations";
import {LanguageContext} from "../../context/LanguageContext";
import {withRouter} from 'react-router-dom';
import ApiClient from "../../network/ApiClient";
import Cookies from "universal-cookie";
import ErrorAlert from "../general/ErrorAlert";

class Payment extends React.Component {
    state = {
        show: 'cash',
        termsAccepted: false,
        error: null,
        transferId: null
    };

    componentDidMount(): void {
        const cookies = new Cookies();
        this.setState({transferId: cookies.get('last-transfer-id')}, () => {console.log(this.state.transferId)});
    }

    submitForm = async (e, payment) => {
        if ('cash' === payment && !this.state.termsAccepted) {
            this.setState({error: this.context.lang});

            return;
        }

        const apiClient = new ApiClient();
        const cookies = new Cookies();
        await apiClient.updateTransferBooking(
            this.state.transferId,
            this.props.from,
            this.props.to,
            this.props.dateTime,
            this.props.returnDateTime,
            this.props.pickupAddressOrFlightNumber,
            this.props.dropOffAddress,
            this.props.message,
            this.props.passengers,
            this.props.bags,
            this.props.firstName,
            this.props.lastName,
            this.props.email,
            this.props.phoneNumber,
            this.props.price,
            null,
            this.props.selectedVehicle.toString(),
            payment,
            this.props.infantSeat,
            this.props.childSeat,
            this.props.boosterSeat,
            this.props.bicycle,
            this.props.wheelchair,
            this.props.extraStop,
        ).then(
            async (result) => {
                if (result.data) {
                    await cookies.set('last-transfer-id', null, { path: '/' });
                    await cookies.set('transfer-booked', result.data.id, { path: '/' });
                }
            },
            (error) => {
                console.log(error);
            }
        );

        if ('cash' === payment) {
            this.props.history.push(`/${this.context.language}/${translations[this.context.language].pages.success}`);
        }
    };

    render() {
        return (
            <LanguageContext.Consumer>
                {({language}) => (
            <div className="login-booking top50">
                <ul className="login-tab-list">
                    <li className={'cash' === this.state.show ? 'active' : ''} onClick={() => {
                        this.setState({show: 'cash'})
                    }}><span>CASH</span></li>
                    <li className={'card' === this.state.show ? 'active' : ''} onClick={async (e) => {
                        await this.submitForm(e, 'card');
                        this.setState({show: 'card'})
                    }}><span>CARD</span></li>
                </ul>
                {null !== this.state.error &&   <ErrorAlert
                    close={() => {this.setState({error: null})}}
                    message={this.state.error}
                />}
                {'cash' === this.state.show &&  <div className="btn-submit center ">
                    <div className="one-half">
                        <div className="remember">
                            <input type="checkbox" name="accept" id="accept"/>
                            <label htmlFor="accept" onClick={() => {
                                this.setState({
                                    termsAccepted: !this.state.termsAccepted,
                                    error: null
                                });
                            }}>{translations[language].cash}</label>
                        </div>
                    </div>
                    <div className="top50 bot50">
                    <button type="submit" onClick={(e) => {this.submitForm(e, 'cash')}}>{translations[language].continue}</button>
                    </div>
                </div>}
                {'card' === this.state.show &&
                <PaymentForm
                    price={this.props.price}
                    transferId={this.state.transferId}
                />}
            </div>
                )}
            </LanguageContext.Consumer>
        )
    }
}

export default withRouter(Payment);
Payment.contextType = LanguageContext;
