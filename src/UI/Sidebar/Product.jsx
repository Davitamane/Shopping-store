import { useMutation, useQueryClient } from "@tanstack/react-query";
import Amount from "./Amount";
import { deleteItem } from "../../services/apiQuery";
import { toast } from "react-toastify";

function Product({ data }) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, data }) => deleteItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      toast.success("Successfully deleted");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const index = data.available_colors.indexOf(data.color);

  return (
    <div className="flex w-full gap-4 items-center">
      <img
        src={data.images[index]}
        alt="shirt"
        className="rounded-xl border border-gray-200 w-25"
      />
      <div className="flex flex-col w-full gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <h2>{data.name}</h2>
            <p className="font-semibold text-xl">
              $ {data.price * data.quantity}
            </p>
          </div>
          <p className="text-xs">{data.color}</p>
          <p className="text-xs">{data.size}</p>
        </div>
        <div className="flex justify-between">
          <Amount data={data} />
          <button
            className="text-gray-400 text-sm"
            onClick={() =>
              mutate({
                id: data.id,
                data: {
                  color: data.color,
                  size: data.size,
                },
              })
            }
            disabled={isPending}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
