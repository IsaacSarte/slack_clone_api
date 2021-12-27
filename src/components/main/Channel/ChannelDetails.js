import React from 'react';

// CSS
import "./styles/channeldetails.css";

const ChannelDetails = (props) => {

    // Props
    const {topic, subtopic} = props;

    return (
        /* Channel Details Content */
        <div className="ch-about-details">
            <div className="ch-main-label">
                {topic}
            </div>
            <div className="ch-sub-label">
                {subtopic}
            </div>
        </div>
     
    )
}

export default ChannelDetails;