import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import events from "../Redux/Slices/Event/eventSlice";
import detail from "../Redux/Slices/Event/eventSlice";
import login from "../Redux/Slices/Modals/modalSlice";
import places from "../Redux/Slices/Places/placesSlice";
import favorites from "../Redux/Slices/Favorites/favoritesSlice";
import genres from "../Redux/Slices/Genres/genresSlice";
import purchased from "../Redux/Slices/Purchased/purchasedSlice";
import session from "./Slices/Session/sessionSlice";
import user from "./Slices/User/userSlice";
import artist from "./Slices/Artist/artistSlice";
import filter from "./Slices/Filter/filterSlice";
import map from "./Slices/Map/mapSlice";
import loading from "./Slices/Loading/LoadingSlices";
import userPublic from "./Slices/User/userSlice";
import posts from "./Slices/Post/postSlice";
import comments from "./Slices/Comments/commentsSlices";
import artistId from "./Slices/Artist/artistSlice";
import userId from "./Slices/User/userSlice";
import addFav from "./Slices/Favorites/favoritesSlice";
import team from "./Slices/Team/teamSlice";
import users from "./Slices/Users/usersSlice";
import commentsId from "./Slices/Comments/commentsSlices";
import profile from "./Slices/Profile/ProfileSlice";
import scroll from "./Slices/Scroll/ScrollSlice";
import postDetail from "./Slices/Comments/commentsSlices"
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["sessionState", "detailState","postDetail"],
};

const rootReducer = combineReducers({
    loadingState: loading,
    userState: user,
    sessionState: session,
    detailState: detail,
    modalState: login,
    eventsState: events,
    placesState: places,
    favoritesState: favorites,
    genresState: genres,
    purchasedState: purchased,
    artistState: artist,
    filterState: filter,
    mapState: map,
    userPublicState: userPublic,
    userIdState: userId,
    userStateTickets: user,
    posts: posts,
    comments: comments,
    artistId: artistId,
    addFav: addFav,
    teamState: team,
    usersState: users,
    profileState: profile,
    scrollState: scroll,
    commentsId:commentsId,
    postDetail:postDetail
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
});
