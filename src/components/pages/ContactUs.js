import React from "react";
import ContactForm from "../contactus/ContactForm";
import Map from "../contactus/Map";

class ContactUs extends React.Component {
    render() {
        return (
            <div>
                <Map/>
                <ContactForm/>
            </div>
        )
    }
}

export default ContactUs;
