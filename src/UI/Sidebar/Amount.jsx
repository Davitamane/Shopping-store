import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { patchRemoval } from "../../services/apiQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function Amount({ data }) {
  const [counter, setCounter] = useState(data.quantity);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, data }) => patchRemoval(id, data),
    onSuccess: (info) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
  // console.log(data.id);

  function handleChange(newCounter) {
    mutate({
      id: data.id,
      data: {
        quantity: newCounter,
      },
    });
  }

  return (
    <div className="flex px-3 border border-gray-300 rounded-4xl gap-2">
      <button
        onClick={() => {
          setCounter((prev) => {
            const newValue = prev - 1;
            handleChange(newValue);
            return newValue;
          });
        }}
        disabled={counter === 1 || isPending}
      >
        <FaMinus
          className={`size-2.5 ${counter === 1 || isPending ? "text-gray-300" : ""} `}
        />
      </button>
      <div>{counter}</div>
      <button
        onClick={() => {
          setCounter((prev) => {
            const newValue = prev + 1;
            handleChange(newValue);
            return newValue;
          });
        }}
        disabled={isPending}
      >
        <FaPlus className={`size-2.5 ${isPending ? "text-gray-300" : ""}`} />
      </button>
    </div>
  );
}

export default Amount;
