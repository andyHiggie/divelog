import React from "react";
import ExpandingText from "../general/ExpandingText";
import { useGlobalContext } from "../../context";

const BuddyItem = ({ props }) => {
    const { setSearch } = useGlobalContext();

    const className = "item float " + props.size;

    return (
        <div className={className} ref={props.ref}>
            <div className="image" onClick={() => { setSearch(props.name, "buddy") }}>
                <img src={"../../../buddies/" + props.images[0]} alt={props.name} />
            </div>
            <div className="item-footer">
                <h5>{props.name}</h5>
                {props.size === "large" && props.comment ? <ExpandingText text={props.comment} lines={8} hide={false} /> : <></>}
            </div>
        </div >
    )
};

export default BuddyItem;