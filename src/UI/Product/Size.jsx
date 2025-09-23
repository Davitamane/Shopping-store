function Size({ size, active = false, setActiveSize }) {
  return (
    <button
      onClick={() => {
        setActiveSize(size);
      }}
      className={`w-17.5 h-10.5 border rounded-xl flex items-center justify-center transition-all duration-300
        ${active ? "border-gray-700 bg-gray-100" : "border-gray-300 bg-white"}
        hover:bg-gray-200`}
    >
      {size}
    </button>
  );
}

export default Size;
