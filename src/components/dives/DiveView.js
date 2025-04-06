import React, { useEffect, useRef, useState } from "react";
import Map from "../general/Map";
import Slider from "../sliders/Slider";
import LineGraph from "../graphs/LineGraph";
import SiteName from "../sites/SiteName";
import DateDisplay from "../displays/DateDisplay";
import TimeDisplay from "../displays/TimeDisplay";
import DepthDisplay from "../displays/DepthDisplay";
import BuddyList from "../buddies/BuddyList";
import DiveNumber from "../displays/DiveNumber";
import StopsDisplay from "../displays/StopsDisplay";
import ExpandingText from "../general/ExpandingText";
import Loading from "../general/Loading";
import { useGlobalContext } from "../../context";

const DiveView = ({ diveId, expandClickHandler }) => {
  const { writeDiveId, diveInfo } = useGlobalContext();
  const [localDiveInfo, setLocalDiveInfo] = useState(null);
  const profileRef = useRef();
  const [firstRun, setFirstRun] = useState(true);
  const [profileDimensions, setProfileDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (profileRef.current) {
        setProfileDimensions({
          width: profileRef.current.offsetWidth,
          height: profileRef.current.offsetHeight
        });
      }
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    if (firstRun) {
      writeDiveId(diveId);
      setFirstRun(false);
    } else if (!localDiveInfo && diveInfo.number === diveId) {
      setLocalDiveInfo(structuredClone(diveInfo));
    }
    return () => window.removeEventListener('resize', updateSize);
  }, [diveId, firstRun, writeDiveId, diveInfo, localDiveInfo]);


  if (!localDiveInfo || !localDiveInfo.site) {
    return (
      <div className="tile expanded">
        <div className="section-holder"><section><Loading /></section></div>
      </div>
    )
  } else {
    const props = { zoom: 10, height: 400, markers: localDiveInfo.site.markers };
    return (<>
      <div className="tile expanded">
        <div className="section-holder">
          <section>
            <Slider contents={localDiveInfo.site.images} baseURL={'../../../sites/'} />
            <div>
              <DiveNumber number={localDiveInfo.number} />
              <SiteName site={localDiveInfo.site} />
              <DateDisplay dateString={localDiveInfo.date} />
              <div><TimeDisplay time={localDiveInfo.time} /></div>
              <div><DepthDisplay depth={localDiveInfo.depth} /></div>
            </div>
          </section>
          <section>
            <Map {...props} />
            <ul className="list">
              <li key="1">Lat: <span className="data">{localDiveInfo.site.lat}</span></li>
              <li key="2">Lon: <span className="data">{localDiveInfo.site.lon}</span></li>
            </ul>
            <ExpandingText text={localDiveInfo.site.comment} />
          </section>
          <section>
            <div className="sub-section">
              <span className="text">Type of dive:</span><span className="data">{localDiveInfo.typeOfDive}</span>
            </div>
            <div className="sub-section">
              <span className="text"> Categories:</span>
              <ul className="list">
                {localDiveInfo.categories.map((category, index) => {
                  return (<li key={"c" + index}> <span className="data">{category}</span></li>);
                })}
              </ul>
            </div>
            <div>
              <div className="sub-section">Equipment list:
                <div className="data">{localDiveInfo.equipmentList}</div>
              </div>
            </div>
            <div className="sub-section">
              <ul className="list">
                {Object.keys(localDiveInfo.equipment).map((index) => {
                  return (<li key={index}><span className="text">{index[0].toUpperCase() + index.substring(1)}:</span><span className="data">{localDiveInfo.equipment[index]}</span></li>);
                })}
              </ul>
            </div>
          </section>
          <section>
            {diveInfo.notes !== "" ? <div className="highlight">{diveInfo.notes}</div> : <></>}
            <div>{localDiveInfo.comment}</div>
          </section>
          <section>
            <div>
              <BuddyList buddies={localDiveInfo.buddies} size={"large"} />
            </div>
          </section>
          <section>
            <div>
              <div className='profile' ref={profileRef}>
                <LineGraph profileData={localDiveInfo.profile} width={profileDimensions.width} height={profileDimensions.height - 30} />
                <div className="small-title">Stops:</div><StopsDisplay stops={localDiveInfo.stops} />
              </div>


            </div>
          </section>
        </div>
        <button className="big-btn" onClick={() => { expandClickHandler() }}>Hide details</button>
      </div >
    </>)
  }
}

export default DiveView
