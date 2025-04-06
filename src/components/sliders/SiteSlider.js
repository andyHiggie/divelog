import React, { useState, useEffect, useRef } from "react";
import SliderIndex from "./SliderIndex";

const SiteSlider = ({ contents, baseURL }) => {
    const [index, setIndex] = useState(0);
    const [left, setLeft] = useState("0px");
    const sliderRef = useRef(null);

    let array = [];
    for (let i = 1; i <= contents.length; i++) {
        array.push(i);
    };

    const setUpContent = (() => {
        const width = document.getElementsByClassName('tile')[0].offsetWidth;
        sliderRef.current.style.setProperty("--sliderWidth", width + "px");
        sliderRef.current.style.setProperty("--sliderHeight", width * 0.75 + "px");
        setLeft(-(width + 10) * index + "px");
    })

    useEffect(() => {
        setUpContent();
        window.addEventListener('resize', setUpContent);
        return () => window.removeEventListener('resize', setUpContent);

    });

    return (
        <section className="site-slider-section" ref={sliderRef}>
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
            {contents.length > 1 ? <SliderIndex array={array} selected={index} setIndex={setIndex} /> : <></>}
        </section>
    );
}

export default SiteSlider