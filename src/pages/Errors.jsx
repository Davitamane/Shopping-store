import Error from "../assets/Error.svg";

function Errors() {
  return (
    <div className="w-full h-150 flex justify-center items-center">
      <img src={Error} alt="error" className="size-150" />
    </div>
  );
}

export default Errors;
