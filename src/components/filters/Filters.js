import React, { useRef, useImperativeHandle, forwardRef } from "react";
import DateChooser from "./DateChooser";
import NumberChooser from "./NumberChooser";


const Filters = forwardRef((props, ref) => {
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
            },
            close() {
                bar.current.style.height = '0px';
            }
        };
    }, []);



    return (
        <div className="filters expandable" ref={bar} style={{ height: "0px" }}>
            <div className="dates">
                <DateChooser label="Start date" />
                <DateChooser label="End date" />
            </div>
            <NumberChooser labels={["First dive", "Last dive"]} type={'Number'} />
            <NumberChooser labels={["Min time", "Max time"]} type={'Time'} />
            <NumberChooser labels={["Min depth", "Max depth"]} type={'Depth'} />
        </div>
    );

});

export default Filters