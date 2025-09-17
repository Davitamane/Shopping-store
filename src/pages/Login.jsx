import { useState } from "react";
import image from "../assets/Photo01.jpg";
import Button from "../UI/Button";
import Input from "../UI/Input";

function Login() {
  const [login, setLogin] = useState(false);
  return (
    <div className="grid grid-cols-2 min-h-100">
      <div>
        <img src={image} className="h-fill" />
      </div>
      <div className="flex mx-28 items-center">
        {login ? (
          <div className="w-full flex flex-col gap-12">
            <h2 className="text-4xl font-bold">Log in</h2>
            <div className="flex flex-col gap-6">
              <Input text="Email or username" required={true} />
              <Input.Addons text="Password" required={true} />
            </div>
            <div className="flex w-full flex-col gap-4">
              <Button>Log in</Button>
              <div className="flex gap-2 justify-center">
                <p>Not a member?</p>
                <button className="text-main" onClick={() => setLogin(false)}>
                  Register
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-12">
            <h2 className="text-4xl font-bold">Registration</h2>
            <div className="flex flex-col gap-6">
              <Input text="Username" required={true} />
              <Input text="Email" required={true} />
              <Input.Addons text="Password" required={true} />
              <Input.Addons text="Confirm password" required={true} />
            </div>
            <div className="flex w-full flex-col gap-4">
              <Button>Register</Button>
              <div className="flex gap-2 justify-center">
                <p>Already member?</p>
                <button className="text-main" onClick={() => setLogin(true)}>
                  Log in
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Login part */}

        {/* Register part */}
      </div>
    </div>
  );
}

export default Login;
