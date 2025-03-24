import { useState } from "react";

export default function Numpad() {
  const [input, setInput] = useState("");

  const handleButtonClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-200 rounded-xl shadow-md w-64">
      <div className="mb-4 p-2 w-full text-right text-xl bg-white rounded-md border border-gray-300 min-h-[2.5rem]">
        {input || "0"}
      </div>

      {/* ใช้ Grid เพื่อให้ layout เป็น Numpad */}
      <div className="grid grid-cols-3 gap-2 w-full justify-items-center">
        {[7, 8, 9, 4, 5, 6, 1, 2, 3, "C", 0, "⌫"].map((item, index) => (
          <button
            key={index}
            className="p-4 min-w-[60px] min-h-[60px] text-xl bg-white text-black font-bold rounded-lg shadow hover:bg-gray-100 active:bg-gray-300 flex items-center justify-center"
            onClick={() =>
              item === "C" ? handleClear() : item === "⌫" ? setInput(input.slice(0, -1)) : handleButtonClick(item)
            }
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
