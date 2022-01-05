import React from "react";

// CSS
import "./styles/errmsg.css";

const ErrMsg = (props) => {

  // Props
  const { error, message } = props;

  return (
      <div className="error-Message">
          <div
            className={
              error ? 
              "notif-Txt error" : 
              "notif-Txt success"
            }
          >
            {message}
          </div>
      </div>
  );
}

export default ErrMsg;