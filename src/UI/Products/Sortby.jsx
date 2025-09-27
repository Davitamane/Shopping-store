function Sortby({ setSearchParams, searchParams, setOpen }) {
  const page = +searchParams.get("page") || 1;
  const sort = searchParams.get("sort") || "";
  return (
    <div className="absolute mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10 right-24">
      <ul className="py-2 text-gray-700">
        <div className="px-4 py-2 font-semibold text-base">Sort by</div>
        <li
          onClick={() => {
            const newParams = new URLSearchParams(searchParams);
            newParams.set("page", page);
            newParams.set("sort", "created_at");
            setSearchParams(newParams);
            setOpen("");
          }}
          className={`px-4 py-2 ${sort === "created_at" ? "bg-gray-200" : "hover:bg-gray-100"} transition-all duration-300 cursor-pointer`}
        >
          New products first
        </li>
        <li
          className={`px-4 py-2 ${sort === "price" ? "bg-gray-200" : "hover:bg-gray-100"} transition-all duration-300 cursor-pointer`}
          onClick={() => {
            const newParams = new URLSearchParams(searchParams);
            newParams.set("page", page);
            newParams.set("sort", "price");
            setSearchParams(newParams);
            setOpen("");
          }}
        >
          Price, low to high
        </li>
        <li
          className={`px-4 py-2 ${sort === "-price" ? "bg-gray-200" : "hover:bg-gray-100"} transition-all duration-300 cursor-pointer`}
          onClick={() => {
            const newParams = new URLSearchParams(searchParams);
            newParams.set("page", page);
            newParams.set("sort", "-price");
            setSearchParams(newParams);
            setOpen("");
          }}
        >
          Price, high to low
        </li>
      </ul>
    </div>
  );
}

export default Sortby;
