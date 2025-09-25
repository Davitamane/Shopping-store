import Filter from "../assets/Filter.svg";
import ArrowDown from "../assets/Arrow-down.svg";
import Card from "../UI/Products/Card";
import PaginationButton from "../UI/Products/PaginationButton";
import ArrowLeft from "../assets/Arrow-left.svg";
import ArrowRight from "../assets/Arrow-right.svg";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/apiQuery";
import Filtering from "../UI/Products/Filtering";
import Sortby from "../UI/Products/Sortby";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function Products() {
  const [open, setOpen] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const page = +searchParams.get("page") || 1;
  const category = searchParams.get("category") || "all";
  const sort = searchParams.get("sort") || "newest";
  const totalPages = 10;
  const pagination = getPaginationPages(page, totalPages);

  const productsQuery = useQuery({
    queryKey: ["products", page, category, sort],
    queryFn: () => getProducts({ page, category, sort }),
    keepPreviousData: true,
  });

  if (!productsQuery.isFetched) return null;

  function handleOpen(name) {
    name === open ? setOpen("") : setOpen(name);
  }

  function getPaginationPages(current, total) {
    const pages = [];

    if (current === 1 || current === total)
      pages.push(1, 2, "...", total - 1, total);
    else if (current === 2) pages.push(1, 2, 3, "...", total - 1, total);
    else if (current === total - 1)
      pages.push(1, 2, "...", total - 2, total - 1, total);
    else pages.push(1, "...", current - 1, current, current + 1, "...", total);

    console.log(pages);

    return pages;
  }

  return (
    <div className="mx-25 flex flex-col gap-8 my-18">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Products</h1>
        <div className="flex gap-15 items-center">
          <p className="text-sm text-gray-500">Showing 1-10 of 100 results</p>
          <div className="flex gap-10 ">
            <div
              className={`px-2 rounded-2xl ${open === "filtering" && "bg-gray-200"} transition-all duration-300`}
            >
              <button
                onClick={() => handleOpen("filtering")}
                className="flex items-center gap-2"
              >
                <img src={Filter} alt="" className="w-5 h-5" />
                <p>Filter</p>
              </button>
              {open === "filtering" && <Filtering />}
              {open === "sortBy" && <Sortby />}
            </div>

            <button
              className={`flex items-center gap-2 px-2 rounded-2xl ${open === "sortBy" && "bg-gray-200"} transition-all duration-300`}
              onClick={() => handleOpen("sortBy")}
            >
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
      <div className="mt-22.5 flex justify-center gap-2">
        <button
          onClick={() => setSearchParams({ page: page - 1, category, sort })}
          disabled={page <= 1}
        >
          <img src={ArrowLeft} alt="arrowLeft" />
        </button>
        {pagination.map((p, i) => (
          <PaginationButton
            key={i}
            active={p === page}
            onClick={() =>
              typeof p === "number" &&
              setSearchParams({ page: p, category, sort })
            }
          >
            {p}
          </PaginationButton>
        ))}
        <button
          onClick={() => setSearchParams({ page: page + 1, category, sort })}
          disabled={page >= 10}
        >
          <img src={ArrowRight} alt="arrowRight" />
        </button>
      </div>
    </div>
  );
}

export default Products;
