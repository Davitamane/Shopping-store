import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import close from "../assets/Close.svg";

function Modal({ isModalOpen, setIsModalOpen }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isModalOpen) return null;

  return createPortal(
    <div className="fixed top-0 left-0 w-full h-screen bg-black/20 flex items-center justify-center z-50 backdrop-blur-[3px]">
      <div
        className="flex w-219  justify-center flex-col gap-6 bg-white p-10 rounded-lg shadow-lg"
        // h-147.5
        ref={modalRef}
        id="modalForm"
      >
        <div className="flex justify-end">
          <button>
            <img src={close} />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default Modal;
