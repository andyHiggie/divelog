import React from "react";
import DepthDisplay from "./DepthDisplay";
import TimeDisplay from "./TimeDisplay";
import DateDisplay from "./DateDisplay";
import Loading from "../general/Loading";
import { useGlobalContext } from "../../context";

const LargeSummaryData = () => {
    const { writeGroupBy, summaryData, summaryDataLoading } = useGlobalContext();
    if (summaryDataLoading) {
        return <Loading />
    } else {
        return (
            <div className="large-summary-data">
                <h3>Summary Data</h3>
                <div><div className="small-title">Number of <span className="summary-link" onClick={() => { writeGroupBy("") }}>dives:</span></div><div className="text"><div className="data">{summaryData.summaryData.numberOfDives}</div></div></div>
                <div><div className="small-title">Date of first dive:</div><DateDisplay dateString={summaryData.summaryData.startDate} /></div>
                <div><div className="small-title">Date of last dive:</div><DateDisplay dateString={summaryData.summaryData.endDate} /></div>
                <div><div className="small-title">Average depth:</div><DepthDisplay depth={summaryData.summaryData.avgDepth} /></div>
                <div><div className="small-title">Maximum depth:</div><DepthDisplay depth={summaryData.summaryData.maxDepth} /></div>
                <div><div className="small-title">Average time:</div><TimeDisplay time={summaryData.summaryData.avgTime} /></div>
                <div><div className="small-title">Maximum time:</div><TimeDisplay time={summaryData.summaryData.maxTime} /></div>
                <div><div className="small-title">Total time:</div><TimeDisplay time={summaryData.summaryData.totalTime} type={"cumu"} /></div>
                <div><div className="small-title">Number of different <span className="summary-link" onClick={() => { writeGroupBy("site") }}>sites:</span></div><div className="text"><div className="data">{summaryData.summaryData.numberOfSites}</div></div></div>
                <div><div className="small-title">Number of different <span className="summary-link" onClick={() => { writeGroupBy("country") }}>countries:</span></div><div className="text"><div className="data">{summaryData.summaryData.numberOfCountries}</div></div></div>
                <div><div className="small-title">Number of different <span className="summary-link" onClick={() => { writeGroupBy("buddy") }}>buddies:</span></div><div className="text"><div className="data">{summaryData.summaryData.numberOfBuddies}</div></div></div>
            </div >
        )
    }
}

export default LargeSummaryData