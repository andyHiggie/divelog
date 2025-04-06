import React from "react";
import { useGlobalContext } from "../../context";

const DateDisplay = (({ dateString }) => {
    const { formats } = useGlobalContext();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const tempDate = (new Date(dateString));

    const nth = (d) => {
        if (d > 3 && d < 21) return 'th';
        switch (d % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    };

    if (formats.dateFormat === "UK") {
        return (
            <div className="date">{tempDate.getDate()}<sup>{nth(tempDate.getDate())}</sup> {monthArray[tempDate.getMonth()] + " " + tempDate.getFullYear()}</div>
        )
    } else if (formats.dateFormat === "US") {
        return (
            <div className="date">{tempDate.toLocaleDateString("en-US", options)}</div>
        )
    } else {
        return (
            <div className="date">{tempDate.getFullYear() + " " + monthArray[tempDate.getMonth()] + " " + tempDate.getDate()}</div>
        )
    }
});

export default DateDisplay