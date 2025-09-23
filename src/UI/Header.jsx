import { Link } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import Cart from "../assets/Cart.svg";
import Profile from "../assets/profile.jpeg";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import user from "../assets/user.svg";

function Header({ onCartClick }) {
  const { token } = useContext(AuthContext);

  return (
    <div className="my-7 mx-25 flex items-center justify-between  max-w-screen ">
      <Link to="/">
        <img src={Logo} className="w-60" />
      </Link>
      <div className="flex gap-5 items-center">
        {token ? (
          <>
            <button onClick={onCartClick}>
              <img src={Cart} />
            </button>
            <button>
              <img
                src={Profile}
                className="rounded-full w-10 h-10 object-cover object-center"
              />
            </button>
          </>
        ) : (
          <Link to="/login">
            <div className="flex items-center gap-2">
              <img src={user} />
              <button>Log in</button>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
