import React from "react";
import DepthDisplay from "./DepthDisplay";
import TimeDisplay from "./TimeDisplay";


const SummaryData = ({ summaryData }) => {
    return (
        <div className="summary-data">
            {summaryData.showDives ? <div><div className="small-title">Dives:</div><div className="text"><div className="data">{summaryData.numberOfDives}</div></div></div> : <></>}
            <div><div className="small-title">Average depth:</div><DepthDisplay depth={summaryData.avgDepth} /></div>
            <div><div className="small-title">Maximum depth:</div><DepthDisplay depth={summaryData.maxDepth} /></div>
            <div><div className="small-title">Average time:</div><TimeDisplay time={summaryData.avgTime} /></div>
            <div><div className="small-title">Maximum time:</div><TimeDisplay time={summaryData.maxTime} /></div>
            <div><div className="small-title">Total time:</div><TimeDisplay time={summaryData.totalTime} type={"cumu"} /></div>
            {summaryData.numberOfSites ? <div><div className="small-title">Number of sites:</div><div className="text"><div className="data">{summaryData.numberOfSites}</div></div></div> : <></>}
            {summaryData.numberOfCountries ? <div><div className="small-title">Number of countries:</div><div className="text"><div className="data">{summaryData.numberOfCountries}</div></div></div> : <></>}
            {summaryData.numberOfBuddies ? <div><div className="small-title">Number of buddies:</div><div className="text"><div className="data">{summaryData.numberOfBuddies}</div></div></div> : <></>}

        </div >
    )
}

export default SummaryData