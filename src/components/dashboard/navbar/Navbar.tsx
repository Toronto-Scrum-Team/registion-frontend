"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import DashIcon from '../../../../public/icons/category.svg';


export const Navbar: React.FC = () => {
  const router = useRouter();
  return (
    <nav className="bg-[#071922] fixed h-full rounded-r-lg shadow-xl/20">
      <div className="max-h-7x1 max-auto px-4 pt-12 sm:px-12 lg:px-16">
        <div className="items-center justify-between">
          <p>close</p>

          <ul className="pt-14">
            <li className="flex hover:bg-[#B4CD93] text-[#808080] hover:text-[#4C4C4C] rounded-md py-1 pl-3 pr-6">
              <Image priority src={DashIcon} alt="dashboard icon"/>
              <p className="pl-2 justify-center">dashboard</p>
              </li>
            <li>profile</li>
            <li>projects</li>
            <li>saved</li>
          </ul>

          <ul className="pt-14">
            <li>settings</li>
            <li>logout</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

