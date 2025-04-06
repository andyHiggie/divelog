import React, { useEffect } from 'react';
import DiveTile from "../dives/DiveTile";
import BuddyTile from "../buddies/BuddyTile";
import CountryTile from "./CountyTile";
import SiteTile from "../sites/SiteTile";
import { useGlobalContext } from '../../context';

const TileList = () => {
    const { tileData, loading, end, setEnd } = useGlobalContext();

    useEffect(() => {
        const event = window.addEventListener('scroll', () => {
            if (!loading && (window.scrollY + window.innerHeight) >= document.body.scrollHeight - 2) {
                setEnd(end + 12);
            }
        })
        return () => { window.removeEventListener('scroll', event) }
    }, [end, loading, setEnd]);

    let visible = [];
    let Tile = null;
    if (tileData.diveInfo.length > 0) {
        visible = tileData.diveInfo.slice(0, end);
        Tile = DiveTile;
    } else if (tileData.countries.length > 0) {
        visible = tileData.countries.slice(0, end);
        Tile = CountryTile;
    } else if (tileData.sites.length > 0) {
        visible = tileData.sites.slice(0, end);
        Tile = SiteTile
    } else if (tileData.buddies.length > 0) {
        visible = tileData.buddies.slice(0, end);
        Tile = BuddyTile

    } else {
        return <></>
    }
    return (
        <div className="tile-list">
            {visible.map((data, index) => {
                return <Tile key={index} data={data} />
            })}
        </div>
    )
}

export default TileList