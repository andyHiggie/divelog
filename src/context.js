import React, { useState, useContext, useRef } from "react";
import { defaultStartEnds, defaultTileData, defaultSearchOptions, siteOptions, countryOptions, buddyOptions, defaultCheckboxList, defaultPostData, defaultFormats } from "./Defaults";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const timer = useRef(null);
  const [loading, setLoading] = useState(false);
  const [diveLoading, setDiveLoading] = useState(true);
  const [summaryDataLoading, setSummaryDataLoading] = useState(true);
  const [end, setEnd] = useState(12);

  const [diveInfo, setDiveInfo] = useState({});
  const [summaryData, setSummaryData] = useState({});
  const [tileData, setTileData] = useState(structuredClone(defaultTileData));
  const [formats, setFormats] = useState(structuredClone(defaultFormats));
  const [postData, setPostData] = useState(structuredClone(defaultPostData));

  let undoRedoData = useRef({
    value: null,
    pastValues: [],
    futureValues: [],
    undoRedo: false
  });

  const updateCurrent = ((object) => {
    if (undoRedoData.current.undoRedo) {
      return true;
    }
    if (JSON.stringify(object) !== JSON.stringify(undoRedoData.current.value)) {
      if (undoRedoData.current.value !== null) {
        undoRedoData.current.pastValues.push(structuredClone(undoRedoData.current.value));
      }
      undoRedoData.current.value = structuredClone(object);
      undoRedoData.current.futureValues = [];
      return true;
    } else {
      return false;
    }
  });

  const undo = (() => {
    if (undoRedoData.current.pastValues.length > 0) {
      undoRedoData.current.futureValues.push(structuredClone(undoRedoData.current.value));
      undoRedoData.current.value = undoRedoData.current.pastValues.pop();
      return undoRedoData.current.value;
    } else {
      return false;
    }
  });

  const redo = (() => {
    if (undoRedoData.current.futureValues.length > 0) {
      undoRedoData.current.pastValues.push(structuredClone(undoRedoData.current.value));
      undoRedoData.current.value = undoRedoData.current.futureValues.pop();
      return undoRedoData.current.value;
    } else {
      return false;
    }
  });

  const undoDisabled = (() => {
    if (undoRedoData.current.pastValues.length > 0) {
      return false;
    } else {
      return true;
    }
  });

  const redoDisabled = (() => {
    if (undoRedoData.current.futureValues.length > 0) {
      return false;
    } else {
      return true;
    }
  });

  const back = (() => {
    undoRedoData.current.undoRedo = true;
    let temp = undo();
    if (temp !== false) {
      setPostData(structuredClone(temp));
      fetchData(temp, true);
    }
  });

  const forward = (() => {
    undoRedoData.current.undoRedo = true;
    let temp = redo();
    if (temp !== false) {
      setPostData(structuredClone(temp));
      fetchData(temp, true);
    }
  });

  const writeDiveId = ((value) => {
    fetchDive({ id: value });
  })

  const writeGroupBy = ((value) => {
    clearTimeout(timer.current);
    postData.groupBy = value;
    setPostData(structuredClone(postData));
    fetchData(postData, false);
  })

  const writeCheckboxList = ((label, option, delay) => {
    clearTimeout(timer.current);
    postData.checkboxList.map((item) => {
      if (item[0] === label) {
        item[2] = option;
      }
      return item;
    });
    setPostData(structuredClone(postData));
    timer.current = setTimeout((() => { fetchData(postData) }), delay);
  });

  const writeStartEnds = ((option, value, delay) => {
    clearTimeout(timer.current);
    postData.startEnds[option] = value;
    setPostData(structuredClone(postData));
    timer.current = setTimeout((() => { fetchData(postData) }), delay);
  });

  const writeSearch = ((search, delay) => {
    clearTimeout(timer.current);
    postData.searchTerm = search;
    setPostData(structuredClone(postData));
    timer.current = setTimeout((() => { fetchData(postData) }), delay);
  })

  const writeSearchOptions = ((searchOptions, delay) => {
    clearTimeout(timer.current);
    postData.searchOptions = searchOptions;
    setPostData(structuredClone(postData));
    timer.current = setTimeout((() => { fetchData(postData) }), delay);
  });

  const writeFormats = ((format, value) => {
    const type = format + "Format";
    formats[type] = value;
    setFormats(structuredClone(formats));
  })

  const setSearch = ((searchTerm, type) => {
    postData.checkboxList = structuredClone(defaultCheckboxList);
    postData.startEnds = structuredClone(defaultStartEnds);
    switch (type) {
      case "site":
        postData.searchOptions = structuredClone(siteOptions);
        break;
      case "country":
        postData.searchOptions = structuredClone(countryOptions);
        break;
      case "buddy":
        postData.searchOptions = structuredClone(buddyOptions);
        break;
      default:
        postData.searchOptions = structuredClone(defaultSearchOptions);
    }
    postData.searchTerm = searchTerm;
    setPostData(structuredClone(postData));
    fetchData(postData);
  });

  const resetAll = (() => {
    if (!undoRedoData.current.undoRedo) {
      postData.checkboxList = structuredClone(defaultCheckboxList);
      postData.startEnds = structuredClone(defaultStartEnds);
      postData.searchOptions = structuredClone(defaultSearchOptions);
      postData.searchTerm = "";
      postData.groupBy = "";
      setPostData(structuredClone(postData));
      fetchData(postData);
    }
  })

  const fetchTiles = (async (toSend) => {
    window.scrollTo(0, 0);
    setEnd(12);
    setLoading(true);
    try {
      const response = await fetch(`https://higgie.net/divelog/tiles`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(toSend)
      });
      console.log(response);
      const data = await response.json();
      setTileData(data.response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  });

  const fetchDive = (async (diveId) => {
    setDiveLoading(true);
    try {
      const response = await fetch(`https://higgie.net/divelog/dive`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(diveId)
      });
      const data = await response.json();
      setDiveInfo(data.response.diveInfo[0]);
      setDiveLoading(false);
    } catch (error) {
      console.log(error);
      setDiveLoading(false);
    }
  });

  const fetchData = ((toSend, getSummary = true) => {
    const fetchSummary = (async (summaryToSend) => {
      setSummaryDataLoading(true);
      try {
        const response = await fetch(`https://higgie.net/divelog/summary`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(summaryToSend)
        });
        const data = await response.json();
        setSummaryData(data.response);
        setSummaryDataLoading(false);
        undoRedoData.current.undoRedo = false;
      } catch (error) {
        console.log(error);
        setSummaryDataLoading(false);
      }
    });
    if (updateCurrent(toSend)) {
      fetchTiles(toSend);
      if (getSummary) {
        fetchSummary(toSend);
      }
    }
  });

  if (undoRedoData.current.value === null) {
    fetchData(postData);
  };

  return <AppContext.Provider value={{
    loading, formats, postData, tileData, end, diveInfo, diveLoading, summaryData, summaryDataLoading,
    undoDisabled, redoDisabled,
    writeCheckboxList, writeStartEnds, writeGroupBy, setFormats, writeDiveId, writeFormats,
    writeSearchOptions, writeSearch, setSearch, setEnd, back, forward, resetAll
  }} > {children}</AppContext.Provider >
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
