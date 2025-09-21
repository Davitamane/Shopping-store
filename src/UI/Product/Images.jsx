import shirtSmall from "../../assets/shirtSmall.jpg";
import shirtBig from "../../assets/shirtBig.jpg";

function Images() {
  return (
    <div className="flex gap-6">
      <div className="flex flex-col gap-2">
        <img src={shirtSmall} alt="small" />
        <img src={shirtSmall} alt="small" />
        <img src={shirtSmall} alt="small" />
      </div>
      <div>
        <img src={shirtBig} alt="big" />
      </div>
    </div>
  );
}

export default Images;
