import Button from "../Button";
import Color from "./Color";
import Dropdown from "./Dropdown";
import Size from "./Size";
import Cart from "../../assets/Cart-white.svg";

function Details() {
  const quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-col gap-4.5">
        <h1 className="font-semibold text-3xl">
          Kids' Curved Hilfiger Graphic T-Shirt
        </h1>
        <h3 className="font-semibold text-3xl">$ 25</h3>
      </div>

      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-5">
          <p className="text-[16]px">Color: baby pink</p>
          <div className="flex items-center gap-4">
            <Color color="red" active={true} />
            <Color />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p>Size: L</p>
          <div className="flex items-center gap-4">
            <Size active={false} size="XS" />
            <Size active={false} size="S" />
            <Size active={false} size="M" />
            <Size active={true} size="L" />
            <Size active={false} size="XL" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p>Quantity</p>
          <Dropdown data={quantity} />
        </div>
      </div>

      <Button>
        <img src={Cart} alt="cart" />
        <p>Add to cart</p>
      </Button>

      <div className="w-full h-px bg-gray-200" />

      <div>
        <h3>Details</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione esse
          possimus nostrum incidunt animi. Placeat fugiat, rerum velit
          aspernatur enim facere dolores eveniet voluptas ipsam nesciunt
          asperiores, at adipisci fugit.
        </p>
      </div>
    </div>
  );
}

export default Details;
