'use client'

import React, { useEffect, useState } from "react";
import Image from "next/image";

import Refresh from "@/public/avatar/refresh.svg"

const SearchBtn: React.FC<SearchBtnProps> = ({ placeholder, endContent, callback, isInitialized }) => {

    const [value, setValue] = useState<string>();

    const handleChange = (value: string) => {
        callback(value);
        setValue(value);
    }

    useEffect(() => {
        console.log("isInitialized ====>", isInitialized);

        if (isInitialized) {
            setValue("")
        }
    }, [isInitialized])

    return (
        <div className="flex w-full text-sm font-normal">
            <div className="flex w-full rounded-lg border border-cgrey-200 px-4 py-[10px] bg-cdark-50">
                <input type="text" value={value} onChange={(e) => handleChange(e.target.value)} placeholder={placeholder} className="outline-none appearance-none bg-cdark-50 w-full placeholder:text-cgrey-900 text-cwhite" />
                <div onClick={() => location.reload()} className="hover:cursor-pointer flex gap-2 w-fit justify-between items-center  text-cwhite">
                    <Image
                        src={Refresh}
                        width="16"
                        height="16"
                        alt="refresh"
                    />
                    <span className="sm:block hidden hover:underline">{endContent}</span>
                </div>
            </div>
        </div>
    )
}

export default SearchBtn;

interface SearchBtnProps {
    placeholder: string
    endContent: string
    isInitialized?: boolean
    callback: (value: string) => void;
}