
function Images({ data, setActiveColor, activeColor }) {
  const index = data?.available_colors.findIndex(
    (color) => color === activeColor
  );


  return (
    <div className="flex gap-6">
      <div className="flex flex-col gap-2">
        {data.images.map((image, i) => (
          <button
            className={`w-30 border transition-all duration-300 ${
              index === i ? "border-main" : "border-transparent"
            }`}
            key={i}
            onClick={() => {
              setActiveColor(data.available_colors[i]);
            }}
          >
            <img src={image} alt="small" />
          </button>
        ))}
      </div>
      <div>
        <img
          src={index ? data.images[index] : data.cover_image}
          alt="big"
          className="w-175"
        />
      </div>
    </div>
  );
}

export default Images;
