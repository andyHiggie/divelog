import React, { useState, useRef, useEffect } from "react";
import Logo from "../../includes/images/logo.svg";
import Search from "../filters/Search";
import Filters from "../filters/Filters";
import Checkboxes from "../filters/Checkboxes";
import ViewSelect from "../filters/ViewSelect";
import Settings from "./Settings";
import { FaCog } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoMdArrowRoundForward } from "react-icons/io";
import { useGlobalContext } from "../../context";

const Toolbar = () => {
  const { resetAll, back, forward, undoDisabled, redoDisabled } = useGlobalContext();
  const [searchExpanded, setSearchExpanded] = useState(true);
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const [checkboxesExpanded, setCheckboxesExpanded] = useState(false);
  const [settingsExpanded, setSettingsExpanded] = useState(false);
  const searchRef = useRef("");
  const filtersRef = useRef("");
  const checkboxesRef = useRef("");
  const settingsRef = useRef("");

  const searchClickHandler = (() => {
    searchRef.current.setSize(!searchExpanded);
    setSearchExpanded(!searchExpanded);
  });

  const filtersClickHandler = (() => {
    filtersRef.current.setSize(!filtersExpanded);
    setFiltersExpanded(!filtersExpanded);
  });

  const checkboxesClickHandler = (() => {
    checkboxesRef.current.setSize(!checkboxesExpanded);
    setCheckboxesExpanded(!checkboxesExpanded);
  });

  const settingsClickHandler = (() => {
    settingsRef.current.setSize(!settingsExpanded);
    setSettingsExpanded(!settingsExpanded);
  });

  let searchClass = "btn";
  if (searchExpanded) {
    searchClass = "btn selected";
  }
  let filtersClass = "btn";
  if (filtersExpanded) {
    filtersClass = "btn selected";
  }
  let checkboxesClass = "btn";
  if (checkboxesExpanded) {
    checkboxesClass = "btn selected";
  }

  useEffect(() => {
    const resize = (() => {
      filtersRef.current.close();
      checkboxesRef.current.close();
      settingsRef.current.close();
      setFiltersExpanded(false);
      setCheckboxesExpanded(false);
      setSettingsExpanded(false);
    });
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <>
      <nav className="toolbar">
        <div className="main">
          <div className="tool-logo" onClick={() => { resetAll() }}>
            <img className="logo" src={Logo} alt="main logo" />
            <span className="big-logo-text">Diving</span>
            <span className="logo-text">Logbook</span>
            <button className="btn back-arrow" onClick={() => { back() }} disabled={undoDisabled()}><IoMdArrowRoundBack /></button>
            <button className="btn forward-arrow" onClick={() => { forward() }} disabled={redoDisabled()}><IoMdArrowRoundForward /></button>
          </div>
          <div className="nav-buttons">

          </div>
          <div className="tools">
            <ViewSelect site={true} country={false} buddy={true} />
            <button className={searchClass} onClick={() => { searchClickHandler() }}>search</button>
            <button className={checkboxesClass} onClick={() => { checkboxesClickHandler() }}>checkboxes</button>
            <button className={filtersClass} onClick={() => { filtersClickHandler() }}>filters</button>
            <div className="settings-icon" onClick={() => { settingsClickHandler() }}><FaCog /></div>
          </div>
        </div>
        <Settings ref={settingsRef} />
        <Search ref={searchRef} />
        <Checkboxes ref={checkboxesRef} />
        <Filters ref={filtersRef} />
      </nav>

    </>
  )
}

export default Toolbar
