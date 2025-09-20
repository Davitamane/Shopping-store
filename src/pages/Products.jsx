import Filter from "../assets/Filter.svg";
import ArrowDown from "../assets/Arrow-down.svg";
import Card from "../UI/Products/Card";
import PaginationButton from "../UI/Products/PaginationButton";
import ArrowLeft from "../assets/Arrow-left.svg";
import ArrowRight from "../assets/Arrow-right.svg";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/apiQuery";

function Products() {
  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (!productsQuery.isFetched) return null;

  console.log(productsQuery.data);

  return (
    <div className="mx-25 flex flex-col gap-8">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Products</h1>
        <div className="flex gap-15 items-center">
          <p className="text-sm text-gray-500">Showing 1-10 of 100 results</p>
          <div className="flex gap-10 ">
            <button className="flex items-center gap-2">
              <img src={Filter} alt="" className="w-5 h-5" />
              <p>Filter</p>
            </button>
            <button className="flex items-center gap-2">
              <p>Sort by</p>
              <img src={ArrowDown} className="size-2.5" />
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-y-12 gap-x-6">
        {productsQuery.data.data.map((product) => (
          <Card key={product.id} data={product} />
        ))}
      </div>
      <div className="my-23 flex justify-center gap-2">
        <button>
          <img src={ArrowLeft} alt="" />
        </button>
        <PaginationButton active={true}>1</PaginationButton>
        <PaginationButton>2</PaginationButton>
        <PaginationButton>...</PaginationButton>
        <PaginationButton>9</PaginationButton>
        <PaginationButton>10</PaginationButton>
        <button>
          <img src={ArrowRight} alt="" />
        </button>
      </div>
    </div>
  );
}

export default Products;
