import React from "react";

// @ts-ignore
export default function Input({ onChange, children, value }) {
  return (
    <div className="space-y-[.5rem]">
      <label htmlFor="mataPelajaran">{children}</label>
      <input
        placeholder=""
        className="text-gray-600 w-full border-[1.5px] py-2 px-[.8rem] border-black dark:border-gray-500 rounded-md appearance-none"
        name="nama sekolah"
        id=""
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
