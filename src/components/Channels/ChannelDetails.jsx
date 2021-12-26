import React from 'react'

// CSS
import './styles/channeldetails.css';

const ChannelDetails = ({ topic, subtopic }) => {
    return (

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