import React from "react";

const SliderIndex = (({ array, selected, setIndex }) => {

    return (<div className="slider-index">
        <button className="btn left-arrow" onClick={() => { if (selected > 0) setIndex(selected - 1) }}>&lt;</button>
        {array.map((num, index) => {
            if (index === selected) {
                return <button key={index} index={num} className="btn selected" onClick={(() => { setIndex(index) })}>{num}</button>
            } else {
                return <button key={index} index={num} className="btn" onClick={(() => { setIndex(index) })}>{num}</button>
            }
        })}
        <button className="btn right-arrow" onClick={() => { if (selected < array.length - 1) setIndex(selected + 1) }}>&gt;</button>
    </div>)

});

export default SliderIndex;