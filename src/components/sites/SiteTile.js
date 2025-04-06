import React from "react";
import SummaryData from "../displays/SummaryData";
import SiteName from "./SiteName";
import ExpandingText from "../general/ExpandingText";
import SiteSlider from "../sliders/SiteSlider";

const SiteTile = (({ data }) => {

    data.summaryData.showDives = true;

    return (
        <div className="tile" >
            <SiteSlider contents={data.images} baseURL={"../../../sites/"} />
            <div className="tile-footer">
                <div>
                    <SiteName site={data} />
                    <ExpandingText text={data.siteComment} />
                </div>
                <SummaryData summaryData={data.summaryData} />
            </div>
        </div >
    )
});

export default SiteTile;