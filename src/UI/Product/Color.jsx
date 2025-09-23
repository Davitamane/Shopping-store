function Color({ color, active = false, setActiveColor }) {
  // red, green, navy blue, grey, yellow, white, multi, black, purple, orange, black
  let customColor = "";
  if (color === "White") {
    customColor = "#F8F6F7";
  }
  return (
    <>
      {active ? (
        <div
          className={`flex items-center justify-center border-2 size-10 rounded-full`}
          style={{ borderColor: customColor ? customColor : color }}
        >
          <div
            className={`size-8  rounded-full`}
            style={{ backgroundColor: customColor ? customColor : color }}
          ></div>
        </div>
      ) : (
        <button
          className="size-10 rounded-full"
          onClick={() => setActiveColor(color)}
          style={{ backgroundColor: customColor ? customColor : color }}
        ></button>
      )}
    </>
  );
}

export default Color;
