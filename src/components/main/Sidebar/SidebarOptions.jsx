import React from "react";

// CSS
import "./styles/sidebaroptions.css";

const SidebarOptions = (props) => {

    // Props
    const { Icon, title } = props;

    return (
      <div className="sidebar-Option-Container">
          {Icon && (
              <Icon 
                fontSize="20px" 
                style={{ 
                  paddingRight: "4px", 
                  color: "white" 
                }} 
              />
          )}

          {Icon ? (
              <h3>{title}</h3>
          ) : (
              <div className="sidebar-Option-Channel">
                <span>#</span> {title}
              </div>
          )}
      </div>
    );
};

export default SidebarOptions;