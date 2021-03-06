import "./css/base";

import React from "react";
import ReactDOM from "react-dom";
import Application from "./Application";
import EditVideoFlux from "./flux/EditVideoFlux";
import FluxComponent from "flummox/component";

const flux = new EditVideoFlux();

ReactDOM.render(
    <FluxComponent
        flux={flux}
        render={() => <Application />} />, document.getElementById("app"));

flux.getActions("editVideo").getFilters();
