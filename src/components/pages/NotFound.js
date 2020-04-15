import React from "react";

class NotFound extends React.Component {
    componentDidMount() {
        //this.props.hideHeader();
    }

    render() {
        return (
            <div className="layout-theme error-page">
                <section className="error-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="error">
                                    <div className="images-error">
                                        <img src={require('../../images/template/error.png')} alt=""/>
                                    </div>
                                    <div className="content-error">
                                        <h2>OHH! PAGE NOT FOUND</h2>
                                        <p>It seems we can’t find what you’re looking for. Perhaps searching can help or
                                            go back to Homepage.</p>
                                        <div className="form-search-error">
                                            <form action="#" method="get" acceptCharset="utf-8">
                                                <input type="text" name="search" placeholder="Search Again"/>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default NotFound;
