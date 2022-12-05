import {
    createPlaces,
    updatePlaces,
} from "../../Redux/Slices/Places/placesAction";
import { useDispatch, useSelector } from "react-redux";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useState } from "react";

export const CreatePlace = () => {
    const [value, setValue] = useState(null);

    console.log(value);

    const handleChange = (e) => {
        setValue(e.label);
    };

    return (
        <div>
            <GooglePlacesAutocomplete
                apiKey="AIzaSyC1OI_ABfPPn8mlEv2bGQRIXk74WaJDAWo"
                selectProps={{
                    value,
                    onChange: handleChange,
                }}
                apiOptions={{
                    language: "es",
                }}
            />
        </div>
    );
};
