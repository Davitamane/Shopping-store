import { useRef } from "react";
import { createPortal } from "react-dom";
import close from "../assets/Close.svg";
import success from "../assets/Success.svg";
import Button from "./Button";
import { Link } from "react-router-dom";

function Modal({ isModalOpen, setIsModalOpen }) {
  const modalRef = useRef(null);

  if (!isModalOpen) return null;

  return createPortal(
    <div className="fixed top-0 left-0 w-full h-screen bg-black/20 flex items-center justify-center z-50 backdrop-blur-[3px]">
      <div
        className="flex w-219 h-147.5 flex-col gap-11 bg-white p-10 rounded-lg shadow-lg"
        // h-147.5
        ref={modalRef}
        id="modalForm"
      >
        <div className="flex justify-end">
          <button onClick={() => setIsModalOpen(false)}>
            <img src={close} />
          </button>
        </div>
        <div className="flex justify-center h-full">
          <div className="flex flex-col items-center gap-10 w-fit">
            <div>
              <img src={success} alt="" />
            </div>
            <div className="flex flex-col gap-4 items-center">
              <h1 className="font-bold text-5xl">Congrats!</h1>
              <p>Your order is placed successfully!</p>
            </div>
            <div className="w-full mt-8.5">
              <Link to="/products">
                <Button onClick={() => setIsModalOpen(false)}>
                  Continue shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default Modal;
