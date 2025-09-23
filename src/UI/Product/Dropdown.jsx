import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

function Dropdown({ data, selected, setSelected }) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // console.log(event.target);

      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div
      ref={dropdownRef}
      className="relative text-sm font-medium bg-white w-17.5 h-10.5 "
    >
      <div
        className="flex justify-center gap-2 items-center h-10.5  border border-gray-300 rounded-md cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>{selected}</div>
        {isOpen ? (
          <MdKeyboardArrowUp className="w-5 h-5" />
        ) : (
          <MdKeyboardArrowDown className="w-5 h-5" />
        )}
      </div>
      {isOpen && (
        <div className="absolute z-10 bg-white border border-gray-300 rounded-md w-full shadow-md max-h-60 overflow-y-auto">
          {data.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className="px-4 py-3 flex items-center gap-2 hover:bg-purple-50 cursor-pointer"
            >
              <span>{option}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
