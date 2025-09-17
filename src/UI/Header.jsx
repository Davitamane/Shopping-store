import { Link } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import Cart from "../assets/Cart.svg";
import Profile from "../assets/profile.jpeg";
function Header() {
  return (
    <div className="my-10 mx-25 flex items-center justify-between  max-w-screen ">
      <Link to="/">
        <img src={Logo} className="w-60" />
      </Link>
      <div className="flex gap-5 items-center">
        <Link to="/login">
          <button>Log in</button>
        </Link>
        <Link to="/checkout">
          <img src={Cart} />
        </Link>
        <button>
          <img
            src={Profile}
            className="rounded-full w-10 h-10 object-cover object-center"
          />
        </button>
      </div>
    </div>
  );
}

export default Header;
