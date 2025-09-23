function Images({ data }) {
  return (
    <div className="flex gap-6">
      <div className="flex flex-col gap-2">
        {data.images.map((image, i) => (
          <img src={image} alt="small" key={i} />
        ))}

      </div>
      <div>
        <img src={data.cover_image} alt="big" />
      </div>
    </div>
  );
}

export default Images;
