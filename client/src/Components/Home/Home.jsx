import React from "react";
import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { changeLoading } from "../../Redux/Slices/Loading/LoadingActions";
import { getEvents } from "../../Redux/Slices/Event/eventActions";
import { Events } from "../EventCard/EventCard";
import CarouselCustom from "../Carousel/Carousel_custom";
import FilterBar from "../Filters/Filters";
import Loading from "../Loading/Loading";
import ArtistsSection from "../ArtistsSection/ArtistsSection";

const Home = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.loadingState);
    const location = useLocation();
    const path = location.pathname;

    useEffect(() => {
        dispatch(getEvents());
        window.scrollTo(0, 0);
    }, []);

    const loadingCallback = useCallback(() => {
        dispatch(changeLoading());
        setTimeout(() => {
            dispatch(changeLoading());
        }, 500);
    }, []);

    useEffect(() => {
        loadingCallback();
    }, [loadingCallback, path]);

    return (
        <div>
            <CarouselCustom />
            <nav>
                <div>
                    <FilterBar />
                </div>
            </nav>
            {loading && <Loading />}
            <div className={loading ? "hidden" : ""}>
                <div className="flex flex-wrap py-10">
                    <div className="w-1/6 max-h-screen flex flex-col items-center pt-20 gap-8">
                        <h3 className="text-xl font-semibold text-customGray uppercase italic lg:text-2xl text-center">
                            Todos los Artistas
                        </h3>
                        <ArtistsSection />
                    </div>
                    <div className="w-4/6 flex flex-col items-center rounded-3xl bg-gray-100 pt-8 gap-8">
                        <h2 className="text-3xl font-semibold text-customGray uppercase lg:text-5xl text-center">
                            Próximos Eventos
                        </h2>
                        <Events />
                    </div>
                    <div className="w-1/6 max-h-20 flex flex-col items-center pt-20 gap-8">
                        <h3 className="text-xl font-semibold text-customGray uppercase italic lg:text-2xl text-center">
                            Talento Emergente
                        </h3>
                        <ArtistsSection />
                    </div>
                    <div className="fixed bottom-40 right-1">
                        <a href="https://wa.me/51961392140" target="_blank">
                            <img
                                className="h-20 cursor-pointer"
                                src="https://res.cloudinary.com/ds41xxspf/image/upload/v1669761037/Donde-Suena-Assets/WhatsApp_tzq2en.png"
                                alt="WhatsApp"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
