import Button from "../Button";
import Color from "./Color";
import Dropdown from "./Dropdown";
import Size from "./Size";
import Cart from "../../assets/Cart-white.svg";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postProduct } from "../../services/apiQuery";
import { toast } from "react-toastify";

function Details({ data, id, activeColor, setActiveColor, setIsCartOpen }) {
  const [activeSize, setActiveSize] = useState(
    data.size ||
      (Array.isArray(data.available_sizes) && data.available_sizes[0]) ||
      ""
  );

  const [activeAmount, setActiveAmount] = useState(data.quantity || 1);
  const quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const queryClient = useQueryClient();
  const sizeOrder = ["XS", "S", "M", "L", "XL"];
  const token = localStorage.getItem("token");

  const { mutate } = useMutation({
    mutationFn: ({ id, data }) => postProduct(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Successfully added to cart!");
      setIsCartOpen(true);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function handleSubmit() {
    mutate({
      id,
      data: {
        quantity: activeAmount,
        color: activeColor,
        size: activeSize,
      },
    });
  }

  return (
    <div className="flex flex-col gap-14">
      {activeAmount !== null && (
        <div className="flex flex-col gap-4.5">
          <h1 className="font-semibold text-3xl">{data.name}</h1>
          <h3 className="font-semibold text-3xl">
            $ {data.price * activeAmount}
          </h3>
        </div>
      )}

      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-5">
          <p className="text-[16]px">Color: {activeColor}</p>
          <div className="flex items-center gap-4">
            {data.available_colors.map((color, i) => (
              <Color
                color={color}
                active={color === activeColor}
                setActiveColor={setActiveColor}
                key={i}
              />
            ))}
          </div>
        </div>

        {data.available_sizes && data.available_sizes.length > 0 && (
          <div className="flex flex-col gap-4">
            <p>Size: {activeSize}</p>
            <div className="flex items-center gap-4">
              {data.available_sizes
                .sort((a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b))
                .map((size, i) => (
                  <Size
                    active={size === activeSize}
                    setActiveSize={setActiveSize}
                    size={size}
                    key={i}
                  />
                ))}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4">
          <p>Quantity</p>
          <Dropdown
            data={quantity}
            selected={activeAmount}
            setSelected={setActiveAmount}
          />
        </div>
      </div>
      {token ? (
        <Button
          onClick={() => {
            handleSubmit();
          }}
        >
          <img src={Cart} alt="cart" />
          <p>Add to cart</p>
        </Button>
      ) : (
        <Button
          onClick={() => toast.error("You must be logged in first")}
          disabled={true}
        >
          <img src={Cart} alt="cart" />
          <p>Add to cart</p>
        </Button>
      )}

      <div className="w-full h-px bg-gray-200" />

      <div className="flex flex-col gap-7">
        <div className="flex w-full justify-between items-center">
          <h3 className="font-semibold text-xl">Details</h3>
          <img src={data.brand.image} alt="photo" className="w-12" />
        </div>
        <div className="flex flex-col gap-5">
          <h4>Brand: {data.brand.name}</h4>
          <p>{data.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Details;
