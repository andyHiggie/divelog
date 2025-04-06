import React, { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { useGlobalContext } from "../../context";

const CheckboxOption = ({ label, option }) => {
    const { loading, writeCheckboxList } = useGlobalContext();
    const [state, setState] = useState(-1);

    const clickHandler = () => {
        if (!loading) {
            option = state;
            option--;
            if (option < -1) {
                option = 1;
            }
            setState(option);
            writeCheckboxList(label, option, 1000);
        }
    };

    useEffect(() => {
        setState(option);
    }, [option])

    if (state === 1) {
        return (
            <div className="filter-option" onClick={() => { clickHandler() }}>
                <span className="option-box" >
                    <span className="option-check"><TiTick /></span>
                </span>
                <span className="option-label">{label}</span>
            </div>);
    } else if (state === 0) {
        return (
            <div className="filter-option" onClick={() => { clickHandler() }}>
                <span className="option-box" >
                    <span className="option-cross"><ImCross /></span>
                </span>
                <span className="option-label">{label}</span>
            </div>);
    } else if (state === -1) {
        return (
            <div className="filter-option" onClick={() => { clickHandler() }}>
                <span className="option-box" >
                </span>
                <span className="option-label">{label}</span>
            </div>);
    } else {
        return (
            <div className="filter-option disabled" >
                <span className="option-box" >
                </span>
                <span className="option-label">{label}</span>
            </div>);
    }

}

export default CheckboxOption