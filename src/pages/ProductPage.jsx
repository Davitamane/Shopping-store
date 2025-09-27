import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProduct } from "../services/apiQuery";
import Images from "../UI/Product/Images";
import Details from "../UI/Product/Details";
import { useEffect, useState } from "react";

function ProductPage() {
  const { id } = useParams();
  const [activeColor, setActiveColor] = useState("");

  const dataQuery = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });
  useEffect(() => {
    if (!dataQuery.data) return;

    const { color, available_colors } = dataQuery.data;

    setActiveColor(color === "Default" || !color ? available_colors[0] : color);
  }, [dataQuery.data]);

  if (!dataQuery.isFetched) return null;
  return (
    <div className="mx-25 flex flex-col gap-12 mb-25">
      <p>Listing / product</p>
      <div className="grid grid-cols-2 gap-42">
        <Images
          data={dataQuery.data}
          activeColor={activeColor}
          setActiveColor={setActiveColor}
        />
        <div>
          <Details
            data={dataQuery.data}
            id={id}
            setActiveColor={setActiveColor}
            activeColor={activeColor}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
