import React from "react";

class SingleImage extends React.Component {
    render() {
        return (
            <div className="image-post">
                <img src={require(`../../images/blog/${this.props.image}.jpg`)} alt=""/>
            </div>
        );
    }
}

export default SingleImage;
