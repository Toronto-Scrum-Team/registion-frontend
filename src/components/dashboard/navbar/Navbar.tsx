"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Navli } from '@/components/dashboard';

import DashIcon from '../../../../public/icons/category.svg';
import ProfileIcon from '../../../../public/icons/profile.svg';
import ProjectIcon from '../../../../public/icons/gallery.svg';
import SaveIcon from '../../../../public/icons/receipt-2.svg';
import SettingIcon from '../../../../public/icons/setting-2.svg';
import LogoutIcon from '../../../../public/icons/logout.svg';
import { AiOutlineClose } from "react-icons/ai";

export const Navbar: React.FC = () => {
  const router = useRouter();
  const [isopen, setIsOpen] = useState(true);

  console.log(router);

  return (
    <nav className="bg-[#071922] fixed h-full rounded-r-lg shadow-xl/20">
      <div className="max-h-7x1 max-auto px-4 pt-12 sm:px-12 lg:px-16">
        <div className="items-center justify-between">
          <button 
            className="float-right cursor-pointer"
            type="button"
            onClick={()=>setIsOpen(!isopen)}> 
            <AiOutlineClose size={24} color={"grey"}/>
            </button>
            

          <ul className="pt-14">
            <li className="pt-2">
              <a href="/"><Navli title="Dashboard" icon={DashIcon}/></a></li>
            <li className="pt-2">
              <a href="/profile"><Navli title="Profile" icon={ProfileIcon}/></a></li>
            <li className="pt-2"><Navli title="Projects" icon={ProjectIcon}/></li>
            <li className="pt-2"><Navli title="Saved" icon={SaveIcon}/></li>
          </ul>

          <ul className="pt-12">
            <li className="pt-2"><Navli title="Settings" icon={SettingIcon}/></li>
            <li className="pt-2"><Navli title="Logout" icon={LogoutIcon}/></li>
          </ul>

          
        </div>
      </div>
    </nav>
  );
};

