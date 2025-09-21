import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProduct } from "../services/apiQuery";
import Images from "../UI/Product/Images";
import Details from "../UI/Product/Details";

function ProductPage() {
  const { id } = useParams();
  const dataQuery = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
  });

  return (
    <div className="mx-25 flex flex-col gap-12">
      <p>Listing / product</p>
      <div className="grid grid-cols-2 gap-42">
        <Images />
        <div>
          <Details />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
