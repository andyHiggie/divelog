import React, { useState } from "react"
import BarGraph from "./BarGraph";

const DateGraph = (({ dates, width, height }) => {
    const dateDives = structuredClone(dates);
    const [buttonCaption, setButtonCaption] = useState("Show by month");
    const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const colorArray = ['#add8e6', '#b0c4de', '#87cefa', '#87ceeb', '#6495ed', '#4169e1', '#1e90ff', '#00bfff', '#4682b4', '#0000cd', '#00008b', '#0000ff']
    const end = new Date(dateDives[dateDives.length - 1]).getFullYear() + 1;
    let first = new Date(dateDives.shift());
    let monthsLast = [first.getMonth(), 1, monthArray[first.getMonth()] + ' ' + first.getFullYear(), colorArray[first.getMonth()]];
    let yearsLast = [1, 1, first.getFullYear(), colorArray[0]];
    let months = [monthsLast];
    let years = [yearsLast]
    const begin = first.getFullYear() - 1;
    let difference = end - begin;
    let xScale = [];
    let rounded = 0;
    let factor = 1;
    const yAxisLabel = "Number of dives";
    let yScale = years;
    if (buttonCaption === 'Show by year') {
        factor = 12;
        yScale = months;
    }
    if (difference > 14) {
        rounded = Math.ceil(begin / 5) * 5;
        while (rounded < end + 5) {
            xScale.push([rounded, (rounded - begin) * factor]);
            rounded += 5;
        }
    } else if (difference > 5) {
        rounded = Math.ceil(begin / 2) * 2;
        while (rounded < end + 2) {
            xScale.push([rounded, (rounded - begin) * factor]);
            rounded += 2;
        }
    } else {
        rounded = begin;
        while (rounded < end + 1) {
            xScale.push([rounded, (rounded - begin) * factor]);
            rounded++;
        }
    }

    const buttonHandler = () => {
        if (buttonCaption === 'Show by year') {
            setButtonCaption("Show by month");
        } else {
            setButtonCaption("Show by year");
        }
    }

    const getMonthDifference = ((date) => {
        return date.getMonth() + 12 * (date.getFullYear() - first.getFullYear());
    });
    const getYearDifference = ((date) => {
        return (date.getFullYear() - first.getFullYear() + 1);
    });

    dateDives.map((item) => {
        const date = new Date(item);
        const monthDiff = getMonthDifference(date);
        const yearDiff = getYearDifference(date);
        if (yearDiff === yearsLast[0]) {
            yearsLast[1] += 1;
            years.pop();
        } else {
            let pos = yearDiff + 1;
            while (pos >= colorArray.length) {
                pos -= colorArray.length;
            }
            yearsLast = [yearDiff, 1, date.getFullYear(), colorArray[pos]];
        }
        if (monthDiff === monthsLast[0]) {
            monthsLast[1] += 1;
            months.pop();
        } else {
            monthsLast = [monthDiff, 1, monthArray[date.getMonth()] + ' ' + date.getFullYear(), colorArray[date.getMonth()]];
        }
        months.push(monthsLast);
        years.push(yearsLast);
        return months;
    });
    months.map((month) => {
        month[0] += 12;
        if (month[1] === 1) {
            month[2] += (': ' + month[1] + ' dive');
        } else {
            month[2] += (': ' + month[1] + ' dives');
        }
        return month;
    })
    years.map((year) => {
        if (year[1] === 1) {
            year[2] += (': ' + year[1] + ' dive');
        } else {
            year[2] += (': ' + year[1] + ' dives');
        }
        return year;
    });
    const graphProps = {
        xScale, yScale, yAxisLabel, width, height
    };
    return (
        <div className="graph-holder">
            <div className="graph-top">
                <button className='graph-btn' onClick={buttonHandler}>{buttonCaption}</button>
                <h3>Dates of Dives</h3>
            </div>
            <BarGraph {...graphProps} />
        </div>
    )
})

export default DateGraph