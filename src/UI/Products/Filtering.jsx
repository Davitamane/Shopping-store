import Button from "../Button";
import Input from "../Input";

function Filtering() {
  return (
    <div className="absolute mt-2 w-98 p-4 bg-white rounded-md shadow-lg border border-gray-200 z-10 right-56">
      <h1 className="font-semibold text-base pb-5">Select price</h1>
      <div className="grid grid-cols-2 gap-2.5 pb-2.5">
        <Input required={true} text="From" />
        <Input required={true} text="To"  />
      </div>
      <div className="flex justify-end">
        <div className="w-31">
          <Button>Apply</Button>
        </div>
      </div>
    </div>
  );
}

export default Filtering;
