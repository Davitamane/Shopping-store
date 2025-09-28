import { useState } from "react";
import Button from "../Button";
import Input from "../Input";
import { toast } from "react-toastify";

function Filtering({ setSearchParams, sort, price_from, price_to, setOpen }) {
  const [min, setMin] = useState(price_from);
  const [max, setMax] = useState(price_to);

  function handleClick() {
    if (Number(max) <= Number(min)) {
      toast.error("Max price cannot be smaller than Min price");
      return;
    } else {
      setSearchParams({
        page: 1,
        sort,
        "filter[price_from]": min,
        "filter[price_to]": max,
      });
    }
  }

  return (
    <div className="absolute mt-2 w-98 p-4 bg-white rounded-md shadow-lg border border-gray-200 z-10 right-56">
      <h1 className="font-semibold text-base pb-5">Select price</h1>
      <div className="grid grid-cols-2 gap-2.5 pb-2.5">
        <input
          type="number"
          placeholder="From"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-7 text-gray-700 appearance-none bg-white 
            focus:outline-none focus:shadow-sm placeholder:text-gray-700 "
          onChange={(e) => setMin(e.target.value < 0 ? 0 : +e.target.value)}
          onKeyDown={(e) => e.key === "-" && e.preventDefault()}
          value={min}
        />
        <input
          type="number"
          placeholder="To"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-7 text-gray-700 appearance-none bg-white 
            focus:outline-none focus:shadow-sm placeholder:text-gray-700 "
          onChange={(e) => setMax(e.target.value < 0 ? 0 : +e.target.value)}
          onKeyDown={(e) => e.key === "-" && e.preventDefault()}
          value={max}
        />
      </div>
      <div className="flex justify-end">
        <div className="w-31">
          <Button
            onClick={() => {
              handleClick();
              setOpen("");
            }}
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Filtering;
