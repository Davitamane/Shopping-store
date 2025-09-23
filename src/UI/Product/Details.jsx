import Button from "../Button";
import Color from "./Color";
import Dropdown from "./Dropdown";
import Size from "./Size";
import Cart from "../../assets/Cart-white.svg";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { postProduct } from "../../services/apiQuery";
import { toast } from "react-toastify";

function Details({ data, id }) {
  const [activeColor, setActiveColor] = useState(
    data.color === "Default" ? data.available_colors[0] : data.color
  );
  const [activeSize, setActiveSize] = useState(data.size);
  const [activeAmount, setActiveAmount] = useState(data.quantity);
  const quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: ({ id, data }) => postProduct(data, id),
    onSuccess: (info) => {
      console.log(info);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      navigate("/");
      toast.success("Successfully added to cart!");
    },
    onError: (error) => {
      console.error("failed to send", error);
    },
  });

  function handleSubmit() {
    mutate({
      id, // this is the product ID you get from props
      data: {
        quantity: activeAmount,
        color: activeColor,
        size: activeSize,
      },
    });
  }

  return (
    <div className="flex flex-col gap-14">
      <div className="flex flex-col gap-4.5">
        <h1 className="font-semibold text-3xl">{data.name}</h1>
        <h3 className="font-semibold text-3xl">
          $ {data.price * activeAmount}
        </h3>
      </div>

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

        <div className="flex flex-col gap-4">
          <p>Size: {activeSize}</p>
          <div className="flex items-center gap-4">
            {data.available_sizes.sort().map((size, i) => (
              <Size
                active={size === activeSize}
                setActiveSize={setActiveSize}
                size={size}
                key={i}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p>Quantity</p>
          <Dropdown
            data={quantity}
            selected={activeAmount}
            setSelected={setActiveAmount}
          />
        </div>
      </div>

      <Button onClick={() => handleSubmit()}>
        <img src={Cart} alt="cart" />
        <p>Add to cart</p>
      </Button>

      <div className="w-full h-px bg-gray-200" />

      <div>
        <h3>Details</h3>
        <p>{data.description}</p>
      </div>
    </div>
  );
}

export default Details;
