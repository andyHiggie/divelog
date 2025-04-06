import React, { useRef, useEffect } from "react";
import "../../includes/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "../../includes/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import aFlag from "../../includes/images/aFlag.svg";
import L from "leaflet";
import { FeatureGroup, MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";

const Map = (props) => {
    const groupRef = useRef();
    const mapRef = useRef();
    const timer = useRef(null);

    useEffect(() => {
        timer.current = setTimeout(fitMapToMarkers, 10);
        return () => clearInterval(timer);
    }, []);

    const fitMapToMarkers = () => {
        if (mapRef.current && groupRef.current) {
            mapRef.current.fitBounds(groupRef.current.getBounds());
            if (mapRef.current.getZoom() > 10) {
                mapRef.current.setZoom(10);
            } else if (mapRef.current.getZoom() > 3) {
                mapRef.current.setZoom(mapRef.current.getZoom() - 1);
            }
        }
    }

    const DiveIcon = L.icon({
        iconUrl: aFlag,
        iconSize: [30, 30],
        iconAnchor: [0, 30],
        popupAnchor: [0, 0],
    });

    const style = {
        height: `${props.height}px`,
        borderRadius: '0.5em',
        zIndex: 20
    };

    const markerClickHandler = (e) => {
        props.markers.markerList.map((marker) => {
            if (Number(marker.lat) === Number(e.latlng.lat) && Number(marker.lon) === Number(e.latlng.lng)) {
                console.log(marker.id);
            }
            return marker;
        });
    }

    return (
        <MapContainer style={style} center={[props.markers.centerLat, props.markers.centerLon]} zoom={props.zoom} ref={mapRef} scrollWheelZoom={false} >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey=8d87c9133eb64057b486c57a7b86a12d"
            />
            <FeatureGroup ref={groupRef}>
                {props.markers.markerList.map((marker, index) => {
                    if (marker.lat !== 0 && marker.lon !== 0) {
                        if (marker.label === '') {
                            return (< Marker key={index} position={[marker.lat, marker.lon]} icon={DiveIcon} />)
                        } else {
                            return (
                                < Marker key={index} position={[marker.lat, marker.lon]} icon={DiveIcon} eventHandlers={{ click: markerClickHandler }}>
                                    <Tooltip direction="bottom" offset={[1, 2]} opacity={1} temporary>{marker.label}</Tooltip>
                                </Marker>
                            )
                        }
                    } else {
                        return <></>
                    }
                })}
            </FeatureGroup>
        </MapContainer >
    );
}

export default Map