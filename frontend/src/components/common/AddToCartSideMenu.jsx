import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaMinus, FaTimes, FaShoppingBag, FaTrashAlt } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
// import { deleteProduct, increaseQuantity, decreaseQuantity } from "../../../store/nextSlice";
import Button from "./Button";

const AddToCartSideMenu = ({ onClose }) => {
    const { productData: cartItems } = useSelector((state) => state.product);
    const dispatch = useDispatch();
    const [isVisible, setIsVisible] = useState(false);
    const sidebarRef = useRef(null);

    useEffect(() => {
        setTimeout(() => setIsVisible(true), 100);
        if (sidebarRef.current) {
            sidebarRef.current.scrollTop = 0;
        }
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    const handleIncreaseQuantity = (product) => {
        // dispatch(increaseQuantity({ _id: product._id }));
    };

    const handleDecreaseQuantity = (product) => {
        if (product.quantity > 1) {
            //   dispatch(decreaseQuantity({ _id: product._id }));
        }
    };

    const handleRemove = (_id) => {
        // dispatch(deleteProduct(_id));
    };

    const subtotal = cartItems.reduce((total, product) => {
        const price = parseFloat(product.price) || 0;
        const quantity = parseInt(product.quantity) || 0;
        return total + price * quantity;
    }, 0);

    return (
        <div
            className="fixed inset-0 z-[1001] flex justify-end bg-[rgba(0,0,0,0.3)] bg-opacity-50"
            onClick={handleClose} // Close on overlay click
        >
            <div
                ref={sidebarRef}
                className={`bg-white w-full sm:max-w-md max-w-sm h-screen overflow-y-auto transform transition-transform duration-300 ease-in-out shadow-lg ${isVisible ? "translate-x-0" : "translate-x-full"
                    }`}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside sidebar
            >
                {/* Header */}
                <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b shadow-sm">
                    <h2 className="text-lg font-semibold text-black">Shopping Cart</h2>
                    <button onClick={handleClose} className="text-black">
                        <FaTimes size={18} />
                    </button>
                </div>

                <div className="px-6 py-4 space-y-6 flex-1">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-[calc(100vh-120px)] px-6 text-center">
                            <FaShoppingBag className="text-gray-400 text-5xl mb-4" />
                            <h3 className="text-xl font-medium text-gray-700 mb-2">
                                Your cart is empty
                            </h3>
                            <p className="text-gray-500 mb-6">
                                Looks like you haven't added anything to your cart yet
                            </p>
                            <Link onClick={handleClose}>
                                <Button
                                    label={"Continue Shopping"}
                                    className="block w-full border mt-5 border-black text-black text-center py-2.5 font-medium hover:bg-primary hover:border-primary transition"
                                />
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="border border-green bg-[#ecf9fc] text-center text-green p-4">
                                <p>Just one step away from completing your order.</p>
                            </div>

                            {/* Items */}
                            <div className="space-y-6">
                                {cartItems.map((product) => (
                                    <div key={product._id} className="flex items-start gap-4 pb-4">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-24 h-24 object-cover rounded-md border"
                                        />
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <p className="font-semibold text-black">{product.title}</p>
                                            </div>
                                            <p className="text-black font-semibold mt-1 flex items-center gap-2">
                                                Rs. {product.cutPrice?.toLocaleString()}
                                                <p className="text-darkRed font-semibold line-through">
                                                    Rs. {product.price?.toLocaleString()}
                                                </p>
                                            </p>
                                            <div className="flex items-center gap-2 mt-3">
                                                <div className="flex items-center border-2 overflow-hidden border-black rounded-xl">
                                                    <button
                                                        onClick={() => handleIncreaseQuantity(product)}
                                                        className="w-7 h-7 flex items-center justify-center text-[#23344E] rounded-r hover:bg-lightGray"
                                                    >
                                                        <FaPlus size={12} />
                                                    </button>
                                                    <span className="w-8 h-7 flex items-center justify-center text-black text-sm">
                                                        {product.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => handleDecreaseQuantity(product)}
                                                        className="w-7 h-7 flex items-center justify-center text-[#23344E] hover:bg-lightGray"
                                                    >
                                                        <FaMinus size={12} />
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => handleRemove(product._id)}
                                                    className="text-red-500 hover:text-red transition-colors"
                                                >
                                                    <RiDeleteBin5Line size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div className="sticky bottom-0 bg-white z-10 px-6 py-4 border-t space-y-4">
                        <div className="flex justify-between text-sm mb-3">
                            <span className="text-black text-base font-medium">Subtotal:</span>
                            <span className="text-black text-base font-semibold">
                                Rs {subtotal.toLocaleString()}
                            </span>
                        </div>

                        <Link to="/cart" onClick={handleClose}>
                            <Button
                                label={"Proceed to Checkout"}
                                className="block w-full  bg-[#c5a980] text-black text-center py-2.5 font-medium hover:bg-primary hover:text-black transition"
                            />
                        </Link>

                        <Link to="/" onClick={handleClose}>
                            <Button
                                label={"Continue Shopping"}
                                className="block w-full border mt-5 border-black text-black text-center py-2.5 font-medium hover:bg-primary hover:border-primary transition"
                            />
                        </Link>

                        <p className="text-xs text-gray-500 text-center mt-2">
                            Taxes included. Shipping calculated at checkout.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddToCartSideMenu;