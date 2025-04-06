import React from "react";

const HorizontalBarGraph = ((props) => {
    let yEnd = 1;
    let maxX = 0;
    let xStep = 1;
    let xShift = 30;

    yEnd = props.yScale[props.yScale.length - 1][1] + 1.1;
    console.log(props, yEnd);
    props.xScale.map((item) => {
        if (item[1] > maxX) {
            maxX = item[1];
        }
        return maxX;
    });
    if (maxX > 1000) {
        xStep = 400;
    } else if (maxX > 500) {
        xStep = 100;
    } else if (maxX > 200) {
        xStep = 50;
    } else if (maxX > 70) {
        xStep = 20;
    } else if (maxX > 35) {
        xStep = 10;
    } else if (maxX > 18) {
        xStep = 5;
    } else if (maxX > 8) {
        xStep = 2;
    }
    const xScale = (props.width - 3 * xShift) / maxX;
    const yScale = (props.height - 60) / yEnd;
    let xLabels = [];
    for (let i = 0; i < maxX + xStep; i += xStep) {
        if ((i * xScale) < props.width - 2 * xShift) {
            xLabels.push([i, (i * xScale)]);
        }
    }

    return (
        <svg width={props.width} height={props.height} xmlns="http://www.w3.org/2000/svg">
            <g transform={`translate(${xShift},0), scale(${xScale},1)`}>
                {props.xScale.map((item, index) => {
                    return (<line key={index} x1={0} y1={props.height - item[0] * yScale - 30} x2={item[1]} y2={props.height - item[0] * yScale - 30} stroke={item[3]} strokeWidth={yScale * 0.8} ><title>{item[2] + " " + item[1] + " dives"}</title></line>);
                })}
                <line x1={0} y1={props.height - 40} x2={maxX + xStep / 2} y2={props.height - 40} stroke="black" strokeWidth="1" />
                <line x1={0} y1={props.height - 40} x2={0} y2="0" stroke="black" strokeWidth={1 / xScale} />
            </g>
            {props.xScale.map((item, index) => {
                if (item[1] * xScale + xShift < props.width / 2) {
                    return <text key={index} cursor="default" pointerEvents="none" textAnchor="start" x={item[1] * xScale + xShift + 10} y={props.height - item[0] * yScale - 25}>{item[2]}</text>
                } else {
                    return <text key={index} cursor="default" pointerEvents="none" textAnchor="end" x={item[1] * xScale + xShift - 10} y={props.height - item[0] * yScale - 25}>{item[2]}</text>
                }
            })}
            {xLabels.map((item, index) => {
                return (
                    <g key={index}>
                        <line x1={xShift + item[1]} y1={props.height - 40} x2={xShift + item[1]} y2={props.height - 35} stroke="black" strokeWidth="1"></line>
                        <text textAnchor="middle" x={xShift + item[1]} y={props.height - 20}>{item[0]}</text>
                    </g>
                )
            })}
            <text textAnchor="end" x={props.width - 20} y={props.height - 5}>{props.xAxisLabel}</text>
        </svg>
    )

})

export default HorizontalBarGraph