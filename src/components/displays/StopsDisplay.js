import React from "react";
import { useGlobalContext } from "../../context";

const StopsDisplay = ({ stops }) => {
    const { formats } = useGlobalContext();
    const stopsArray = stops.split(", ");

    return (<div className="stops">
        {stopsArray.map((item, index) => {
            const data = item.split('@');
            let toReturn = "";
            if (data.length > 1) {
                if (formats.depthFormat === "m") {
                    toReturn = (<div className="text" key={index}><span className="data">{data[1]}</span>m : <span className="data">{data[0]}</span> {data[0] > 1 || Number(data[0]) === 0 ? "mins" : "min"}</div>);
                } else if (formats.depthFormat === "feet") {
                    const depth = Math.round(data[1] * 3.3);
                    toReturn = (<div className="text" key={index}><span className="data">{depth}</span>feet : <span className="data">{data[0]}</span> {data[0] > 1 || Number(data[0]) === 0 ? "mins" : "min"}</div>);
                }
            } else {
                toReturn = <div key={index}><span className="data">None</span></div>
            }
            return toReturn;
        })
        }
    </div>)
}

export default StopsDisplay