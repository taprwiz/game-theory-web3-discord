"use client";

import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Router, { useRouter } from "next/router";

import User from "@/public/avatar/user.svg"

import AppContext from "@/providers/AppContext";
import ProfileModal from "./forms/ProfileModal";
import { firUppercase } from "@/utils/utils";
import { logout } from "@/hook";


const Navbar = () => {

    const { profileModalOpen, serverID, userID, userImage, username, setProfileModalOpen } = useContext(AppContext);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState<boolean>(false);
    const [temp, setTemp] = useState<string>();
    const path = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (path) {
            setTemp(firUppercase(path?.split("/")[1]));
        }
    }, [path])

    const handleProfileModalOpen = () => {
        setProfileModalOpen(true);
        setProfileDropdownOpen(false);
    }

    const handleLogoutBtn = async () => {
        setProfileDropdownOpen(false);
        await logout();
        window.location.href = '/';
    }

    return (
        <div className="flex justify-between items-center px-8 py-4 w-full bg-cgrey-100">
            <div className="md:block hidden">
                <div className="flex cursor-pointer" onClick={() => router.push("/")}>
                    <Logo />
                    <div className="flex items-center">
                        <p className="pl-4 text-2xl leading-8 font-semibold text-cwhite text-center items-center">
                            Giveaway Bot - Game Theory
                        </p>
                    </div>
                </div>
            </div>
            <div className="md:hidden block text-2xl leading-8 font-semibold text-cwhite">
                {temp}
            </div>
            <div className="flex justify-center items-center relative" >
                <div className="flex justify-center items-center hover:cursor-pointer" onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}>
                    {userImage ? <img src={userImage} alt="user avatar" className="rounded-full border-[1.5px] border-cgrey-200" width={40} height={40} />
                        : <Image
                            src={User}
                            width={40}
                            height={40}
                            alt="user avatar"
                            className="rounded-full border-[1.5px] border-cgrey-200"
                        />
                    }
                    <p className="px-3 hover:underline text-cwhite text-base font-semibold md:block hidden">{firUppercase(username)}</p>
                </div>
                {profileDropdownOpen && (
                    <div className="flex flex-col right-0 absolute border border-cgrey-200 rounded-lg bg-[#1D1E22] top-[50px] w-[150px] items-end">
                        <div className="px-3 py-[6px] w-full hover:cursor-pointer hover:bg-cdark-50 text-cwhite border border-cgrey-200 text-base leading-6 font-" onClick={handleLogoutBtn}>Log out</div>
                        <div className="px-3 py-[6px] w-full hover:cursor-pointer hover:bg-cdark-50 text-cwhite border border-cgrey-200 text-base leading-6 font-" onClick={handleProfileModalOpen}>User Details</div>
                    </div>
                )}
            </div>
            {profileModalOpen && (
                <div className="flex fixed top-0 left-0 w-screen h-screen bg-cdark-50/30 backdrop-blur-sm justify-center items-center">
                    <ProfileModal />
                </div>
            )}
        </div>
    );
};

export default Navbar;
