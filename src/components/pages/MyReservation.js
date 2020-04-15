import React from "react";
import {LanguageContext} from "../../context/LanguageContext";
import {UserContext} from "../../context/UserContext";
import {withRouter} from 'react-router-dom';
import MyTable from "../myreservation/MyTable";
import ApiClient from "../../network/ApiClient";
import Loader from "../general/Loader";
import Cookies from "universal-cookie";
import {translations} from "../../translation/Translations";

class MyReservation extends React.Component {
    state = {
        loadingReservations: false,
        reservations: [],
        canceling: false,
        message: null,
    };

    componentDidMount() {
        const cookies = new Cookies();
        if (!cookies.get('userId') || 'null' === cookies.get('userId')) {
            this.props.history.push('/');
        }

        this.setState({loadingReservations: true}, () => {
            const cookies = new Cookies();
            const apiClient = new ApiClient();
            const userId = cookies.get('userId');
            if (userId && 'null' !== userId) {
                apiClient.getUserReservations(userId).then(
                    (result) => {
                        this.setState({reservations: result.data, loadingReservations: false});
                    },
                    (error) => {
                        this.setState({loadingReservations: false});
                    }
                );
            } else {
                this.setState({loadingReservations: false});
            }
        });
    }

    cancelBooking = async (date, cancellationToken, transferBookingId) => {
        if (date > new Date()) {
            this.setState({message: translations[this.context.language].errors.transferPassed});
            this.removeMessage();

            return;
        }
        this.setState({canceling: true}, async () => {
            const apiClient = new ApiClient();
                await apiClient.deleteTransferBooking(transferBookingId, cancellationToken).then(
                    (result) => {
                        this.setState({canceling: false, message: translations[this.context.language].errors.transferCancelled});
                    },
                    (error) => {
                        this.setState({canceling: false, message: translations[this.context.language].errors.transferCancelledError});
                    }
                );
        });
        this.removeMessage();
    };

    removeMessage = () => {
        setTimeout(() => {this.setState({message: null})}, 3000);
    };

    render() {
        return (
            <LanguageContext.Consumer>
                {({language}) => (
                    <UserContext.Consumer>
                        {({user}) => {
                            if (this.state.loadingReservations || !user) {
                                return (<Loader/>);
                            }
                            return (
                                <div>
                                    {this.state.message && <p>{this.state.message} </p>}
                                    <section className="template-title has-over  top100">
                                        <div className="container top100"><h3 className="title">{translations[language].reservations.welcome} {user.attributes.firstName} {user.attributes.lastName}</h3></div>
                                        <p className="subtitle">{translations[language].reservations.title}</p>
                                    </section>
                                    {this.state.reservations.length > 0 ?
                                    <MyTable reservations={this.state.reservations}
                                             cancelBooking={this.cancelBooking}
                                    />
                                        : <div className=" pb-5 center"><h3>{translations[language].noReservations}</h3></div>}
                                </div>
                            )
                        }}
                    </UserContext.Consumer>
                )}
            </LanguageContext.Consumer>

        )
    }
}

export default withRouter(MyReservation);
MyReservation.contextType = UserContext;
