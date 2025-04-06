import React from "react";
import SummaryData from "../displays/SummaryData";
import { useGlobalContext } from "../../context";

const BuddyTile = (({ data }) => {
    const { setSearch } = useGlobalContext();

    data.summaryData.showDives = true;

    return (
        <div className="tile" >
            <div className="image" onClick={() => { setSearch(data.name, "buddy") }}>
                <img src={"../../../buddies/" + data.images[0]} alt={data.name} />
            </div>
            <div className="label">{data.name}</div>
            <div className="tile-footer">
                <SummaryData summaryData={data.summaryData} />
            </div>
        </div >
    )
});

export default BuddyTile;