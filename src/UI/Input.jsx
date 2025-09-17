import { useState } from "react";
import Eye from "../assets/eye.svg";

// Helper component for the custom placeholder
const PlaceholderText = ({ text, required, isTyping }) => {
  return (
    <div
      className={`absolute top-1/2 left-3 -translate-y-1/2 pointer-events-none  ${
        isTyping ? "opacity-0" : "opacity-100"
      }`}
    >
      <span className="text-gray-700">{text}</span>
      {required && <span className="text-orange-500"> *</span>}
    </div>
  );
};

function Input({ text, required = false, error }) {
  const [isTyping, setIsTyping] = useState(false);

  return (
    <div className="relative">
      <PlaceholderText text={text} required={required} isTyping={isTyping} />
      <input
        type="text"
        className={`w-full border rounded-lg px-3 py-2 pr-7 text-gray-700 appearance-none 
          ${error ? "border-red-500" : "border-gray-300"} 
          focus:outline-none focus:shadow-sm`}
        onChange={(e) => setIsTyping(e.target.value.length > 0)}
      />
    </div>
  );
}

function Addons({ text, error, required }) {
  const [isTyping, setIsTyping] = useState(false);

  return (
    <div className="relative w-full">
      <PlaceholderText text={text} required={required} isTyping={isTyping} />
      <input
        type="password"
        className={`w-full border rounded-lg px-3 py-2 pr-7 text-gray-700 appearance-none 
          ${error ? "border-red-500" : "border-gray-300"} 
          focus:outline-none focus:shadow-sm`}
        onChange={(e) => setIsTyping(e.target.value.length > 0)}
      />
      <button className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500">
        <img src={Eye} alt="Toggle visibility" />
      </button>
    </div>
  );
}

Input.Addons = Addons;

export default Input;
