function Color({ color, active = false, setActiveColor }) {
  const normalizedColor = color.toLowerCase();
  let customColor = "";

  // Define custom colors
  if (normalizedColor === "white") {
    customColor = "#F8F6F7";
  } else if (normalizedColor === "multi") {
    customColor =
      "linear-gradient(90deg, rgba(42,123,155,1) 0%, rgba(87,199,133,1) 50%, rgba(237,221,83,1) 100%)";
  } else if (normalizedColor === "navy blue") {
    customColor = "#000080";
  }

  const isGradient = customColor.includes("linear-gradient");
  const displayStyle = isGradient
    ? { backgroundImage: customColor }
    : { backgroundColor: customColor || color };

  const borderColor = customColor || color;

  return active ? (
    <div
      className="flex items-center justify-center border-2 size-10 rounded-full"
      style={{ borderColor }}
    >
      <div className="size-8 rounded-full" style={displayStyle}></div>
    </div>
  ) : (
    <button
      className="size-10 rounded-full"
      onClick={() => setActiveColor(color)}
      style={displayStyle}
      aria-label={`Select color ${color}`}
      title={color}
    ></button>
  );
}

export default Color;
