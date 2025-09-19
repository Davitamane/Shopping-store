import Button from "../Button";
import Input from "../Input";
import Camera from "../../assets/Camera.svg";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { postRegister } from "../../services/apiQuery";
import { Link } from "react-router-dom";

function Registering({ setLogin }) {
  const [image, setImage] = useState(null);

  const { mutate } = useMutation({
    mutationFn: postRegister,
    onSuccess: (info) => {
      console.log(info);
    },
    onError: (error) => {
      console.error("failed to send", error);
    },
  });

  const { resetField, control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      password_confirmation: "",
    },
  });

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
  }

  function onSubmit(data) {
    const formData = new FormData();
    for (const i in data) {
      formData.append(i, data[i]);
    }
    {
      image && formData.append("avatar", image);
    }

    console.log([...formData.entries()]);
    mutate(formData);
  }
  if (image && image.length === 0) {
    resetField("avatar");
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
            src={URL.createObjectURL(image)}
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
            onChange={handleFileChange}
            id="file"
            type="file"
            accept="image/jpeg"
            className="hidden"
          />
          <label htmlFor="file" className="cursor-pointer">
            {image ? "Upload new" : "Upload image"}
          </label>
        </div>
        {image && (
          <button type="button" onClick={() => setImage("")}>
            Remove
          </button>
        )}
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
