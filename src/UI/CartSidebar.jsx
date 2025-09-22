// UI/CartSidebar.jsx
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Close from "../assets/Close.svg";
import cartBIIG from "../assets/Empty-cart.svg";
import Button from "./Button";
import Product from "./Sidebar/Product";

function CartSidebar({ isOpen, onClose, empty = false }) {
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/20 cursor-pointer"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Sidebar */}
          <motion.div
            className="ml-auto w-135 bg-white h-full shadow-lg p-10 relative"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-xl">Shopping cart (0)</h2>
              <button onClick={onClose}>
                <img src={Close} alt="close" />
              </button>
            </div>
            {/* if empty */}
            {empty ? (
              <div className="flex flex-col items-center justify-center mt-37.5 ">
                <img src={cartBIIG} alt="BIIG" />
                <h2 className="mt-6 mb-2.5 font-semibold text-2xl">Ooops!</h2>
                <p className="text-gray-600 text-sm">
                  You've got nothing in your cart just yet...
                </p>
                <div className="mt-14 w-53.5">
                  <Button>Start Shopping</Button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col justify-between">
              <div className="flex mt-16 flex-col gap-8">
                <Product />
              </div>
              <div>
                test
              </div>
              </div>
            )}

            {/* if NOT empty */}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default CartSidebar;
