import React from "react";
import Image from "next/image";
import logo from "../../../../public/logo.png";

export default function Navbar() {
  return (
    <div className="bg-white h-[5rem] drop-shadow-2xl flex justify-around inset-x-0">
      <div className="md:w-[90%] w-[90%] justify-between items-center flex relative z-10">
        <div className="font-bold">
          <Image
            height={500}
            width={500}
            src={logo}
            alt="ommaleka"
            className="w-[11rem]"
          />
        </div>
        <ul className="md:space-x-[2rem] text-[.8rem] font-normal md:flex hidden">
          <li>Home</li>
          <li>Buat Rpp</li>
          <li>Buat Soal</li>
          <li>Artikel</li>
        </ul>

        {/* mobile */}
        <ul className="md:space-x-[2rem] text-[.8rem] font-normal md:flex block top-[4rem] absolute bg-white p-[2rem] right-0 z-50 md:hidden">
          <li>Home</li>
          <li>Buat Rpp</li>
          <li>Buat Soal</li>
          <li>Artikel</li>
        </ul>
      </div>
    </div>
  );
}
