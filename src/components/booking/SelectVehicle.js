import React from "react";
import {LanguageContext} from "../../context/LanguageContext";
import {translations} from "../../translation/Translations";
import Vehicle from "../../fleet/Vehicle";

class SelectVehicle extends React.Component {
    render() {
        return (
            <LanguageContext.Consumer>
                {({language}) => (
                    <section className="select-vehicle-area">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <Vehicle
                                        name={translations[language].vehicles.premium}
                                        typeName={translations[language].vehicles.premiumName}
                                        description={translations[language].vehicles.premiumDescription}
                                        numberOfPeople={translations[language].vehicles.premiumPeople}
                                        bags={translations[language].vehicles.premiumBags}
                                        vehicleId={1}
                                        selectVehicle={this.props.selectVehicle}
                                        imageName='eklasa.webp'
                                        boxclassName="select-car"
                                        currency={translations[language].currency}
                                        select={translations[language].select}
                                        price={this.props.pricePremium / 100}
                                        fetchingPrice={this.props.fetchingPrice}
                                    />
                                    <Vehicle
                                        name={translations[language].vehicles.business}
                                        typeName={translations[language].vehicles.businessName}
                                        description={translations[language].vehicles.businessDescription}
                                        numberOfPeople={translations[language].vehicles.businessPeople}
                                        bags={translations[language].vehicles.businessBags}
                                        vehicleId={2}
                                        selectVehicle={this.props.selectVehicle}
                                        imageName='sklasa.webp'
                                        className="select-car s1"
                                        boxclassName="select-car s1"
                                        currency={translations[language].currency}
                                        select={translations[language].select}
                                        price={this.props.priceBusiness / 100}
                                        fetchingPrice={this.props.fetchingPrice}
                                    />
                                    <Vehicle
                                        name={translations[language].vehicles.van}
                                        typeName={translations[language].vehicles.vanName}
                                        description={translations[language].vehicles.vanDescription}
                                        numberOfPeople={translations[language].vehicles.vanPeople}
                                        bags={translations[language].vehicles.vanBags}
                                        vehicleId={3}
                                        selectVehicle={this.props.selectVehicle}
                                        imageName='van.webp'
                                         boxclassName="select-car"
                                        currency={translations[language].currency}
                                        select={translations[language].select}
                                        price={this.props.priceVan / 100}
                                        fetchingPrice={this.props.fetchingPrice}
                                    />
                                    <Vehicle
                                        name={translations[language].vehicles.minibus}
                                        typeName={translations[language].vehicles.minibusName}
                                        description={translations[language].vehicles.minibusDescription}
                                        numberOfPeople={translations[language].vehicles.minibusPeople}
                                        bags={translations[language].vehicles.minibusBags}
                                        vehicleId={4}
                                        selectVehicle={this.props.selectVehicle}
                                        imageName='minibus.webp'
                                        boxclassName="select-car s1"
                                        currency={translations[language].currency}
                                        select={translations[language].select}
                                        price={this.props.priceMinibus / 100}
                                        fetchingPrice={this.props.fetchingPrice}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </LanguageContext.Consumer>
        )
    }
}

export default SelectVehicle;
