import React from "react";
import { useGlobalContext } from "../../context";

const TimeDisplay = (({ time, type = "max" }) => {
    const { formats } = useGlobalContext();
    let timeFormat = formats.cumuTimeFormat;
    if (type === "max") {
        timeFormat = formats.maxTimeFormat;
    }
    const hours = Math.floor(time / 60);
    const minutes = Math.floor(time - 60 * hours);
    const days = Math.floor(hours / 24);
    const dHours = Math.floor(hours - 24 * days);
    time = Math.round(time * 10) / 10;

    if (timeFormat === 'minutes') {
        return <div className="text"><span className="data">{time}</span>{minutes === 1 ? <>min</> : <>mins</>}</div>
    } else if (timeFormat === 'hours') {
        return <div className="text">{hours > 0 ? (<><span className="data">{hours}</span>{hours === 1 ? <>hour </> :
            <>hours </>}<span className="data">{minutes}</span>{minutes === 1 ? <>min</> : <>mins</>}</>) :
            (<><span className="data">{minutes}</span> {minutes === 1 ? <>min</> : <>mins</>}</>)}</div>
    } else if (timeFormat === 'days') {
        return <div className="text">{days > 0 ? (<><span className="data">{days}</span>{days === 1 ? <>day </> : <>days </>} {dHours > 0 ? (<><span className="data">{dHours}</span>{dHours === 1 ? <>hour </> :
            <>hours </>}<span className="data">{minutes}</span>{minutes === 1 ? <>min</> : <>mins</>}</>) :
            (<><span className="data">{minutes}</span> {minutes === 1 ? <>min</> : <>mins</>}</>)}</>) : (<>{dHours > 0 ? (<><span className="data">{dHours}</span>{dHours === 1 ? <>hour </> :
                <>hours </>}<span className="data">{minutes}</span>{minutes === 1 ? <>min</> : <>mins</>}</>) :
                (<><span className="data">{minutes}</span>{minutes === 1 ? <>min</> : <>mins</>}</>)}</>)}</div>
    }
});

export default TimeDisplay