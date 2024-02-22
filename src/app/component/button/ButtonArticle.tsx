import React from "react";

// @ts-ignore
export default function ButtonArticle({ onClick, className, children }) {
  return (
    <button
      onClick={onClick}
      className={`bg-purple-500 border border-[1.8px] border-black rounded-md py-[1rem] flex justify-center drop-shadow-3xl w-full ml-[-.2rem] hover:drop-shadow-none hover:ml-0 ${className}`}
    >
      {children}
    </button>
  );
}
