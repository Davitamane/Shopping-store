import { Link } from "react-router-dom";
import temp from "../../assets/temp.jpg";

function Card() {
  return (
    // <Link to={`/ListingPage/${data.id}`}>
    <Link to={"01"}>
      <div className="w-full overflow-hidden hover:shadow-md  rounded-b-2xl transition-shadow duration-300">
        <img src={temp} className="w-full object-cover object-center h-151" />
        <div className="m-4">
          <h1 className="text-md">Kids' Curved Hilfiger Graphic T-Shirt</h1>
          <p className="text-sm">$ 25</p>
        </div>
      </div>
    </Link>
  );
}

export default Card;
