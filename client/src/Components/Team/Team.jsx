import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTeam } from "../../Redux/Slices/Team/teamAction";
import Loading from "../Loading/Loading";

export default function Team() {
    const dispatch = useDispatch();
    const { team } = useSelector((state) => state.teamState);

    useEffect(() => {
        dispatch(getTeam());
    }, [dispatch]);

    return team.length < 1 ? (
        <Loading></Loading>
    ) : (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
            <div className="text-center pb-12">
                <h1 className="font-bold text-3xl md:text-4xl lg:text-4xl font-heading text-customGray">
                    Miembros del equipo
                </h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="group w-full bg-white rounded-lg p-12 flex flex-col justify-center items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 hover:bg-customGray duration-300">
                    <div className="mb-8">
                        <img
                            className="object-center object-cover rounded-full"
                            src={team[0]?.image}
                            alt=""
                        />
                    </div>
                    <div className="text-center">
                        <p className="text-xl text-customGray font-bold mb-2 transition ease-in-out delay-150 duration-300 group-hover:text-white">{`${team[0]?.firstName} ${team[0]?.lastName}`}</p>
                        <p className="text-base text-customGray font-normal mb-2 transition ease-in-out delay-150 duration-300 group-hover:text-white">
                            {team[0]?.tittle}
                        </p>
                    </div>
                    <div className="flex justify-center text-center">
                        <span className="p-3 text-center">
                            <a
                                href={team[0]?.urlGithub}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    className="cursor-pointer h-8 "
                                    src={team[0]?.iconGithub}
                                    alt="Github"
                                />
                            </a>
                        </span>
                        <div className="p-3 text-center">
                            <a
                                href={team[0]?.urlLinkedin}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    className="cursor-pointer h-8"
                                    src={team[0]?.iconLinkedin}
                                    alt="Linkedin"
                                />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="group w-full bg-white rounded-lg p-12 flex flex-col justify-center items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 hover:bg-customGray duration-300">
                    <div className="mb-8">
                        <img
                            className="object-center object-cover rounded-full"
                            src={team[1]?.image}
                            alt=""
                        />
                    </div>
                    <div className="text-center">
                        <p className="text-xl text-customGray font-bold mb-2 transition ease-in-out delay-150 duration-300 group-hover:text-white">{`${team[1]?.firstName} ${team[1]?.lastName}`}</p>
                        <p className="text-base text-customGray font-normal mb-2 transition ease-in-out delay-150 duration-300 group-hover:text-white">
                            {team[1]?.tittle}
                        </p>
                    </div>
                    <div className="flex justify-center text-center">
                        <span className="p-3 text-center">
                            <a
                                href={team[1]?.urlGithub}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    className="cursor-pointer h-8 "
                                    src={team[1]?.iconGithub}
                                    alt="Github"
                                />
                            </a>
                        </span>
                        <div className="p-3 text-center">
                            <a
                                href={team[1]?.urlLinkedin}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    className="cursor-pointer h-8"
                                    src={team[1]?.iconLinkedin}
                                    alt="Linkedin"
                                />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="group w-full bg-white rounded-lg p-12 flex flex-col justify-center items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 hover:bg-customGray duration-300">
                    <div className="mb-8">
                        <img
                            className="object-center object-cover rounded-full"
                            src={team[2]?.image}
                            alt=""
                        />
                    </div>
                    <div className="text-center">
                        <p className="text-xl text-customGray font-bold mb-2 transition ease-in-out delay-150 duration-300 group-hover:text-white">{`${team[2]?.firstName} ${team[2]?.lastName}`}</p>
                        <p className="text-base text-customGray font-normal mb-2 transition ease-in-out delay-150 duration-300 group-hover:text-white">
                            {team[2]?.tittle}
                        </p>
                    </div>
                    <div className="flex justify-center text-center">
                        <span className="p-3 text-center">
                            <a
                                href={team[2]?.urlGithub}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    className="cursor-pointer h-8 "
                                    src={team[2]?.iconGithub}
                                    alt="Github"
                                />
                            </a>
                        </span>
                        <div className="p-3 text-center">
                            <a
                                href={team[2]?.urlLinkedin}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    className="cursor-pointer h-8"
                                    src={team[2]?.iconLinkedin}
                                    alt="Linkedin"
                                />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="group w-full bg-white rounded-lg p-12 flex flex-col justify-center items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 hover:bg-customGray duration-300">
                    <div className="mb-8">
                        <img
                            className="object-center object-cover rounded-full"
                            src={team[3]?.image}
                            alt=""
                        />
                    </div>
                    <div className="text-center">
                        <p className="text-xl text-customGray font-bold mb-2 transition ease-in-out delay-150 duration-300 group-hover:text-white">{`${team[3]?.firstName} ${team[3]?.lastName}`}</p>
                        <p className="text-base text-customGray font-normal mb-2 transition ease-in-out delay-150 duration-300 group-hover:text-white">
                            {team[3]?.tittle}
                        </p>
                    </div>
                    <div className="flex justify-center text-center">
                        <span className="p-3 text-center">
                            <a
                                href={team[3]?.urlGithub}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    className="cursor-pointer h-8 "
                                    src={team[3]?.iconGithub}
                                    alt="Github"
                                />
                            </a>
                        </span>
                        <div className="p-3 text-center">
                            <a
                                href={team[3]?.urlLinkedin}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    className="cursor-pointer h-8"
                                    src={team[3]?.iconLinkedin}
                                    alt="Linkedin"
                                />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="group w-full bg-white rounded-lg p-12 flex flex-col justify-center items-center  transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 hover:bg-customGray duration-300">
                    <div className="mb-8">
                        <img
                            className="object-center object-cover rounded-full"
                            src={team[4]?.image}
                            alt=""
                        />
                    </div>
                    <div className="text-center">
                        <p className="text-xl text-customGray font-bold mb-2 transition ease-in-out delay-150 duration-300 group-hover:text-white">{`${team[4]?.firstName} ${team[4]?.lastName}`}</p>
                        <p className="text-base text-customGray font-normal mb-2 transition ease-in-out delay-150 duration-300 group-hover:text-white">
                            {team[4]?.tittle}
                        </p>
                    </div>
                    <div className="flex justify-center text-center">
                        <span className="p-3 text-center">
                            <a
                                href={team[4]?.urlGithub}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    className="cursor-pointer h-8 "
                                    src={team[4]?.iconGithub}
                                    alt="Github"
                                />
                            </a>
                        </span>
                        <div className="p-3 text-center">
                            <a
                                href={team[4]?.urlLinkedin}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    className="cursor-pointer h-8"
                                    src={team[4]?.iconLinkedin}
                                    alt="Linkedin"
                                />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="group w-full bg-white rounded-lg p-12 flex flex-col justify-center items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 hover:bg-customGray duration-300">
                    <div className="mb-8">
                        <img
                            className="object-center object-cover rounded-full"
                            src={team[5]?.image}
                            alt=""
                        />
                    </div>
                    <div className="text-center">
                        <p className="text-xl text-customGray font-bold mb-2 transition ease-in-out delay-150 duration-300 group-hover:text-white">{`${team[5]?.firstName} ${team[5]?.lastName}`}</p>
                        <p className="text-base text-customGray font-normal mb-2 transition ease-in-out delay-150 duration-300 group-hover:text-white">
                            {team[5]?.tittle}
                        </p>
                    </div>
                    <div className="flex justify-center text-center">
                        <span className="p-3 text-center">
                            <a
                                href={team[5]?.urlGithub}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    className="cursor-pointer h-8 "
                                    src={team[5]?.iconGithub}
                                    alt="Github"
                                />
                            </a>
                        </span>
                        <div className="p-3 text-center">
                            <a
                                href={team[5]?.urlLinkedin}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    className="cursor-pointer h-8"
                                    src={team[5]?.iconLinkedin}
                                    alt="Linkedin"
                                />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="group w-full bg-white rounded-lg p-12 flex flex-col justify-center items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 hover:bg-customGray duration-300">
                    <div className="mb-8">
                        <img
                            className="object-center object-cover rounded-full"
                            src={team[6]?.image}
                            alt=""
                        />
                    </div>
                    <div className="text-center">
                        <p className="text-xl text-customGray font-bold mb-2 transition ease-in-out delay-150 duration-300 group-hover:text-white">{`${team[6]?.firstName} ${team[6]?.lastName}`}</p>
                        <p className="text-base text-customGray font-normal mb-2 transition ease-in-out delay-150 duration-300 group-hover:text-white">
                            {team[6]?.tittle}
                        </p>
                    </div>
                    <div className="flex justify-center text-center">
                        <span className="p-3 text-center">
                            <a
                                href={team[6]?.urlGithub}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    className="cursor-pointer h-8 "
                                    src={team[6]?.iconGithub}
                                    alt="Github"
                                />
                            </a>
                        </span>
                        <div className="p-3 text-center">
                            <a
                                href={team[6]?.urlLinkedin}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    className="cursor-pointer h-8"
                                    src={team[6]?.iconLinkedin}
                                    alt="Linkedin"
                                />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="group w-full bg-white rounded-lg p-12 flex flex-col justify-center items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 hover:bg-customGray duration-300">
                    <div className="mb-8">
                        <img
                            className="object-center object-cover rounded-full"
                            src={team[7]?.image}
                            alt=""
                        />
                    </div>
                    <div className="text-center">
                        <p className="text-xl text-customGray font-bold mb-2 transition ease-in-out delay-150 duration-300 group-hover:text-white">{`${team[7]?.firstName} ${team[7]?.lastName}`}</p>
                        <p className="text-base text-customGray font-normal mb-2 transition ease-in-out delay-150 duration-300 group-hover:text-white">
                            {team[7]?.tittle}
                        </p>
                    </div>
                    <div className="flex justify-center text-center">
                        <span className="p-3 text-center">
                            <a
                                href={team[7]?.urlGithub}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    className="cursor-pointer h-8 "
                                    src={team[7]?.iconGithub}
                                    alt="Github"
                                />
                            </a>
                        </span>
                        <div className="p-3 text-center">
                            <a
                                href={team[7]?.urlLinkedin}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    className="cursor-pointer h-8"
                                    src={team[7]?.iconLinkedin}
                                    alt="Linkedin"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
