import React from "react";
import { useGlobalContext } from "../../context";

const SiteName = (({ site }) => {
    const { setSearch } = useGlobalContext();

    return (
        <><div className="link" onClick={() => { setSearch(site.name, "site") }}>{site.name}</div><div className="tile-inner"><span className="title">{site.location} </span>
            <span className="small-link" onClick={() => { setSearch(site.country, "country") }}> {site.country}</span></div></>
    )


});

export default SiteName