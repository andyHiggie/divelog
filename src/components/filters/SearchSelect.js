import React, { useEffect, useState, useRef } from "react";
import SearchOption from "./SearchOption";
import { useGlobalContext } from "../../context";

const SearchSelect = ({ type, resize }) => {
    const { postData, writeSearchOptions } = useGlobalContext();
    const [searchOptions, setSearchOptions] = useState(structuredClone(postData.searchOptions));
    const [expanded, setExpanded] = useState(false);
    const [heights, setHeights] = useState({ sHeight: 0, lHeight: 0 });
    const searchSelectHolder = useRef();
    const searchOption = useRef();
    const [firstRun, setFirstRun] = useState(true);

    const setUpContent = (() => {
        setFirstRun(false);
        const lHeight = searchSelectHolder.current.getBoundingClientRect().height;
        const sHeight = searchOption.current.getBoundingClientRect().height;
        setHeights({ sHeight: sHeight, lHeight: lHeight });
        searchSelectHolder.current.style.height = sHeight + 'px';
    });

    const changeExpanded = (() => {
        if (expanded) {
            searchSelectHolder.current.style.height = heights.sHeight + 'px';
        } else {
            searchSelectHolder.current.style.height = heights.lHeight + 'px';
        }
        setExpanded(!expanded);
        resize();
    });

    const clickHandler = ((id) => {
        if (id === 0) {
            if (searchOptions[type][0][2] === 1) {
                searchOptions[type][0][2] = 0;
            } else {
                searchOptions[type][0][2] = 1;
            }
            for (let i = 1; i < searchOptions[type].length; i++) {
                searchOptions[type][i][2] = searchOptions[type][0][2];
            }
        } else {
            if (searchOptions[type][id][2] === 0) {
                searchOptions[type][id][2] = 1;
            } else {
                searchOptions[type][id][2] = 0;
            }
            if (searchOptions[type].length > 1) {
                const first = searchOptions[type][1][2];
                let allEqual = true;
                for (let i = 2; i < searchOptions[type].length; i++) {
                    if (searchOptions[type][i][2] !== first) {
                        allEqual = false;
                    }
                }
                if (allEqual) {
                    searchOptions[type][0][2] = first;
                } else {
                    searchOptions[type][0][2] = 0.4;
                }
            }
        }
        setSearchOptions(structuredClone(searchOptions));
        writeSearchOptions(searchOptions, 1000);
    });

    useEffect(() => {
        setSearchOptions(postData.searchOptions);
        if (searchSelectHolder.current && firstRun) {
            setUpContent();
        }
    }, [setSearchOptions, firstRun, postData]);

    let className = "expand-btn";
    if (expanded) {
        className = "expand-btn-open"
    }

    return (
        <div className="search-select">
            <button className={className} onClick={() => changeExpanded()}>&gt;</button>
            <div className="expandable" ref={searchSelectHolder} >
                {searchOptions[type].map((item, index) => {
                    return <SearchOption key={index} label={item[1]} opacity={item[2]} ref={searchOption} clickHandler={() => clickHandler(index)} />
                })}
            </div>
        </div>
    )

}

export default SearchSelect;

