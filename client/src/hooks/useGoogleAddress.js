import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMap } from "../Redux/Slices/Map/mapActions";

const useGoogleAddress = (address) => {
    const api = process.env.REACT_APP_API_MAPS;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setMap(address, api));
    }, []);

    const { map } = useSelector((state) => state.mapState);

    return map;
};

export default useGoogleAddress;
