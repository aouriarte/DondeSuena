import { Route, Routes, Navigate } from "react-router-dom";

//Components Import
import ArtistForm from "./Components/ArtistForm/ArtistForm";
import Home from "./Components/Home/Home";
import EventDetail from "./Components/EventDetail/EventDetail.jsx";
import UserForm from "./Components/UserForm/UserForm";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Login from "./Components/Login/Login";
import EventCreation from "./Components/EventForm/EventForm";
import PostVar from "./Components/PostVar/PostVar";
import ArtistProfile from "./Components/ArtistProfile/ArtistProfile";
import UserFavorites from "./Components/UserFavorites/UserFavorites";
import MyShopping from "./Components/MyShopping/MyShopping";
import Confirm from "./Components/Confirm/Confirm";
import PostHome from "./Components/PostHome/PostHome.jsx";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import UserProfile from "./Components/UserProfile/UserProfile";
import ArtistDashboard from "./Components/ArtistDashboard/ArtistDashboard";
import Team from "./Components/Team/Team";
import DashboardAdmin from "./Components/DashboardAdmin/DashboardAdmin";

import { useSelector } from "react-redux";
import ArtistShows from "./Components/ArtistShows/ArtistShows";
import PostDetail from "./Components/PostDetail/PostDetail";
function App() {
    const user = useSelector((state) => state.sessionState?.user);

    const isLogged = user.isLogged;
    const isArtist = user.artista || false;
    const isAdmin = user.admin || false;
    const token = user.token || null;
    return (
        <div className="App w-full min-h-screen">
            <Navbar />
            <Login />
            <Routes>
                <Route
                    path="/admin/*"
                    element={
                        isAdmin && isLogged ? (
                            <DashboardAdmin />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
                <Route path={"/"} element={<Home />} />
                <Route path={"/forgotPassword"} element={<ForgotPassword />} />
                <Route
                    path={"/reset-password/:token"}
                    element={<ResetPassword />}
                />
                <Route
                    exact
                    path={"/register/artist"}
                    element={!isLogged ? <ArtistForm /> : <Navigate to="/" />}
                />
                <Route
                    exact
                    path={"/register/user"}
                    element={!isLogged ? <UserForm /> : <Navigate to="/" />}
                />
                <Route
                    exact
                    path={"/create/event"}
                    element={
                        isArtist && token ? (
                            <EventCreation />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
                <Route
                    path={"/myshopping/:id"}
                    element={
                        isLogged && token ? <MyShopping /> : <Navigate to="/" />
                    }
                />
                <Route
                    path={"/artistshows"}
                    element={
                        isArtist && token ? (
                            <ArtistShows />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
                <Route path={"/details/:id"} element={<EventDetail />} />
                <Route path={"/confirm/:token"} element={<Confirm />} />
                <Route path={"/postVar"} element={<PostVar />} />
                <Route path={"/postHome"} element={<PostHome />} />
                <Route path={"/postHome/:id"} element={<PostDetail />} />
                <Route path={"/userProfile/:id"} element={<UserProfile />} />
                <Route
                    path={"/artistProfile/:id"}
                    element={<ArtistProfile />}
                />
                <Route
                    path="/myDashboard"
                    element={
                        isArtist && token ? (
                            <ArtistDashboard />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
                <Route path="/myDashboard" element={<ArtistDashboard />} />
                <Route path="/team" element={<Team />} />
            </Routes>
            <Footer />
        </div>
    );
}
//.
export default App;
