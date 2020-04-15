import React from "react";
import SuccessForm from "../checkout/SuccessForm";
import Cookies from "universal-cookie";
import {withRouter} from 'react-router-dom';
import ApiClient from "../../network/ApiClient";
import Loader from "../general/Loader";
import {LanguageContext} from "../../context/LanguageContext";
import {translations} from "../../translation/Translations";

class Success extends React.Component {
    state = {
        transferBooking: null,
        loadingLastTransfer: true,
    };

    componentDidMount() {
        const cookies = new Cookies();
        const transferBooked = cookies.get('transfer-booked');
        if (transferBooked && 'null' !== transferBooked) {
            this.setState({loadingLastTransfer: true}, async () => {
                const apiClient = new ApiClient();
                await apiClient.getTransferBookingById(transferBooked).then(
                    (result) => {
                        this.setState({loadingLastTransfer: false});
                        if (result.data) {
                            this.setState({transferBooking: result.data});
                            cookies.set('transfer-booked', null, {path: '/'});
                        }
                    },
                    (error) => {
                        this.setState({loadingLastTransfer: false});
                    }
                );
            });
        } else {
            this.props.history.push('/');
        }
    }

    render() {

        if (this.state.loadingLastTransfer) {
            return (<Loader/>);
        }

        if (!this.state.transferBooking && !this.state.loadingLastTransfer) {
            return (
                <LanguageContext.Consumer>
                    {({language}) => (
                        <ul className="alert-box">

                            <li className='danger'><img src={require('../../images/icon/alert.png')} alt=""/>{translations[language].errors.fetchTransfer}<span><img src={require('../../images/icon/delete.png')} alt=""/></span></li>

                        </ul>

                    )}
                </LanguageContext.Consumer>
            );
        }

        return (

            <div>
                <SuccessForm transferBooking={this.state.transferBooking}/>
            </div>

        )
    }
}

export default withRouter(Success);
Success.contextType = LanguageContext;