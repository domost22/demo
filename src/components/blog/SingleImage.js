import React from "react";

class SingleImage extends React.Component {
    render() {
        return (
            <div className="image-post"><img src={require('../../images/icon/thanks.png')} alt=""/>
                <img src={require(`../../images/blog/0${this.props.index}.jpg`)} alt=""/>
            </div>
        );
    }
}

export default SingleImage;
