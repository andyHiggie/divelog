import React, { useState, useEffect, useRef, useCallback } from "react";
import SliderIndex from "./SliderIndex";
import LargeSummaryData from "../displays/LargeSummaryData";
import GraphLayout from "../graphs/GraphLayout";
import Map from "../general/Map";
import Loading from "../general/Loading";
import { useGlobalContext } from "../../context";

const ItemSlider = () => {
    const { summaryDataLoading, summaryData } = useGlobalContext();
    const [index, setIndex] = useState(0);
    const [left, setLeft] = useState("0px");
    const [width, setWidth] = useState(400);
    const [mapProps, setMapProps] = useState(null)
    const sliderRef = useRef(null);
    let array = [];
    if (width < 797) {
        array = ["Stats", "Graphs 1", "2", "3", "4", "Map"];
    } else if (width >= 797 && width < 1220) {
        array = ["Stats", "Graphs 1", "Graphs 2", " Graphs 3", "Map"];
    } else {
        array = ["Stats", "Graphs 1", " Graphs 2", "Map"];
    }

    const setDimensions = useCallback(() => {

        const fontSize = parseFloat(getComputedStyle(sliderRef.current).fontSize);
        const width = document.getElementsByTagName('main')[0].offsetWidth - fontSize;
        setWidth(width);
        sliderRef.current.style.setProperty("--sliderWidth", width + "px");
        sliderRef.current.style.setProperty("--sliderHeight", "29em");
        setLeft(-(width + 15) * index + "px");
        if (!summaryDataLoading) {
            setMapProps({
                zoom: 10, height: (29 * fontSize), markers: summaryData.markers
            }
            );
        }
    }, [index, setLeft, summaryDataLoading, summaryData]);

    const resize = useCallback(() => {
        setIndex(0);
        setDimensions();
    }, [setDimensions]);

    useEffect(() => {
        setDimensions();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, [setDimensions, resize]);

    if (summaryDataLoading) {
        return (
            <section className="slider-section" ref={sliderRef}>
                <Loading />
            </section>
        );
    } else if (parseInt(summaryData.summaryData.numberOfDives) === 0) {
        return (
            <section className="slider-section" ref={sliderRef}>
                <h2>No dives found</h2>
            </section>
        );
    } else {
        return (
            <section className="slider-section" ref={sliderRef}>
                <div className="slider" style={{ left: left }}>
                    <article className="slide">
                        <LargeSummaryData />
                    </article>
                    <GraphLayout width={width} />
                    <article className="slide">
                        {mapProps ? <Map {...mapProps} /> : <></>}
                    </article>
                </div>
                <SliderIndex array={array} selected={index} setIndex={setIndex} />
            </section>
        );
    }
}

export default ItemSlider