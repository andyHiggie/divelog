import React, { useRef, useImperativeHandle, forwardRef } from "react";
import { useGlobalContext } from "../../context";


const Settings = forwardRef((props, ref) => {
    const { writeFormats } = useGlobalContext();
    const bar = useRef("");
    const timer = useRef(null);

    useImperativeHandle(ref, () => {
        return {
            setSize(open) {
                bar.current.style.height = "auto";
                const lHeight = bar.current.getBoundingClientRect().height;
                if (open) {
                    bar.current.style.height = '0px';
                    timer.current = setTimeout(() => { bar.current.style.height = lHeight + 'px' }, 1);
                    ;
                } else {
                    bar.current.style.height = lHeight + 'px';
                    timer.current = setTimeout(() => { bar.current.style.height = '0px' }, 1);
                }
            }
            ,
            close() {
                bar.current.style.height = '0px';
            }
        };
    }, []);

    return (
        <div className="expandable" ref={bar} style={{ height: "0px" }}>
            <div className="settings">
                <div className="setting">
                    Depth format:
                    <select className="select" onChange={(e) => { writeFormats("depth", e.target.value) }}>
                        <option value="m">Metres</option>
                        <option value="feet">Feet</option>
                    </select>
                </div>
                <div className="setting">
                    Date format:
                    <select className="select" onChange={(e) => { writeFormats("date", e.target.value) }}>
                        <option value="UK">UK format</option>
                        <option value="US">US format</option>
                        <option value="Other">International</option>
                    </select>
                </div>
                <div className="setting">
                    Maximum time format:
                    <select className="select" defaultValue={"minutes"} onChange={(e) => { writeFormats("maxTime", e.target.value) }}>
                        <option value="minutes">Minutes</option>
                        <option value="hours" >Hours</option>
                    </select>
                </div>
                <div className="setting">
                    Cumulative time format:
                    <select className="select" defaultValue={"hours"} onChange={(e) => { writeFormats("cumuTime", e.target.value) }}>
                        <option value="minutes">Minutes</option>
                        <option value="hours" >Hours</option>
                        <option value="days">Days</option>
                    </select>
                </div>
            </div>
        </div>
    )
});

export default Settings