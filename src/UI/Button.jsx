const baseStyles =
  "w-full py-2 font-thin gap-2 cursor-pointer h-fit relative flex items-center justify-center transition-all duration-300";
const typeStyles = {
  primary: "bg-main text-white rounded-xl hover:bg-orange-700",
  secondary:
    "bg-white border border-main rounded-xl border-2 text-main hover:bg-main hover:border-main hover:text-white",
  black: "bg-white border rounded-xl border-2",
};

function Button({
  children,
  onClick,
  styleType = "primary",
  type = "button",
  locked = false,
}) {
  const style = `${baseStyles} ${locked ? "bg-gray-400 text-white rounded-xl cursor-not-allowed" : typeStyles[styleType]}`;

  return (
    <button className={style} onClick={onClick} type={type} disabled={locked}>
      {children}
    </button>
  );
}

export default Button;
