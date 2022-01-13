import React from "react";
import ReactDOM from "react-dom";
import { SpeechProvider } from '@speechly/react-client';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";

ReactDOM.render(
  <SpeechProvider appId='ef56a9ca-7a78-4995-8885-5219db5b2e2f' language='en-US'>
    <Router>
      <Routes />
    </Router>
  </SpeechProvider>,
  document.getElementById('root')
);
