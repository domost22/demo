import React from "react";
import Slider from '../home/Slider'
import Services from '../home/Services'
import Fleet from '../home/Fleet'
import Banner from "../home/Banner";
import How from "../home/How";
import Why from "../home/Why";
import Excursions from "../home/Excursions";

class Home extends React.Component {

    componentDidMount(): void {
        document.getElementsByTagName('meta')["description"].content = "Croatia airport transfer is the most professional reliable airport transfer service for your travels within and outside Croatia. NO HIDDEN costs, easy booking, pay only deposit while booking. From any airport Zagreb, Zadar, Split, Rijeka, Pula, Osijek, Mali Lošinj, Dubrovnik, Brač to any destination.";
    }

    componentWillUnmount(): void {
        document.getElementsByTagName('meta')["description"].content = '';
    }

    render() {
        return (
            <div>
                <Slider
                    locations={[]}
                    fetchingLocations={this.props.fetchingLocations}
                    setFromId={this.props.setFromId}
                    setToId={this.props.setToId}
                    excursions={this.props.excursions}
                    getExcursions={this.props.getExcursions}
                />
                <Services/>
                <Fleet/>
                <Banner/>
                <How/>
                <Why/>
                <Excursions/>
            </div>
        )
    }
}

export default Home;
