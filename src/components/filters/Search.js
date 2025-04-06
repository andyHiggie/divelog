import React, { useRef, useState, useImperativeHandle, forwardRef, useEffect } from "react";
import { useGlobalContext } from "../../context";
import SearchSelect from "./SearchSelect";

const Search = forwardRef((props, ref) => {
  const { postData, writeSearch } = useGlobalContext();
  const [searchTerm, setSearchTerm] = useState("");
  const bar = useRef("");
  const searchValue = useRef("");
  const timer = useRef(null);

  const search = (() => {
    setSearchTerm(searchValue.current.value);
    writeSearch(searchValue.current.value, 1000);
  });

  const resize = (() => {
    bar.current.style.height = "auto";
    bar.current.style.height = bar.current.getBoundingClientRect().height;
  });

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

  useEffect(() => {
    setSearchTerm(postData.searchTerm);
  }, [postData]);

  return (
    <div className="searchbar expandable" ref={bar} >
      <label htmlFor="name">Search:</label>
      <input className="search" type="text" id="name" ref={searchValue}
        onChange={(() => { search() })} value={searchTerm} />
      <div className="search-options">
        <SearchSelect type={"dives"} resize={resize} />
        <SearchSelect type={"sites"} resize={resize} />
        <SearchSelect type={"buddies"} resize={resize} />
      </div>
    </div>
  )
});

export default Search;
