function Sortby() {
  return (
    <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10 right-24">
      <ul className="py-2 text-gray-700">
        <div className="px-4 py-2 font-semibold text-base">Sort by</div>
        <li className="px-4 py-2 hover:bg-gray-100 transition-all duration-300 cursor-pointer">
          New products first
        </li>
        <li className="px-4 py-2 hover:bg-gray-100 transition-all duration-300 cursor-pointer">
          Price, low to high
        </li>
        <li className="px-4 py-2 hover:bg-gray-100 transition-all duration-300 cursor-pointer">
          Price, high to low
        </li>
      </ul>
    </div>
  );
}

export default Sortby;
