import { Link } from "react-router-dom";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Product from "../UI/Sidebar/Product";
import Modal from "../UI/Modal";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../services/apiQuery";

function Checkout() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });
  if (!cartQuery.isFetched) return null;

  return (
    <div className="mx-25 my-18">
      <h1 className="font-bold text-[42px] mb-10.5">Checkout</h1>
      <div className="flex gap-32.5 justify-between">
        <div className="w-260 h-158 bg-[#F8F6F7] rounded-2xl px-12 py-18 flex flex-col gap-11.5">
          <h2 className="text-2xl">Order Details</h2>
          <div className="grid grid-cols-2 w-131 gap-x-6 gap-y-8">
            <Input text="Name" />
            <Input text="Surname" />
            <div className="col-span-2">
              <Input text="Email" />
            </div>
            <Input text="Address" />
            <Input text="Zip code" />
          </div>
        </div>
        <div className="h-158 w-115 ">
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto  flex flex-col gap-8">
              {cartQuery.data.map((data) => (
                <Product data={data} key={data.id} />
              ))}
              {/* <Product />
              <Product />
              <Product />
              <Product /> */}
            </div>

            <div className="flex-col gap-20 flex ">
              <div className="flex flex-col gap-4 mt-10">
                <div className="flex justify-between">
                  <p>Items total</p>
                  <p>$ 50</p>
                </div>
                <div className="flex justify-between">
                  <p>Delivery</p>
                  <p>$ 5</p>
                </div>
                <div className="flex justify-between text-xl font-semibold">
                  <p>Total</p>
                  <p>$ 50</p>
                </div>
              </div>
              <Button onClick={() => setIsModalOpen(true)}>Pay</Button>
            </div>
          </div>
        </div>
      </div>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
}

export default Checkout;
