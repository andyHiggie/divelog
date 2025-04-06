import React from "react";

const BarGraph = ((props) => {
    let xEnd = 1;
    let maxY = 0;
    let yStep = 1;
    let xShift = 30;

    xEnd = props.xScale[props.xScale.length - 1][1];
    props.yScale.map((item) => {
        if (item[1] > maxY) {
            maxY = item[1];
        }
        return maxY;
    });
    if (maxY > 1000) {
        yStep = 250;
        xShift = 40;
    } else if (maxY > 600) {
        yStep = 100;
    } else if (maxY > 200) {
        yStep = 50;
    } else if (maxY > 70) {
        yStep = 20;
    } else if (maxY > 35) {
        yStep = 10;
    } else if (maxY > 18) {
        yStep = 5;
    } else if (maxY > 8) {
        yStep = 2;
    }
    const yScale = (props.height - 80) / maxY;
    const xScale = (props.width - 2 * xShift) / xEnd;
    let yLabels = [];
    for (let i = 0; i < maxY + yStep; i += yStep) {
        if (props.height - 35 - (i * yScale) > 35) {
            yLabels.push([i, props.height - 35 - (i * yScale)]);
        }
    }
    return (
        <svg width={props.width} height={props.height} xmlns="http://www.w3.org/2000/svg">
            <g transform={`translate(${xShift},0), scale(${xScale},1)`}>
                {props.yScale.map((item, index) => {
                    return (<line key={index} x1={item[0]} y1={props.height - 35} x2={item[0]} y2={props.height - 35 - item[1] * yScale} stroke={item[3]} strokeWidth="1" ><title>{item[2]}</title></line>);
                })}
                <line x1={0} y1={props.height - 35} x2={xEnd} y2={props.height - 35} stroke="black" strokeWidth="1" />
                <line x1={0} y1={props.height - 35} x2={0} y2="20" stroke="black" strokeWidth={1 / xScale} />
            </g>
            {props.xScale.map((item, index) => {
                if (item[0] !== "") {
                    return (
                        <g key={index}><line x1={(item[1] * xScale) + xShift} y1={props.height - 35} x2={(item[1] * xScale) + xShift} y2={props.height - 31} stroke="black" strokeWidth="1"></line>
                            <text textAnchor="middle" x={(item[1] * xScale) + xShift} y={props.height - 18}>{item[0]}</text>
                        </g>
                    )
                } else {
                    return (<g key={index}></g>)
                }
            })}
            {yLabels.map((item, index) => {
                return (
                    <g key={index}>
                        <line x1={xShift} y1={item[1]} x2={xShift - 3} y2={item[1]} stroke="black" strokeWidth="1"></line>
                        <text textAnchor="end" x={xShift - 5} y={item[1] + 5}>{item[0]}</text>
                    </g>
                )
            })}
            <text textAnchor="end" x={props.width - 20} y={props.height - 5}>{props.xAxisLabel}</text>
            <text textAnchor="start" x={xShift} y="12">{props.yAxisLabel}</text>
        </svg>
    )

})

export default BarGraph