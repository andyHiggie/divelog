import React from "react";
import DateGraph from "./DateGraph";
import RangeGraph from "./RangeGraph";
import StatGraph from "./StatGraph";
import Loading from "../general/Loading";
import { useGlobalContext } from "../../context";

const GraphLayout = ({ width }) => {
    const { summaryData, summaryDataLoading } = useGlobalContext();

    if (summaryDataLoading) {
        return <Loading />
    } else if (parseInt(summaryData.summaryData.numberOfDives) === 0) {
        return <></>
    } else {
        if (width < 797) {
            return (
                <>
                    <article className="slide">
                        <DateGraph dates={summaryData.dates} width={400} height={190} />
                        <RangeGraph data={summaryData.depthRange} width={400} height={190} />
                    </article>
                    <article className="slide">
                        <RangeGraph data={summaryData.timeRange} width={400} height={190} />
                        <StatGraph data={summaryData.typeOfEntry} width={400} height={190} />
                    </article>
                    <article className="slide">
                        <StatGraph data={summaryData.typeOfDive} width={400} height={190} />
                        <StatGraph data={summaryData.gasUsed} width={400} height={190} />
                    </article>
                    <article className="slide">
                        <StatGraph data={summaryData.numberOfBuddies} width={400} height={190} />
                        <StatGraph data={summaryData.typeOfSite} width={400} height={190} />
                    </article>
                </>
            )
        } else if (width >= 797 && width <= 1220) {
            return (
                <>
                    <article className="slide">
                        <div className="sub-slide">
                            <DateGraph dates={summaryData.dates} width={800} height={190} />
                        </div>
                        <div className="sub-slide">
                            <RangeGraph data={summaryData.depthRange} width={400} height={190} />
                        </div>
                        <div className="sub-slide">
                            <RangeGraph data={summaryData.timeRange} width={400} height={190} />
                        </div>
                    </article>
                    <article className="slide">
                        <div className="sub-slide">
                            <StatGraph data={summaryData.typeOfEntry} width={400} height={190} />
                            <StatGraph data={summaryData.typeOfDive} width={400} height={190} />
                        </div>
                        <div className="sub-slide">
                            <StatGraph data={summaryData.gasUsed} width={400} height={190} />
                            <StatGraph data={summaryData.numberOfBuddies} width={400} height={190} />
                        </div>
                    </article>
                    <article className="slide">
                        <StatGraph data={summaryData.typeOfSite} width={400} height={190} />
                    </article>
                </>
            )
        } else {
            return (
                <>
                    <article className="slide">
                        <div className="sub-slide">
                            <DateGraph dates={summaryData.dates} width={1200} height={190} />
                        </div>
                        <div className="sub-slide">
                            <RangeGraph data={summaryData.depthRange} width={400} height={190} />
                        </div>
                        <div className="sub-slide">
                            <RangeGraph data={summaryData.timeRange} width={400} height={190} />
                        </div>
                        <div className="sub-slide">
                            <StatGraph data={summaryData.typeOfEntry} width={400} height={190} />
                        </div>
                    </article>
                    <article className="slide">
                        <div className="sub-slide">
                            <StatGraph data={summaryData.typeOfDive} width={400} height={190} />
                            <StatGraph data={summaryData.gasUsed} width={400} height={190} />
                        </div>
                        <div className="sub-slide">
                            <StatGraph data={summaryData.numberOfBuddies} width={400} height={190} />
                            <StatGraph data={summaryData.typeOfSite} width={400} height={190} />
                        </div>
                    </article>
                </>
            )
        }
    }
}

export default GraphLayout