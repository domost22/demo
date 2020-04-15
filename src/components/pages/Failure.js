import React from "react";
import {LanguageContext} from "../../context/LanguageContext";
import {translations} from "../../translation/Translations";
import Cookies from "universal-cookie";
import ApiClient from "../../network/ApiClient";
import {withRouter} from 'react-router-dom';

class Failure extends React.Component {
    componentDidMount(): void {
        const cookies = new Cookies();
        const transferBooked = cookies.get('transfer-booked');
        if (transferBooked && 'null' !== transferBooked) {
            cookies.set('transfer-booked', null, {path: '/'});
            const apiClient = new ApiClient();
            apiClient.getTransferBookingById(transferBooked)
                .then(
                async (result) => {
                    if (result.data) {
                        apiClient.updateTransferBooking(
                            result.data.id,
                            result.data.attributes.fromLocation,
                            result.data.attributes.toLocation,
                            result.data.attributes.transferDate,
                            result.data.attributes.returnDateTime,
                            result.data.attributes.pickupAddressOrFlightNumber,
                            result.data.attributes.dropOffAddress,
                            result.data.attributes.message,
                            result.data.attributes.passengers,
                            result.data.attributes.bags,
                            result.data.attributes.firstName,
                            result.data.attributes.lastName,
                            result.data.attributes.email,
                            result.data.attributes.phoneNumber,
                            result.data.attributes.price,
                            null,
                            result.data.attributes.selectedVehicle,
                            null,
                            result.data.attributes.infantSeat,
                            result.data.attributes.childSeat,
                            result.data.attributes.boosterSeat,
                            result.data.attributes.bicycle,
                            result.data.attributes.wheelchair,
                            result.data.attributes.extraStop,
                        ).then(
                            async (result) => {
                                if (result.data) {
                                    await cookies.set('transfer-booked', null, {path: '/'});
                                }
                            },
                            (error) => {
                                console.log(error);
                            }
                        );
                    }
                },
                (error) => {
                    console.log(error);
                }
            );
        } else {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <LanguageContext.Consumer>
                {({language}) => (
                    <div>
                        {translations[language].transaction_failed}
                    </div>
                )}
            </LanguageContext.Consumer>
        )
    }
}

export default withRouter(Failure);
