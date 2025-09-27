import Button from "../../UI/Button";
import Input from "../../UI/Input";
import Camera from "../../assets/Camera.svg";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { postRegister } from "../../services/apiQuery";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import displayImage from "../../assets/Photo01.jpg";
import { toast } from "react-toastify";

function Registering() {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { loggedIn } = useContext(AuthContext);

  const { mutate } = useMutation({
    mutationFn: postRegister,
    onSuccess: (info) => {
      // console.log(info.token);
      loggedIn(info);
      navigate("/");
    },
    onError: (error) => {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
        console.log(error.response.data.message);
      }
    },
  });

  const {
    resetField,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
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

    // Check file size (1 MB)
    if (file.size > 1024 * 1024) {
      toast.error("Image must be less than 1 MB");
      return;
    }

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

  image && resetField("avatar");

  return (
    <div className="grid grid-cols-2 min-h-100">
      <div>
        <img src={displayImage} className="w-237 h-248" />
      </div>
      <div className="flex mx-40 items-center w-138.5">
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
              <button type="button" onClick={() => setImage(null)}>
                Remove
              </button>
            )}
          </div>
          <div className="flex flex-col gap-6">
            <Controller
              name="username"
              control={control}
              rules={{
                required: "This field is required",
                minLength: { value: 3, message: "Too short" },
              }}
              render={({ field }) => (
                <div className="flex flex-col">
                  <Input
                    text="Username"
                    required={true}
                    setState={field.onChange}
                    value={field.value}
                    error={!!errors.username}
                  />
                  {errors.username && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.username.message}
                    </span>
                  )}
                </div>
              )}
            />
            <Controller
              name="email"
              control={control}
              rules={{
                required: "this field is required",
                minLength: 3,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <div className="flex flex-col">
                  <Input
                    text="Email"
                    required={true}
                    setState={field.onChange}
                    value={field.value}
                    error={!!errors.email}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{ required: "this field is required", minLength: 3 }}
              render={({ field }) => (
                <div className="flex flex-col">
                  <Input.Addons
                    text="Password"
                    required={true}
                    setState={field.onChange}
                    value={field.value}
                    error={!!errors.password}
                  />
                  {errors.password && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </span>
                  )}
                </div>
              )}
            />
            <Controller
              name="password_confirmation"
              control={control}
              rules={{
                required: "This field is required",
                minLength: { value: 3, message: "Password too short" },
                validate: (value, formValues) =>
                  value === formValues.password || "Passwords don't match",
              }}
              render={({ field }) => (
                <div className="flex flex-col">
                  <Input.Addons
                    text="Confirm password"
                    required={true}
                    setState={field.onChange}
                    value={field.value}
                    error={!!errors.password_confirmation}
                  />
                  {errors.password_confirmation && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors.password_confirmation.message}
                    </span>
                  )}
                </div>
              )}
            />
          </div>
          <div className="flex w-full flex-col gap-4">
            <Button type="submit">Register</Button>
            <div className="flex gap-2 justify-center">
              <p>Already member?</p>
              <Link to="/login">
                <button className="text-main">Log in</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registering;
