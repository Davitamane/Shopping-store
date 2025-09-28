import { Controller, useForm } from "react-hook-form";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { postLogin } from "../../services/apiQuery";
import { Link, useNavigate } from "react-router-dom";
import image from "../../assets/Photo01.jpg";
import { toast } from "react-toastify";

function LoggingIn() {
  const { loggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: postLogin,
    onSuccess: (info) => {
      console.log(info);
      loggedIn(info);
      navigate("/");
    },
    onError: (error) => {
      if (error.status === 401) {
        toast.error("Email is taken or incorrect password");
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data) {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    mutate(formData);
  }

  return (
    <div className="grid grid-cols-2 min-h-100">
      <div>
        <img src={image} className="w-237 h-248" />
      </div>
      <div className="flex mx-40 items-center w-138.5">
        <form
          className="w-full flex flex-col gap-12"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-4xl font-bold">Log in</h2>
          <div className="flex flex-col gap-6">
            <Controller
              name="email"
              control={control}
              rules={{
                required: "this field is required",
                minLength: { value: 3, message: "Too short" },
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
              rules={{
                required: "this field is required",
                minLength: { value: 3, message: "Too short" },
              }}
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
          </div>
          <div className="flex w-full flex-col gap-4">
            <Button type="submit">Log in</Button>
            <div className="flex gap-2 justify-center">
              <p>Not a member?</p>
              <Link to="/register">
                <button type="button" className="text-main">
                  Register
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoggingIn;
