import shirtSmall from "../../assets/shirtSmall.jpg";
import Amount from "./Amount";

function Product() {
  return (
    <div className="flex w-full gap-4 items-center">
      <img
        src={shirtSmall}
        alt="shirt"
        className="rounded-xl border border-gray-200"
      />
      <div className="flex flex-col w-full gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h2>Kids' Curved Hilfiger Graphic T-Shirt</h2>
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
