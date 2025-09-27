import { Link } from "react-router-dom";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Product from "../UI/Sidebar/Product";
import Modal from "../UI/Modal";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCart, postCheckout } from "../services/apiQuery";
import { AuthContext } from "../contexts/AuthContext";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import cartBIIG from "../assets/Empty-cart.svg";

function Checkout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { email } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: postCheckout,
    onSuccess: (info) => {
      toast.success(info.message);
      console.log(info);
      setIsModalOpen(true);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      surname: "",
      email: email || "",
      address: "",
      zip_code: "",
    },
  });
  useEffect(() => {
    if (email) {
      reset((prev) => ({
        ...prev,
        email: email,
      }));
    }
  }, [email, reset]);

  function onSubmit(data) {
    const formData = new FormData();
    for (const i in data) {
      formData.append(i, data[i]);
    }
    mutate(formData);
  }

  if (!cartQuery.isFetched) return null;

  return (
    <div className="mx-25 my-18">
      <h1 className="font-bold text-[42px] mb-10.5">Checkout</h1>
      {cartQuery.data.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-37.5 ">
          <img src={cartBIIG} alt="BIIG" />
          <h2 className="mt-6 mb-2.5 font-semibold text-2xl">Ooops!</h2>
          <p className="text-gray-600 text-sm">
            You've got nothing in your cart just yet...
          </p>
          <div className="mt-14 w-53.5">
            <Link to="/products">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex gap-32.5 justify-between">
          <div className="w-260 h-158 bg-[#F8F6F7] rounded-2xl px-12 py-18 flex flex-col gap-11.5">
            <h2 className="text-2xl">Order Details</h2>
            <div className="grid grid-cols-2 w-131 gap-x-6 gap-y-8">
              <Controller
                name="name"
                control={control}
                rules={{ required: "this field is required", minLength: 3 }}
                render={({ field }) => (
                  <Input
                    text="Name"
                    required={false}
                    setState={field.onChange}
                    value={field.value}
                    error={!!errors.name}
                  />
                )}
              />
              <Controller
                name="surname"
                control={control}
                rules={{ required: "this field is required", minLength: 3 }}
                render={({ field }) => (
                  <Input
                    text="Surname"
                    required={false}
                    setState={field.onChange}
                    value={field.value}
                    error={!!errors.surname}
                  />
                )}
              />
              <div className="col-span-2">
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: "this field is required", minLength: 3 }}
                  render={({ field }) => (
                    <Input.EmailInput
                      text="Email"
                      required={false}
                      setState={field.onChange}
                      value={field.value}
                      error={!!errors.email}
                    />
                  )}
                />
                {/* <Input.EmailInput text="Email" value={email.email} /> */}
              </div>
              <Controller
                name="address"
                control={control}
                rules={{ required: "this field is required", minLength: 3 }}
                render={({ field }) => (
                  <Input
                    text="Address"
                    required={false}
                    setState={field.onChange}
                    value={field.value}
                    error={!!errors.address}
                  />
                )}
              />
              <Controller
                name="zip_code"
                control={control}
                rules={{ required: "this field is required", minLength: 3 }}
                render={({ field }) => (
                  <Input
                    text="Zip code"
                    required={false}
                    setState={field.onChange}
                    value={field.value}
                    error={!!errors.zip_code}
                    type="number"
                  />
                )}
              />
            </div>
          </div>
          <div className="h-158 w-115 ">
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto  flex flex-col gap-8">
                {cartQuery.data.map((data) => (
                  <Product data={data} key={data.id} />
                ))}
              </div>

              <div className="flex-col gap-20 flex ">
                <div className="flex flex-col gap-4 mt-10">
                  <div className="flex justify-between">
                    <p>Items total</p>
                    <p>
                      ${" "}
                      {cartQuery.data
                        .map((data) => data.total_price)
                        .reduce((acc, cur) => acc + cur, 0)}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p>Delivery</p>
                    <p>$ 5</p>
                  </div>
                  <div className="flex justify-between text-xl font-semibold">
                    <p>Total</p>
                    <p>
                      ${" "}
                      {cartQuery.data
                        .map((data) => data.total_price)
                        .reduce((acc, cur) => acc + cur, 0) + 5}
                    </p>
                  </div>
                </div>
                <Button onClick={handleSubmit(onSubmit)}>Pay</Button>
                {/* <Button onClick={() => setIsModalOpen(true)}>Pay</Button> */}
              </div>
            </div>
          </div>
        </div>
      )}

      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
}

export default Checkout;
