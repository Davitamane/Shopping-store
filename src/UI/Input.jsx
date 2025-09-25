import { useState } from "react";
import Eye from "../assets/eye.svg";
import mail from "../assets/Envelope.svg";

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

function Input({
  text,
  required = false,
  error,
  setState,
  value,
  type = "text",
}) {
  const [isTyping, setIsTyping] = useState(false);

  return (
    <div className="relative">
      {!value && (
        <PlaceholderText text={text} required={required} isTyping={isTyping} />
      )}
      <input
        type={type}
        className={`w-full border rounded-lg px-3 py-2 pr-7 text-gray-700 appearance-none bg-white 
          ${error ? "border-red-500" : "border-gray-300"} 
          focus:outline-none focus:shadow-sm`}
        onChange={(e) => {
          setIsTyping(e.target.value.length > 0);
          setState(e.target.value);
        }}
        value={value}
      />
    </div>
  );
}

function Addons({ text, error, required, setState, value }) {
  const [isTyping, setIsTyping] = useState(false);
  const [hidden, setHidden] = useState(true);

  return (
    <div className="relative w-full">
      <PlaceholderText text={text} required={required} isTyping={isTyping} />
      <input
        type={hidden ? "password" : "text"}
        className={`w-full border rounded-lg px-3 py-2 pr-7 text-gray-700 appearance-none 
          ${error ? "border-red-500" : "border-gray-300"} 
          focus:outline-none focus:shadow-sm`}
        onChange={(e) => {
          setIsTyping(e.target.value.length > 0);
          setState(e.target.value);
        }}
        value={value}
      />
      <button
        type="button"
        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500"
        onClick={() => setHidden(!hidden)}
      >
        <img src={Eye} alt="Toggle" />
      </button>
    </div>
  );
}
function EmailInput({ text, required = false, error, setState, value }) {
  return (
    <div
      className={`flex items-center border rounded-lg px-3 py-2 w-full bg-white
        ${error ? "border-red-500" : "border-gray-300"}`}
    >
      <img src={mail} alt="mail" className="w-5 h-5 mr-2" />
      <input
        type="email"
        placeholder={text || "Email"}
        required={required}
        value={value}
        onChange={(e) => setState?.(e.target.value)}
        className="w-full text-gray-700 bg-transparent focus:outline-none placeholder:text-gray-700"
      />
    </div>
  );
}

Input.Addons = Addons;
Input.EmailInput = EmailInput;

export default Input;
