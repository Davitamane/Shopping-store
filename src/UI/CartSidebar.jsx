// UI/CartSidebar.jsx
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Close from "../assets/Close.svg";
import cartBIIG from "../assets/Empty-cart.svg";
import Button from "./Button";
import Product from "./Sidebar/Product";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../services/apiQuery";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

function CartSidebar({ isOpen, onClose }) {
  const { token } = useContext(AuthContext);
  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    enabled: !!token && isOpen,
  });
  if (!cartQuery.isFetched) return null;

  const empty = cartQuery.data.length === 0;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <motion.div
            className="fixed inset-0 bg-black/20 cursor-pointer"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="ml-auto w-140 bg-white h-full shadow-lg p-10 relative"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-xl">
                Shopping cart ({cartQuery.data.length})
              </h2>
              <button onClick={onClose}>
                <img src={Close} alt="close" />
              </button>
            </div>
            {empty ? (
              <div className="flex flex-col items-center justify-center mt-37.5 ">
                <img src={cartBIIG} alt="BIIG" />
                <h2 className="mt-6 mb-2.5 font-semibold text-2xl">Ooops!</h2>
                <p className="text-gray-600 text-sm">
                  You've got nothing in your cart just yet...
                </p>
                <div className="mt-14 w-53.5">
                  <Link to="/products">
                    <Button onClick={() => onClose()}>Start Shopping</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto mt-16 flex flex-col gap-8">
                  {cartQuery.data.map((data) => (
                    <Product data={data} key={data.id} />
                  ))}
                </div>

                <div className="my-8 flex-col gap-26 flex">
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between">
                      <p>Items total</p>
                      <p>
                        ${" "}
                        {cartQuery.data
                          .map((data) => data.total_price)
                          .reduce((acc, cur) => acc + cur, 0)}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p>Delivery</p>
                      <p>$ 5</p>
                    </div>
                    <div className="flex justify-between text-xl font-semibold">
                      <p>Total</p>
                      <p>
                        ${" "}
                        {cartQuery.data
                          .map((data) => data.total_price)
                          .reduce((acc, cur) => acc + cur, 0) + 5}
                      </p>
                    </div>
                  </div>
                  <Link to="/checkout">
                    <Button onClick={() => onClose()}>Go to checkout</Button>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default CartSidebar;
