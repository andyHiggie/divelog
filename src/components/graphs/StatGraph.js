import HorizontalBarGraph from "./HorizontalBarGraph";

const StatGraph = (({ data, width, height }) => {
    const colorArray = ['#add8e6', '#b0c4de', '#87cefa', '#87ceeb', '#6495ed', '#4169e1', '#1e90ff', '#00bfff', '#4682b4', '#0000cd', '#00008b']

    let xScale = [];
    let yScale = [];
    data.stats.map((item, index) => {
        if (item[1] > 0) {
            yScale.push([item[0], index]);
            xScale.push([index + 1, item[1], item[0], colorArray[index]]);
        }
        return index;
    });
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
            <HorizontalBarGraph {...graphProps} />
        </div>
    )

});

export default StatGraph;