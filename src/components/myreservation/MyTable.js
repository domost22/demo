import React from "react";
import {LanguageContext} from "../../context/LanguageContext";
import {translations} from "../../translation/Translations";

class MyTable extends React.Component {
    render() {
        return (
            <LanguageContext.Consumer>
                {({language}) => (
                    <section className="tables-area">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-1"/>
                                <div className="col-md-10">

                                    <div className="tables-item">
                                        <table className="border">
                                            <thead className="bg-1">
                                            <tr>
                                                <th>{translations[language].myTable.id}</th>
                                                <th>{translations[language].myTable.route}</th>
                                                <th>{translations[language].myTable.date}</th>
                                                <th>{translations[language].myTable.price}</th>
                                                <th>{translations[language].myTable.status}</th>
                                                <th>{translations[language].myTable.action}</th>
                                            </tr>
                                            </thead>
                                            <tbody className="border">
                                            {this.props.reservations.map((reservation) => {
                                                return (
                                                    <tr key={reservation.id}>
                                                        <td>{reservation.id}</td>
                                                        <td>{reservation.attributes.fromLocation}-{reservation.attributes.toLocation}</td>
                                                        <td>{reservation.attributes.transferDate}</td>
                                                        <td>{reservation.attributes.price} eura</td>
                                                        <td>{null === reservation.attributes.deletedAt ? 'ACTIVE' : 'CANCELA SI BRATE'}</td>
                                                        <td onClick={() => {
                                                            this.props.cancelBooking(reservation.attributes.transferDate, reservation.id, reservation.attributes.cancellationToken)
                                                        }}>{null === reservation.attributes.deletedAt ? 'cancel' : ''}</td>
                                                    </tr>
                                                );
                                            })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="col-md-1"/>
                            </div>
                        </div>
                    </section>

                )}
            </LanguageContext.Consumer>
        )
    }
}

export default MyTable;
