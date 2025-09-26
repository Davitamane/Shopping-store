import { useState } from "react";
import image from "../assets/Photo01.jpg";
import LoggingIn from "./Login/LoggingIn";
import Registering from "./Login/Registering";

function Login() {
  const [login, setLogin] = useState(true);

  return (
    <div className="grid grid-cols-2 min-h-100">
      <div>
        <img src={image} className="w-237 h-248" />
      </div>
      <div className="flex mx-40 items-center">
        {login ? (
          <LoggingIn setLogin={setLogin} />
        ) : (
          <Registering setLogin={setLogin} />
        )}
      </div>
    </div>
  );
}

export default Login;
