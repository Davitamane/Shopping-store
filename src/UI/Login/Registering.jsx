import Button from "../Button";
import Input from "../Input";
import Profile from "../../assets/profile.jpeg";
import Camera from "../../assets/Camera.svg";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

function Registering({ setLogin }) {
  const { watch, register, resetField, control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      username: "",
      avatar: "",
      password: "",
      password_confirmation: "",
    },
  });

  const image = watch("avatar");

  function onSubmit(data) {
    console.log(data);  
  }

  return (
    <form
      className="w-full flex flex-col gap-12"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-4xl font-bold">Registration</h2>
      <div className="flex items-center gap-4">
        {image ? (
          <img
            src={URL.createObjectURL(image[0])}
            alt="profile"
            className="size-25 rounded-full object-cover object-center"
          />
        ) : (
          <div className="size-25 rounded-full border border-gray-200 flex items-center justify-center">
            <img src={Camera} alt="camera" />
          </div>
        )}

        <div>
          <input
            id="file"
            type="file"
            accept="image/*"
            className="hidden"
            {...register("avatar")}
          />
          <label htmlFor="file" className="cursor-pointer">
            {image ? "Upload new" : "Upload image"}
          </label>
        </div>
        {image && <button onClick={() => resetField("avatar")}>Remove</button>}
      </div>
      <div className="flex flex-col gap-6">
        <Controller
          name="username"
          control={control}
          rules={{ required: "this is required", minLength: 3 }}
          render={({ field }) => (
            <Input
              text="Username"
              required={true}
              setState={field.onChange}
              value={field.value}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          rules={{ required: "this is required", minLength: 3 }}
          render={({ field }) => (
            <Input
              text="Email"
              required={true}
              setState={field.onChange}
              value={field.value}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: "this is required", minLength: 3 }}
          render={({ field }) => (
            <Input.Addons
              text="Password"
              required={true}
              setState={field.onChange}
              value={field.value}
            />
          )}
        />
        <Controller
          name="password_confirmation"
          control={control}
          rules={{ required: "this is required", minLength: 3 }}
          render={({ field }) => (
            <Input.Addons
              text="Confirm password"
              required={true}
              setState={field.onChange}
              value={field.value}
            />
          )}
        />
      </div>
      <div className="flex w-full flex-col gap-4">
        <Button type="submit">Register</Button>
        <div className="flex gap-2 justify-center">
          <p>Already member?</p>
          <button className="text-main" onClick={() => setLogin(true)}>
            Log in
          </button>
        </div>
      </div>
    </form>
  );
}

export default Registering;
