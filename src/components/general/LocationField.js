import React from "react";
import Loader from "./Loader";
import {LanguageContext} from "../../context/LanguageContext";
import {translations} from "../../translation/Translations";

/* global google */

class LocationField extends React.Component {
    state = {
        value: '',
        firstValue: null,
        showDropdown: false,
        filteredLocations: [],
    };

    constructor(props) {
        super(props);
        this.autocompleteInput = React.createRef();
        this.autocomplete = null;
        this.autocompleteListener = null;
    }

    componentDidMount() {
        if (this.props.initialValue) {
            this.setState({value: this.props.initialValue});
        }
        this.autocomplete = new google.maps.places.Autocomplete(
            this.autocompleteInput.current
        );
        this.autocompleteListener = this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.autocompleteInput.hasOwnProperty('focus')) {
            this.autocompleteInput.focus();
        }
    }

    handlePlaceChanged = (e) => {
        const place = this.autocomplete.getPlace();
        if (!place.hasOwnProperty('formatted_address')) {
            if (null !== this.state.firstValue) {
                this.props.setField(this.state.firstValue);
                this.setState({value: ''});
                this.props.closeLocationPicker();
            }

            return;
        }
        this.props.setField(place.formatted_address);
        this.setState({value: ''});
        this.props.closeLocationPicker();
    };

    filterLocations = (term) => {
        const filteredLocations = this.props.locations.filter((location) => {
            return location.attributes.name.includes(term);
        });
        this.setState({filteredLocations});
        if (filteredLocations.length > 0) {
            [].forEach.call(document.getElementsByClassName('pac-container'), (e) => {
                e.setAttribute("style", "display: none;");
            });
        }
    };

    render() {
        return (
            <LanguageContext.Consumer>
                {({language}) => (
                    <div className="search-address">
                        <input className="pic-add" type="text" placeholder={`${translations[language][this.props.fieldType]} ${translations[language].pickUpPlaceholder}`}
                               value={this.state.value}
                               onChange={(e) => {
                                   this.filterLocations(e.target.value);
                                   this.setState({value: e.target.value, showDropdown: true});
                                   this.props.setField(e.target.value);
                                   this.props.clearErrors();
                               }}
                               onKeyDown={() => {
                                   setTimeout(() => {
                                       const googlePlaces = document.getElementsByClassName('pac-container');
                                       if (googlePlaces.length > 0) {
                                           const items = googlePlaces[googlePlaces.length - 1].getElementsByClassName('pac-item-query');
                                           if (items.length > 0) {
                                               this.setState({firstValue: items[0].innerHTML.replace(/<[^>]+>/g, '')});
                                           }
                                       }
                                   }, 300);
                               }}
                               ref={this.autocompleteInput}
                               autoFocus={true}
                               id={'searchInput'}
                        />
                        <button type="submit" className="waves-effect"><img
                            src={require('../../images/icon/arrowad.png')} alt=""/></button>
                        {this.props.fetchingLocations && this.state.showDropdown &&
                        <Loader/>
                        }
                        {!this.props.fetchingLocations && this.props.locations.length > 0 && this.state.showDropdown && '' !== this.state.value &&
                        this.state.filteredLocations.map((location, index) => {
                            return (
                                <ul className="pac-containers" key={index} onClick={() => {
                                    this.setState({value: location.attributes.name, showDropdown: false});
                                    this.props.setField(location.attributes.name);
                                    this.props.setId(location.id);
                                    this.props.closeLocationPicker();
                                }}>
                                    <div className="pac-item"><i className="pad-icon pac-icon-marker"/><span
                                        className="pac-item-query"> {location.attributes.name}</span></div>
                                </ul>

                            );

                        })
                        }
                    </div>
                )}
            </LanguageContext.Consumer>
        )
    }
}

export default LocationField;
