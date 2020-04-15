import React from "react";
import ApiClient from "../../network/ApiClient";
import Loader from "../general/Loader";
import {LanguageContext} from "../../context/LanguageContext";

class PaymentForm extends React.Component {
    state = {
        loading: false,
        signature: null,
        merchantId: null,
        terminalId: null,
        currency: null,
        purchaseTime: null,
        orderId: null,
        sessionId: null,
    };

    componentDidMount(): void {
        const apiClient = new ApiClient();
        this.setState({loading: true}, () => {
            apiClient.signRbaTransaction(this.props.transferId, this.props.price * 100).then(
                (result) => {
                    this.setState({
                        loading: false,
                        signature: result.data.attributes.signature,
                        merchantId: result.data.attributes.merchantId,
                        terminalId: result.data.attributes.terminalId,
                        currency: result.data.attributes.currency,
                        purchaseTime: result.data.attributes.purchaseTime,
                        orderId: result.data.attributes.orderId,
                        sessionId: result.data.attributes.sessionId,
                    });
                },
                (error) => {
                    this.setState({loading: false});
                }
            );
        });
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if (
            this.state.merchantId
            && this.state.terminalId
            && this.state.orderId
            && this.state.sessionId
            && this.state.purchaseTime
            && this.state.signature
            && this.props.price
            && document.getElementById('form')
        ) {
            document.getElementById('form').submit();
        }
    }

    render() {
        if (this.state.loading) {
            return (<Loader/>);
        }
        return (
            <LanguageContext.Consumer>
                {({language}) => (
                    <form name="ordersend" action="https://uat.rba.hr/rba/enter" method="post" id="form">
                        <input type={'hidden'} name="Version" value="1"/>
                        <input type={'hidden'} name="MerchantID" value={this.state.merchantId}/>
                        <input type={'hidden'} name="TerminalID" value={this.state.terminalId}/>
                        <input type={'hidden'} name="TotalAmount" value={this.props.price * 100 * 7.5}/>
                        <input type={'hidden'} name="Currency" value="980"/>
                        <input type={'hidden'} name="Locale" value={language}/>
                        <input type={'hidden'} name="OrderID" value={this.state.orderId}/>
                        <input type={'hidden'} name="SD" value={this.state.sessionId}/>
                        <input type={'hidden'} name="PurchaseTime" value={this.state.purchaseTime}/>
                        <input type={'hidden'} name="PurchaseDesc" value="description"/>
                        <input type={'hidden'} name="Signature" value={this.state.signature}/>
                        <input type="submit" value="submit" name="btnSubmit"/>
                    </form>
                )}
            </LanguageContext.Consumer>
        )
    }
}

export default PaymentForm;
