import { useState } from "react";
import Button from "../Button";
import Input from "../Input";

function Filtering({
  setSearchParams,
  page,
  sort,
  price_from,
  price_to,
  setOpen,
}) {
  const [min, setMin] = useState(price_from);
  const [max, setMax] = useState(price_to);

  function handleClick() {
    setSearchParams({
      page,
      sort,
      "filter[price_from]": min,
      "filter[price_to]": max,
    });
  }
  return (
    <div className="absolute mt-2 w-98 p-4 bg-white rounded-md shadow-lg border border-gray-200 z-10 right-56">
      <h1 className="font-semibold text-base pb-5">Select price</h1>
      <div className="grid grid-cols-2 gap-2.5 pb-2.5">
        <Input
          required={true}
          text="From"
          setState={setMin}
          type="number"
          value={min}
        />
        <Input
          required={true}
          text="To"
          setState={setMax}
          type="number"
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
