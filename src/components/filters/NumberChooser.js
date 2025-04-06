import React, { useState, useRef, useEffect } from "react";
import { useGlobalContext } from "../../context";

const NumberChooser = ({ labels, type }) => {
    const { postData, writeStartEnds } = useGlobalContext();
    const number1 = useRef('');
    const slider1 = useRef('');
    const number2 = useRef('');
    const slider2 = useRef('');

    const [selectedMin, setSelectedMin] = useState(postData.startEnds['min' + type]);
    const [selectedMax, setSelectedMax] = useState(postData.startEnds['max' + type]);

    const changeSlider = (slider, id) => {
        if (id === 1) {
            if (Number(slider.current.value) > Number(selectedMax)) {
                slider.current.value = selectedMax;
            }
            number1.current.value = slider.current.value;
            setSelectedMin(slider.current.value);
            writeStartEnds(('min' + type), parseInt(slider.current.value), 1000);
        };
        if (id === 2) {
            if (Number(slider.current.value) < Number(selectedMin)) {
                slider.current.value = selectedMin;
            }
            number2.current.value = slider.current.value;
            setSelectedMax(slider.current.value);
            writeStartEnds(('max' + type), parseInt(slider.current.value), 1000);
        }
    };

    const changeNumber = (number, id) => {
        if (id === 1) {
            if (number.current.value > selectedMax) {
                number.current.value = selectedMax;
            } else {
                setSelectedMin(number.current.value);
                writeStartEnds(('min' + type), parseInt(number.current.value), 1000);
            }
        } else if (id === 2) {
            if (number.current.value < selectedMin) {
                number.current.value = selectedMin;
            } else {
                setSelectedMax(number.current.value);
                writeStartEnds(('max' + type), parseInt(number.current.value), 1000);
            }
        }

    };

    useEffect(() => {
        setSelectedMin(postData.startEnds['min' + type]);
        setSelectedMax(postData.startEnds['max' + type]);
    }, [postData, type])

    return (<>
        <div className="number-picker">
            <span className="option-label">{labels[0]}</span>
            <div className="option-holder">
                <input className="option-input" type="number" max={postData.startEnds['end' + type]} min={postData.startEnds['start' + type]} ref={number1} onChange={() => { changeNumber(number1, 1) }} value={selectedMin} />
                <input className="option-input" type="range" max={postData.startEnds['end' + type]} min={postData.startEnds['start' + type]} ref={slider1} onInput={() => { changeSlider(slider1, 1) }} value={selectedMin}></input>
            </div>
        </div>
        <div className="number-picker">
            <span className="option-label">{labels[1]}</span>
            <div className="option-holder">
                <input className="option-input" type="number" max={postData.startEnds['end' + type]} min={postData.startEnds['start' + type]} ref={number2} onChange={() => { changeNumber(number2, 2) }} value={selectedMax} />
                <input className="option-input" type="range" max={postData.startEnds['end' + type]} min={postData.startEnds['start' + type]} ref={slider2} onChange={() => { changeSlider(slider2, 2) }} value={selectedMax}></input>
            </div>
        </div ></>
    )

}

export default NumberChooser