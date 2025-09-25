function PaginationButton({ children, active = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded size-8 flex items-center justify-center border ${active ? "border-main text-main" : "border-gray-200 text-gray-500"} `}
    >
      {children}
    </button>
  );
}

export default PaginationButton;
