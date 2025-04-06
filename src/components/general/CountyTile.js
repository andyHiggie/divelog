import React from "react";
import SummaryData from "../displays/SummaryData";
import { useGlobalContext } from "../../context";

const CountryTile = (({ data }) => {
    const { setSearch } = useGlobalContext();

    data.summaryData.showDives = true;

    return (
        <div className="tile" >
            <div className="image" onClick={() => { setSearch(data.country, "country") }}>
                <img src={"../../flags/" + data.image} alt={data.name} />
            </div>
            <div className="label">{data.country}</div>
            <div className="tile-footer">
                <SummaryData summaryData={data.summaryData} />
            </div>
        </div >
    )
});

export default CountryTile;