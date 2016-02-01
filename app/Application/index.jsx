import React from "react";
import styles from "./style";
import FluxComponent from "flummox/component";

import Timeline from "./Timeline";
import VideoPlayer from "./VideoPlayer";
import InputFilter from "./InputFilter";

export default class Application extends React.Component {

    render() {
        return <FluxComponent
            connectToStores="editVideo"
            render={storeState => {
               return <div className="b-page">
                   <VideoPlayer {...storeState} />
                   <Timeline {...storeState} />
                   <InputFilter />
               </div>;
           }} />;
    }
}
