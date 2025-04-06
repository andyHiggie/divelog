import React, { useState, useEffect, useRef } from "react";
import SliderIndex from "./SliderIndex";

const Slider = ({ size, contents, names = [], baseURL, top }) => {
    const [index, setIndex] = useState(0);
    const [left, setLeft] = useState("0em");
    const sliderRef = useRef(null);

    let array = [];
    for (let i = 1; i <= contents.length; i++) {
        if (names[i - 1]) {
            array.push(names[i - 1]);
        } else {
            array.push(i);
        }
    }

    useEffect(() => {
        if (size === "big") {
            sliderRef.current.style.setProperty("--sliderWidth", "29em");
            sliderRef.current.style.setProperty("--sliderHeight", "29em");
        }
        const width = parseInt(window.getComputedStyle(sliderRef.current).getPropertyValue("--sliderWidth")) + 1;
        setLeft(-width * index + "em");

    }, [index, contents, size]);

    return (
        <div className="slider-section" ref={sliderRef}>
            {top && contents.length > 1 ? <SliderIndex array={array} selected={index} setIndex={setIndex} /> : <></>}
            <div className="slider" style={{ left: left }}>
                {contents.map((content, contentsIndex) => {
                    const url = baseURL + content;
                    return (
                        <article className="slide" key={contentsIndex}>
                            <img src={url} alt={content} className="slider-img" />
                        </article>
                    );
                })}
            </div>
            {!top && contents.length > 1 ? <SliderIndex array={array} selected={index} setIndex={setIndex} /> : <></>}
        </div>
    );
}

export default Slider