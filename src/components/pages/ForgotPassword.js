import React from "react";


class ForgotPassword extends React.Component {
    render() {
        return(
            <section className="login-booking-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-2" />
                        <div className="col-lg-8">
                             <div className="login-content">
                                <div id="tab-1" className="content-tab">
                                    <div className="login-form">
                                        <form action="#" method="post" acceptCharset="utf-8">
                                          <div className="one-half">
                                              <br/>
                                                  <br/>
                                                  <h2 className="center" >Forgot password ?</h2>
                                              <div className="form-email">
                                                  <label>Email</label>
                                                  <input type="text" placeholder="info@croatia-airport-transfer.com"/>
                                                  <button className="pull-right" type="submit">RESET</button>
                                              </div>
                                          </div>
                            <div className="clearfix"/>
                            <div className="one-half">
                                <div className="btn-submit pull-right">

                                </div>
                            </div>
                            <div className="clearfix"/>
                        </form>
                    </div>
                </div>
            </div>
            </div>
                    </div>
                </div>
            </section>

        )
    }
}

export default ForgotPassword