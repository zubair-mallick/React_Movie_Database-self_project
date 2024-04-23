import React from "react";

function Toggle({ setIsAnimationOn, isAnimationOn }) {
  return (
    <div className="flex">
      <label className="inline-flex relative items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isAnimationOn}
          readOnly
        />
        <div
          onClick={() => {
            setIsAnimationOn((previsAnimationOn)=>!previsAnimationOn); 
          }}
          className="w-11 h-6 bg-green-400 rounded-full peer  peer-focus:ring-red-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"
        ></div>
        <span className="text-sm font-medium text-gray-900">
          ON
        </span>
      </label>
    </div>
  );
}

export default Toggle;
