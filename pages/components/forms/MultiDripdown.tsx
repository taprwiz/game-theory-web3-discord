
import React, { useState } from "react";
import Image from "next/image";

import ArrowDown from "@/public/avatar/arrow-down.svg"
import Cancel from "@/public/avatar/close-circle.svg"
import ArrowUp from "@/public/avatar/arrow-up.svg"

import { IMultiDropdownProps, IServerRole } from "@/utils/_type";

const MultiDropdown: React.FC<IMultiDropdownProps> = ({ dropdownList, placeholder, className, callback, initValue }) => {

    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>(initValue ? initValue : placeholder);

    const handleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    }

    const handleCancelBtn = () => {
        callback("");
        setValue(placeholder);
    }

    const handleSetValue = (item: IServerRole) => {
        callback(item);
        setValue(item.name);
        setDropdownOpen(false);
    }

    return (
        <div className="w-full relative">
            <div className={`flex items-center w-full cursor-pointer border border-cgrey-200 px-4 py-[10px] rounded-lg justify-between ${className}`} onClick={handleDropdown}>
                <p className="text-sm font-normal text-cwhite">{initValue ? initValue : value}</p>
                <div className="flex gap-2 justify-between">
                    {(value !== placeholder || initValue) &&
                        <div className="cursor-pointer " onClick={handleCancelBtn}>
                            <Image
                                src={Cancel}
                                width="16"
                                height="16"
                                alt="th cancel"
                            />
                        </div>
                    }
                    {dropdownOpen ? <Image
                        src={ArrowUp}
                        width="16"
                        height="16"
                        alt="Arrow down"
                    /> : <Image
                        src={ArrowDown}
                        width="16"
                        height="16"
                        alt="Arrow down"
                    />}
                </div>
            </div>
            {dropdownOpen && <div className="absolute w-full cursor-pointer text-cwhite max-h-[200px] overflow-scroll flex flex-col mt-1 rounded-lg z-10">
                {dropdownList?.map((item, index) => (
                    <div
                        key={index}
                        className={`items-center w-full px-4 py-[10px] border-cgrey-200 rounded-md border justify-between text-sm font-normal text-cwhite ${className} `}
                        style={{ backgroundColor: `${item.color}` }}
                        onClick={() => handleSetValue(item)}>
                        {item.name}
                    </div>
                ))}
                {/* <div className={`items-center w-full px-4 py-[10px]  justify-between text-sm font-normal text-cwhite ${className}`} onClick={() => handleSetValue(dropdownList.id)}>{dropdownList?.name}</div> */}
            </div>
            }
            {dropdownOpen && (<div className="fixed top-0 left-0 w-screen h-screen bg-[transparent]" onClick={() => setDropdownOpen(false)}></div>)}
        </div>
    )
}

export default MultiDropdown;