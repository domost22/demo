import React from "react";
import {LanguageContext} from "../../context/LanguageContext";

class SingleTitle extends React.Component {
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

                    <div className="post-title">
                        <h4>{this.props.title}</h4>
                        <ul>
                            <li className="author">
                                <span><img className="ikona"  src={require('../../images/icon/author.png')} alt="" />{this.props.author}</span>
                            </li>
                            <li className="date">
                                <span><img className="ikona"  src={require('../../images/icon/date.png')} alt="" />{this.props.date}</span>
                            </li>
                        </ul>
                    </div>
                )}
            </LanguageContext.Consumer>
        )
    }
}

export default SingleTitle;
