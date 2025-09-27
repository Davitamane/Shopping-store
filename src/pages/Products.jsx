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
import close from "../assets/Close.svg";

function Products() {
  const [open, setOpen] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const page = +searchParams.get("page") || 1;
  const price_from = searchParams.get("filter[price_from]") || "";
  const price_to = searchParams.get("filter[price_to]") || "";
  const sort = searchParams.get("sort") || "";
  const productsQuery = useQuery({
    queryKey: ["products", page, price_from, price_to, sort],
    queryFn: () =>
      getProducts({
        page,
        "filter[price_from]": Number(price_from) || undefined,
        "filter[price_to]": Number(price_to) || undefined,
        sort,
      }),

    keepPreviousData: true,
  });

  if (!productsQuery.isFetched) return null;

  const totalPages = productsQuery.data.meta.last_page;
  const pagination = getPaginationPages(page, totalPages);

  function handleOpen(name) {
    name === open ? setOpen("") : setOpen(name);
  }
  function getPaginationPages(current, total) {
    const pages = [];
    const maxButtons = 5;

    if (total <= maxButtons) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      const left = Math.max(2, current - 1);
      const right = Math.min(total - 1, current + 1);

      pages.push(1);

      if (left > 2) pages.push("..."); // gap after first
      for (let i = left; i <= right; i++) pages.push(i);
      if (right < total - 1) pages.push("..."); // gap before last

      pages.push(total);
    }

    return pages;
  }

  return (
    <div className="mx-25 flex flex-col gap-8 my-18">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold">Products</h1>
        <div className="flex gap-15 items-center">
          <p className="text-sm text-gray-500">
            Showing {productsQuery.data.meta.from}-{productsQuery.data.meta.to}{" "}
            of {productsQuery.data.meta.total} results
          </p>
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
              {open === "filtering" && (
                <Filtering
                  setSearchParams={setSearchParams}
                  page={page}
                  sort={sort}
                  price_from={price_from}
                  price_to={price_to}
                  setOpen={setOpen}
                />
              )}
              {open === "sortBy" && (
                <Sortby
                  setSearchParams={setSearchParams}
                  searchParams={searchParams}
                  setOpen={setOpen}
                />
              )}
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
      {(price_from || price_to) && (
        <div className="flex items-center gap-1 text-gray-600 w-fit font-thin border-1 p-1 pl-3 pr-3 rounded-2xl border-gray-400">
          <p>
            Price: {price_from}-{price_to}
          </p>
          <button
            onClick={() => {
              setSearchParams({
                page: page,
                "filter[price_from]": "",
                "filter[price_to]": "",
                sort,
              });
            }}
          >
            <img src={close} className="size-3" />
          </button>
        </div>
      )}
      <div className="grid grid-cols-4 gap-y-12 gap-x-6">
        {productsQuery.data.data.map((product) => (
          <Card key={product.id} data={product} />
        ))}
      </div>
      <div className="mt-22.5 flex justify-center gap-2">
        <button
          onClick={() =>
            setSearchParams({
              page: page - 1,
              "filter[price_from]": price_from,
              "filter[price_to]": price_to,
              sort,
            })
          }
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
              setSearchParams({
                page: p,
                "filter[price_from]": price_from,
                "filter[price_to]": price_to,
                sort,
              })
            }
          >
            {p}
          </PaginationButton>
        ))}
        <button
          onClick={() =>
            setSearchParams({
              page: page + 1,
              "filter[price_from]": price_from,
              "filter[price_to]": price_to,
              sort,
            })
          }
          disabled={page >= 10}
        >
          <img src={ArrowRight} alt="arrowRight" />
        </button>
      </div>
    </div>
  );
}

export default Products;
