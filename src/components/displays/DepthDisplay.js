import React from "react";
import { useGlobalContext } from "../../context";

const DepthDisplay = (({ depth }) => {
    const { formats } = useGlobalContext();

    if (formats.depthFormat === "m") {
        depth = Math.round(depth * 10) / 10;
        return <div className="text"><span className="data">{depth}</span>m</div>
    } else if (formats.depthFormat === "feet") {
        depth = Math.round(depth * 33) / 10;
        return <div className="text"><span className="data">{depth}</span>feet</div>
    }
});

export default DepthDisplay