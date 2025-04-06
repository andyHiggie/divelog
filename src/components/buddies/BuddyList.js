import React, { useState, useRef, useEffect } from "react";
import BuddyItem from "./BuddyItem";

const BuddyList = ({ buddies, size }) => {
    const [heights, setHeights] = useState({ sHeight: 0, lHeight: 0 });
    const [extraBuddies, setExtraBuddies] = useState(0);
    const [expanded, setExpanded] = useState(false);
    const buddyHolder = useRef();
    const buddyItem = useRef();
    const [currentBuddies, setCurrentBuddies] = useState({});

    const createContent = ((buddies) => {
        return (<>
            {buddies.map((props, index) => {
                props.size = size;
                if (index === 0) {
                    props.ref = buddyItem;
                }
                return <BuddyItem key={props.id} props={props} />
            })}
        </>)
    })
    const [content, setContent] = useState(createContent(buddies.slice(0, 1)));

    const setUpContent = (() => {
        setContent(createContent(buddies));
        if (size !== "large") {
            const outerBox = buddyHolder.current.getBoundingClientRect();
            const innerBox = buddyItem.current.getBoundingClientRect();
            const innerBoxMarginBottom = parseInt(window.getComputedStyle(buddyItem.current).getPropertyValue('margin-bottom'));
            const innerBoxHeight = innerBox.height + innerBoxMarginBottom;
            const numThatFit = Math.floor(outerBox.width / (innerBox.width + parseInt(window.getComputedStyle(buddyItem.current).getPropertyValue('margin-right'))));
            if (buddies.length > numThatFit) {
                setExtraBuddies(buddies.length - numThatFit);
            } else {
                setExtraBuddies(0);
            }
            setHeights({ sHeight: innerBox.height, lHeight: Math.ceil(buddies.length / numThatFit) * innerBoxHeight - innerBoxMarginBottom })
            buddyHolder.current.style.height = innerBox.height + 'px';
        }
    });

    const changeExpanded = (() => {
        if (expanded) {
            buddyHolder.current.style.height = heights.sHeight + 'px';
        } else {
            buddyHolder.current.style.height = heights.lHeight + 'px';
        }
        setExpanded(!expanded);
    });

    useEffect(() => {
        if (buddyHolder.current) {
            if (currentBuddies !== buddies) {
                setUpContent();
                setCurrentBuddies(buddies);
            }
            window.addEventListener('resize', setUpContent);
        }
        return () => window.removeEventListener('resize', setUpContent);
    });

    return (
        <>
            <div className="expandable hide-overflow" ref={buddyHolder}>
                {content}
            </div>
            {extraBuddies === 0 ? <></> : expanded ?
                <button className="btn" onClick={() => changeExpanded()}>Hide {extraBuddies} extra {extraBuddies === 1 ? <>buddy</> : <>buddies</>}</button> :
                <button className="btn" onClick={() => changeExpanded()}>Show {extraBuddies} extra {extraBuddies === 1 ? <>buddy</> : <>buddies</>}</button>}
        </>
    )
};

export default BuddyList