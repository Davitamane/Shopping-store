import { Controller, useForm } from "react-hook-form";
import Button from "../Button";
import Input from "../Input";

function LoggingIn({ setLogin }) {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <form
      className="w-full flex flex-col gap-12"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-4xl font-bold">Log in</h2>
      <div className="flex flex-col gap-6">
        <Controller
          name="email"
          control={control}
          rules={{ required: "this is required", minLength: 3 }}
          render={({ field }) => (
            <Input
              text="Email or username"
              required={true}
              setState={field.onChange}
              value={field.value}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: "this is required", minLength: 2 }}
          render={({ field }) => (
            <Input.Addons
              text="Password"
              required={true}
              setState={field.onChange}
              value={field.value}
            />
          )}
        />
      </div>
      <div className="flex w-full flex-col gap-4">
        <Button type="submit">Log in</Button>
        <div className="flex gap-2 justify-center">
          <p>Not a member?</p>
          <button
            type="button"
            className="text-main"
            onClick={() => setLogin(false)}
          >
            Register
          </button>
        </div>
      </div>
    </form>
  );
}

export default LoggingIn;
