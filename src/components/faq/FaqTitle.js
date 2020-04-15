import React from "react";

class FaqTitle extends React.Component {
    render() {
        return (
            <div className={this.props.opened ? 'toggle-title active' : 'toggle-title'} onClick={() => {
                this.props.openFaq(this.props.index)
            }}>
                {this.props.title}
                <span><img src={require(`../../images/icon/${this.props.opened ? 'right-2.png' : 'right-4.png'}`)} alt=""/></span>
            </div>
        )
    }
}

export default FaqTitle;
