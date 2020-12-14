import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "../src/translations/i18n";
import { GlobalProvider } from "./context/Provider";
import FishCompetitionApp from "./FishCompetitionApp";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

ReactDOM.render(
  <GlobalProvider>
    <BrowserRouter>
      <Suspense fallback={<div>Loading</div>}>
        <FishCompetitionApp />
      </Suspense>
    </BrowserRouter>
  </GlobalProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
