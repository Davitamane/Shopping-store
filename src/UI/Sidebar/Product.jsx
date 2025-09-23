import shirtSmall from "../../assets/shirtSmall.jpg";
import Amount from "./Amount";

function Product({ data }) {
  console.log(data);

  return (
    <div className="flex w-full gap-4 items-center ">
      <img
        src={shirtSmall}
        // src={data.cover_image}
        alt="shirt"
        className="rounded-xl border border-gray-200"
      />
      <div className="flex flex-col w-full gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h2>{data.name}</h2>
            <p className="font-semibold text-xl">$ 25</p>
          </div>
          <p className="text-xs">Baby pink</p>
          <p className="text-xs">L</p>
        </div>
        <div className="flex justify-between">
          <Amount />
          <button className="text-gray-400 text-sm">Remove</button>
        </div>
      </div>
    </div>
  );
}

export default Product;
