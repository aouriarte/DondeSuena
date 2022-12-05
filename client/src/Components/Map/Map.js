import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Map = ({ data }) => {
    const defaultCenter = {
        lat: Object.keys(data).length && data.geometry.location.lat,
        lng: Object.keys(data).length && data.geometry.location.lng,
    };
    console.log(defaultCenter);

    const style = {
        height: "50vh",
        width: "100%",
    };
    const api = process.env.REACT_APP_API_MAPS;
    return (
        <LoadScript googleMapsApiKey={api}>
            <GoogleMap
                mapContainerStyle={style}
                zoom={9}
                center={defaultCenter}
            >
                <Marker position={defaultCenter} />
            </GoogleMap>
        </LoadScript>
    );
};

export default Map;
