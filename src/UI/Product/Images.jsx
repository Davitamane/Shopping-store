function Images({ data }) {
  return (
    <div className="flex gap-6">
      <div className="flex flex-col gap-2">
        {data.images.map((image, i) => (
          <button className="w-30 border border-main" key={i}>
            <img src={image} alt="small" />
          </button>
        ))}
      </div>
      <div>
        <img src={data.cover_image} alt="big" className="w-175" />
      </div>
    </div>
  );
}

export default Images;
