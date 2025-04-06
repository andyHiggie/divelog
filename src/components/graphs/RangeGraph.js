import BarGraph from "./BarGraph";

const RangeGraph = (({ data, width, height }) => {
    const colorArray = ['#add8e6', '#b0c4de', '#87cefa', '#87ceeb', '#6495ed', '#4169e1', '#1e90ff', '#00bfff', '#4682b4', '#0000cd', '#00008b']

    let xScale = [];
    let yScale = [];
    data.range.map((item, index) => {
        if (index === data.range.length - 1) {
            xScale.push(["+", index + 0.5]);
        } else {
            xScale.push([item[0], index + 0.5]);
        }
        let pos = index;
        while (pos >= colorArray.length) {
            pos -= colorArray.length;
        }
        if (data.type === "depth") {
            if (index >= data.range.length - 2) {
                yScale.push([index + 1, item[1], item[0] + " < d : " + item[1] + " dives", colorArray[pos]]);
            } else {
                yScale.push([index + 1, item[1], item[0] + " < d ≤ " + data.range[index + 1][0] + " : " + item[1] + " dives", colorArray[pos]]);
            }
        } else if (data.type === "time") {
            if (index >= data.range.length - 2) {
                yScale.push([index + 1, item[1], item[0] + " < t : " + item[1] + " dives", colorArray[pos]]);
            } else {
                yScale.push([index + 1, item[1], item[0] + " < t ≤ " + data.range[index + 1][0] + " : " + item[1] + " dives", colorArray[pos]]);
            }
        }
        return index;
    });
    xScale.push(["", data.range.length + 1]);
    yScale.push([data.range.length + 1, 0, "", ""]);
    const xAxisLabel = data.xLabel;
    const yAxisLabel = data.yLabel;

    const graphProps = {
        xScale, yScale, xAxisLabel, yAxisLabel, width, height
    };
    return (
        <div className="graph-holder">
            <div className="graph-top">
                <button className='blank-graph-btn'></button>
                <h3>{data.title}</h3>
            </div>
            <BarGraph {...graphProps} />
        </div>
    )

});

export default RangeGraph;