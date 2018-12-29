import * as React from "react";
import * as ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";

import App from "./App";
import Tutor from "./core/Tutor";
import "./index.css";
import layouts from "./layouts";
import levels from "./levels";

const tutor = new Tutor(levels.hebrew);
const rootEl = document.getElementById("root") as HTMLElement;

ReactDOM.render(<App tutor={tutor} layout={layouts.hebrew} />, rootEl);

registerServiceWorker();
