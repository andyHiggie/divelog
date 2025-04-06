import React from "react";
import ExpandingText from "../general/ExpandingText";
import SiteName from "../sites/SiteName";
import DateDisplay from "../displays/DateDisplay";
import TimeDisplay from "../displays/TimeDisplay";
import DepthDisplay from "../displays/DepthDisplay";
import BuddyList from "../buddies/BuddyList";
import DiveNumber from "../displays/DiveNumber";
import { useGlobalContext } from "../../context";

const DiveTileInner = (({ diveInfo, expandClickHandler }) => {
    const { setSearch } = useGlobalContext();

    return (
        <>
            <div className="image" onClick={() => { setSearch(diveInfo.site.name, "site") }}>
                <img src={"../../../sites/" + diveInfo.site.images[0]} alt={diveInfo.site.name} />
            </div>
            <div className="tile-footer">
                <div>
                    <DiveNumber number={diveInfo.number} />
                    <SiteName site={diveInfo.site} />
                    <DateDisplay dateString={diveInfo.date} />
                    <div><TimeDisplay time={diveInfo.time} /></div>
                    <div><DepthDisplay depth={diveInfo.depth} /></div>
                    {diveInfo.notes !== "" ? <div className="highlight">{diveInfo.notes}</div> : <></>}
                    <ExpandingText text={diveInfo.comment} />
                </div>
                <div>
                    <BuddyList buddies={diveInfo.buddies} size={"small"} />
                </div>
            </div>
            <button className="big-btn" onClick={() => { expandClickHandler() }}>Show details</button>
        </>
    )
});

export default DiveTileInner;