import React, { useState, useRef } from "react";
import DiveTileInner from "./DiveTileInner";
import DiveView from "./DiveView";


const DiveTile = (({ data }) => {
    const timer = useRef(null);
    const itemRef = useRef(null);
    const [expanded, setExpanded] = useState(false);
    const [className, setClassName] = useState("tile");

    const expandClickHandler = (() => {
        const time = parseFloat(window.getComputedStyle(document.getElementsByClassName("tile")[0]).getPropertyValue('transition')) * 1000;
        console.log(itemRef.current.offsetTop, itemRef.current.clientHeight);

        if (expanded) {
            setClassName("tile multiColumn");
            timer.current = setTimeout(() => { setClassName("tile") }, time);
        } else {
            setClassName("tile expanded multiColumn");

        }

        timer.current = setTimeout(() => {
            setExpanded(!expanded);
            window.scrollTo(0, itemRef.current.offsetTop);
        }, time);

    });

    if (expanded) {
        return (
            <div ref={itemRef} className={className}>
                <DiveView diveId={data.number} expandClickHandler={expandClickHandler} />
            </div>
        );
    } else {
        return (
            <div ref={itemRef} className={className}>
                <DiveTileInner diveInfo={data} expandClickHandler={expandClickHandler} />
            </div>
        );
    }

});

export default DiveTile;