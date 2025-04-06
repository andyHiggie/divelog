import React, { useRef, useImperativeHandle, forwardRef } from "react";
import { useGlobalContext } from "../../context";
import CheckboxOption from "./CheckboxOption";


const Checkboxes = forwardRef((props, ref) => {
    const { postData } = useGlobalContext();
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
        <div className="expandable checkboxes" ref={bar} style={{ height: "0px" }}>
            {postData.checkboxList.map((filter, index) => {
                return (
                    <CheckboxOption key={index} label={filter[0]} option={filter[2]} />
                )
            })}
        </div>
    );

});

export default Checkboxes