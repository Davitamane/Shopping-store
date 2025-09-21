function Color({ color, active = false }) {
  return (
    <>
      {active ? (
        <div
          className={`flex items-center justify-center border-2 size-10 rounded-full`}
          style={{ borderColor: color }}
        >
          <div
            className={`size-8  rounded-full`}
            style={{ backgroundColor: color }}
          ></div>
        </div>
      ) : (
        <button
          className="size-10 rounded-full bg-lime-400"
          style={{ backgroundColor: color }}
        ></button>
      )}
    </>
  );
}

export default Color;
