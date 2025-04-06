import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context";

const ViewSelect = () => {
    const { writeGroupBy, postData } = useGlobalContext();
    const [selectedView, setSelectedView] = useState("");

    useEffect(() => {
        setSelectedView(postData.groupBy);
    }, [postData])

    return (
        <select value={selectedView} className="select" onChange={(e) => { writeGroupBy(e.target.value) }}>
            <option value="">Show all dives</option>
            <option value="site">Group by site</option>
            <option value="country">Group by country</option>
            <option value="buddy">Group by buddy</option>
        </select>
    )
}

export default ViewSelect