"use client";

import Image from 'next/image';

interface NavliProps {
  title: string;
  icon: string;
}

export const Navli: React.FC<NavliProps> = ({ title,icon }) => {
  return (

    <div className="hover:bg-[#B4CD93] text-[#808080] hover:text-[#4C4C4C] cursor-pointer rounded-md">
        <div className='flex items-start brightness-100 hover:brightness-30 rounded-md py-1 pl-3 pr-6'>
        <Image priority src={icon} alt="menu icons"/>
        <p className="pt-1 pl-2 text-[14px] select-none">
            {title}</p>
        </div>
    </div>

  )
}