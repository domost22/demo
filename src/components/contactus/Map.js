import React from "react";

class Map extends React.Component {
    render() {
        return(
            <section id="map">
                <div id="contact-map" className="pdmap">
                    <div className="contact-maps" data-address="Camberwell Victoria 3124, Úc" data-height={441} data-images="images/icon/map.png" data-name="CreativeLayers Map" />
                    <div className="gm-map">
                        <div className="map" />
                    </div>
                </div>
            </section>
        )
    }
}

export default Map

