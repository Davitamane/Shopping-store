import { FaPlus, FaMinus } from "react-icons/fa";

function Amount() {
  return (
    <div className="flex px-3 border border-gray-300 rounded-4xl gap-2">
      <button>
        <FaMinus className="size-2.5 text-gray-300" />
      </button>
      <div>1</div>
      <button>
        <FaPlus className="size-2.5" />
      </button>
    </div>
  );
}

export default Amount;
