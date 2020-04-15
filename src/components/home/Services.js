import React from "react";
import ServicesTab from "../services/ServicesTab";
import IconBox from "../general/IconBox";

class Services extends React.Component {
    state = {
        currentOption: 1,

    };

    render() {
        return(
            <section>
                <ServicesTab />
               <IconBox/>
            </section>
        )
    };
}

export default Services
