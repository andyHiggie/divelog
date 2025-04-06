import React from "react";
import { TiTick } from "react-icons/ti";

const SearchOption = ({ index, label, opacity, ref, clickHandler }) => {
    return (
        <div className="option" ref={ref} onClick={() => { clickHandler(index) }}>
            <span className="option-box" >
                <span className="option-check" style={{ opacity: opacity }}><TiTick /></span>
            </span>
            <span className="option-label">{label}</span>
        </div>);
}

export default SearchOption;