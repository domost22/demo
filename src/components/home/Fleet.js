import React from "react";
import FleetTitle from "../fleet/FleetTitle";
import {translations} from "../../translation/Translations";
import {LanguageContext} from "../../context/LanguageContext";
import PremiumCar from "../fleet/PremiumCar";
import PremiumVan from "../fleet/PremiumVan";
import BusinessCar from "../fleet/BusinessCar";
import Van from "../fleet/Van";
import Minibus from "../fleet/Minibus";
class Fleet extends React.Component {
    state = {
        currentOption: 1,

    };
    changeCurrentOption = (currentOption) => {
        this.setState({currentOption});
    };

    render() {
        const {currentOption} = this.state;
        return(
            <LanguageContext.Consumer>
                {({language}) => (
<div>
   <FleetTitle />
    <section className="block-fleet mt">
        <div className="container">
            <ul className="tab_menu tab-container">
                <li className={1 === currentOption ? 'current pointer' : 'pointer'} onClick={() => {this.changeCurrentOption(1)}}><span>{translations[language].fleetOption1}</span></li>
                <li className={2 === currentOption ? 'current pointer' : 'pointer'} onClick={() => {this.changeCurrentOption(2)}}><span>{translations[language].fleetOption2}</span></li>
                <li className={3 === currentOption ? 'current pointer' : 'pointer'} onClick={() => {this.changeCurrentOption(3)}}><span>{translations[language].fleetOption3}</span></li>
            </ul>
            {1 === currentOption &&
            <div  className="fleet-carousel active">
                <div className="owl-carousel owl-theme owl-responsive-1200 owl-loaded">
                    <div className="owl-stage-outer">
                        <div className="owl-stage">
                            <PremiumCar/>
                            <BusinessCar/>
                            <PremiumVan/>
                        </div>
                    </div>
                </div>
            </div>
            }
            {2 === currentOption &&
            <div  className="fleet-carousel active">
                <div className="owl-carousel owl-theme owl-responsive-1200 owl-loaded">
                    <div className="owl-stage-outer">
                        <div className="owl-stage">
                            <Van/>
                            <PremiumVan/>
                        </div>
                    </div>
                </div>
            </div>
            }
            {3 === currentOption &&
            <div  className="fleet-carousel active">
                <div className="owl-carousel owl-theme owl-responsive-1200 owl-loaded">
                    <div className="owl-stage-outer">
                        <div className="owl-stage">
                            <Minibus/>
                        </div>
                    </div>
                </div>
            </div>
            }

        </div>
    </section>
</div>
                )}
            </LanguageContext.Consumer>
        )
    }
}

export default Fleet
