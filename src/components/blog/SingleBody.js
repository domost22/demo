import React from "react";
import {LanguageContext} from "../../context/LanguageContext";


class SingleBody extends React.Component {
    state = {
        openedIndex: 1,
    };

    setOpenedIndex = (index) => {
        if (this.state.openedIndex === index) {
            index = null;
        }
        this.setState({openedIndex: index});
    };
    render() {
        return (
            <LanguageContext.Consumer>
                {({language}) => (

                    <div className="post-content">
                        <p>{this.props.body_main}</p>
                         <blockquote>
                            <span>“</span>
                            <p>
                                {this.props.body_highlight}
                            </p>
                             <span>“</span>

                        </blockquote>
                        <p> {this.props.body_footer}</p>
                    </div>
                )}
            </LanguageContext.Consumer>
        )
    }
}
export default SingleBody;
