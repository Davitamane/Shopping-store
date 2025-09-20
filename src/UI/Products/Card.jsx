import { Link } from "react-router-dom";

function Card({ data }) {
  console.log(data);

  return (
    <Link to={`/products/${data.id}`}>
      {/* <Link to={data.id}> */}
      <div className="w-full overflow-hidden hover:shadow-md  rounded-b-2xl transition-shadow duration-300">
        <img
          src={data.cover_image}
          className="w-full object-cover object-center h-fit"
        />
        <div className="m-4">
          <h1 className="text-md">{data.name}</h1>
          <p className="text-sm">$ {data.price}</p>
        </div>
      </div>
    </Link>
  );
}

export default Card;
