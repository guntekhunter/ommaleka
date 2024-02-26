import React from "react";
import Image from "next/image";
import logo from "../../../../public/logo.png";

export default function Navbar() {
  return (
    <div className="bg-white h-[5rem] flex justify-around z-10 border-b-[.4rem] border-black">
      <div className="md:w-[90%] w-[90%] justify-between items-center flex relative ">
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
        <ul className="md:space-x-[2rem] text-[.8rem] font-normal md:flex block top-[4rem] absolute bg-white p-[2rem] right-0 z-50 md:hidden drop-shadow-3xl border-black border-[1.5px] rounded-[1rem]">
          <li>Home</li>
          <li>Buat Rpp</li>
          <li>Buat Soal</li>
          <li>Artikel</li>
        </ul>
      </div>
    </div>
  );
}
