import React from "react";

class GroupImage extends React.Component {

    render() {
        return (
            <div className="featured-image">
                <img src={require(`../../images/blog/${this.props.img}.webp`)} alt=""/>
            </div>
        )
    }
}

export default GroupImage;
