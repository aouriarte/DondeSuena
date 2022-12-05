import React from "react";
import "./footer.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Footer() {
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.loadingState);

    return (
        <div>
            {!loading && (
                <div className="bg-customGray">
                    <footer className="md:flex md:items-center md:justify-between md:p-4">
                        <img
                            onClick={() => navigate("/")}
                            className="h-20 ml-6 cursor-pointer animate-pulse"
                            src={
                                "https://res.cloudinary.com/ds41xxspf/image/upload/v1668097753/Donde-Suena-Assets/Henry_Proyecto_Grupal_Logo_mwreht.png"
                            }
                            alt="logo"
                        />
                        <div>
                        <div className="flex flex-col justify-center items-center mx-auto gap-4">
                            <ul className="flex flex-wrap gap-12 items-center mt-6">
                                <li>
                                    <img
                                        className="object-contain h-10 w-10 cursor-pointer"
                                        src="https://res.cloudinary.com/ds41xxspf/image/upload/v1668573857/Donde-Suena-Assets/ig-white_onltii.png"
                                        alt="instagram logo"
                                    />
                                </li>
                                <li>
                                    <img
                                        className="object-contain h-10 w-10 cursor-pointer"
                                        src="https://res.cloudinary.com/ds41xxspf/image/upload/v1668574298/Donde-Suena-Assets/dlf.pt-facebook-and-twitter-icons-5924528_fq1die.png"
                                        alt="twitter logo"
                                    />
                                </li>
                                <li>
                                    <img
                                        className="object-contain h-10 w-10 cursor-pointer"
                                        src="https://res.cloudinary.com/ds41xxspf/image/upload/v1668574467/Donde-Suena-Assets/pngfind.com-efectos-png-photoscape-3874615_spqlvq.png"
                                        alt="facebook logo"
                                    />
                                </li>
                            </ul>
                            <p className="text-white">
                                © DondeSuena {new Date().getFullYear()} - Hecho con ♫ por <Link to={"/team"} className="hover:text-customRed font-bold transition duration-200 ease-in-out">Los Magios</Link>.
                            </p>
                        </div>
                        </div>
                        <ul className="flex flex-wrap items-center text-base mr-6">
                            <li>
                                <a href="/team" className="text-white italic font-bold border-b-2 border-transparent px-4 py-2 hover:text-customRed hover:border-customRed transition duration-500 ease-in-out">
                                    Sobre Nosotros
                                </a>
                            </li>
                        </ul>
                    </footer>
                </div>
            )}
        </div>
    );
}
