import React from "react";

export default function Navbar() {
  return (
    <div className="bg-white h-[3rem] drop-shadow-2xl flex justify-around">
      <div className="w-[80%] justify-between items-center flex">
        <div className="font-bold">Ommaleka</div>
        <ul className="flex space-x-[2rem] text-[.8rem] font-normal">
          <li>Home</li>
          <li>Buat Rpp</li>
          <li>Buat Soal</li>
        </ul>
      </div>
    </div>
  );
}
