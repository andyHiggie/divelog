import React from "react";
import { useGlobalContext } from "../../context";

const LineGraph = (({ profileData, width, height }) => {
    const { formats } = useGlobalContext();
    let profile = structuredClone(profileData);
    if (profile.length > 0) {
        let maxY = 0;
        const xShift = 24;
        let yStep = 1;
        let label = "";
        if (formats.depthFormat === 'm') {
            label = "Depth in m";
        } else if (formats.depthFormat === "feet") {
            label = "Depth in feet";
            profile.map((point) => {
                point[1] = Math.round(point[1] * 3.3);
                return point;
            });
        }

        const difference = profile[profile.length - 1][0] - profile[0][0];
        const xStep = Math.ceil(difference / 10);
        const xEnd = 10 * xStep;
        profile.map((point) => {
            if (point[1] > maxY) {
                maxY = point[1];
            }
            return maxY;
        });

        if (maxY > 80) {
            yStep = 20;
        } else if (maxY > 40) {
            yStep = 10;
        } else if (maxY > 20) {
            yStep = 5;
        } else if (maxY > 8) {
            yStep = 2;
        }
        const yScale = (height - 80) / maxY;
        const xScale = (width - 2 * xShift) / xEnd;
        let yLabels = [];
        let xLabels = [];
        for (let i = 0; i <= xEnd; i += xStep) {
            xLabels.push([i, i * xScale]);
        }

        for (let i = 0; i <= maxY + yStep; i += yStep) {
            if (20 + (i * yScale) <= (height - 40)) {
                yLabels.push([i, 20 + (i * yScale)]);
            }
        }
        return (
            <div className="graph">
                <svg width={width} height={height} xmlns="http://www.w3.org/2000/svg">
                    <g transform={`translate(${xShift},0), scale(${xScale},1)`}>
                        <line key={"xAxes"} x1={0} y1={height - 40} x2={xEnd} y2={height - 40} stroke="black" strokeWidth="1" />
                        <line key={"yAxes"} x1={0} y1={height - 40} x2={0} y2="20" stroke="black" strokeWidth={1 / xScale} />
                        {profile.map((item, index) => {
                            if (index > 0) {
                                return (<line vectorEffect='non-scaling-stroke' key={index} x1={profile[index - 1][0]} y1={profile[index - 1][1] * yScale + 20} x2={item[0]} y2={20 + item[1] * yScale} stroke="#3349ec" strokeWidth="1.5" ><title>{item[0] + 's, ' + item[1] + 'm'}</title></line>);
                            }
                        })}
                    </g>
                    {xLabels.map((item, index) => {
                        return (
                            <g key={index}><line x1={item[1] + xShift} y1={height - 40} x2={item[1] + xShift} y2={height - 35} stroke="black" strokeWidth="1"></line>
                                <text textAnchor="middle" x={item[1] + xShift} y={height - 20} >{item[0]}</text>
                            </g>
                        )
                    })}
                    <text textAnchor="end" x={xEnd * xScale} y={height - 5} >Time in minutes</text>
                    {yLabels.map((item, index) => {
                        return (
                            <g key={index}>
                                <line x1={xShift} y1={item[1]} x2={xShift - 3} y2={item[1]} stroke="black" strokeWidth="1"></line>
                                <text textAnchor="end" x={xShift - 5} y={item[1] + 5}>{item[0]}</text>
                            </g>
                        )
                    })}
                    <text textAnchor="start" x={xShift} y="12">{label}</text>
                </svg>
            </div>
        )
    } else {
        return <></>
    }
})

export default LineGraph