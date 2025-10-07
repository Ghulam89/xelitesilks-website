import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaMinus, FaTimes, FaShoppingBag, FaTrashAlt } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import shopping from '../../assets/images/icon/Shipping-protection.webp';
import { decreaseQuantity, deleteProduct, increaseQuantity } from "../../store/productSlice";
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
        dispatch(increaseQuantity({ _id: product._id }));
    };

    const handleDecreaseQuantity = (product) => {
        if (product.quantity > 1) {
            dispatch(decreaseQuantity({ _id: product._id }));
        }
    };

    const handleRemove = (_id) => {
        dispatch(deleteProduct(_id));
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
                className={`bg-white w-full sm:max-w-md max-w-sm h-[98vh] my-2 mx-2 rounded-xl overflow-hidden  transform transition-transform duration-300 ease-in-out shadow-lg ${isVisible ? "translate-x-0" : "translate-x-full"
                    }`}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside sidebar
            >
                {/* Header */}
                <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4  shadow-sm">
                    <h2 className="text-lg font-semibold text-black">Your Cart</h2>
                    <button onClick={handleClose} className="text-black">
                        <FaTimes size={18} />
                    </button>
                </div>

                <div className=" px-4 py-4 space-y-6 flex-1 overflow-y-auto h-96">
                    {cartItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-[calc(50vh-60px)] px-6 text-center">
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
                            <div >

                            </div>

                            {/* Items */}
                            <div className="space-y-6 ">
                                {cartItems.map((product) => (
                                    <div key={product._id} className="flex items-start gap-4 pb-4">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-24 h-24 object-cover rounded-md "
                                        />
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <p className="font-semibold text-sm text-black">{product.title}</p>
                                            </div>
                                            <p className="text-gray-300 font-semibold text-sm mt-1 flex items-center gap-2">
                                                ${product.price?.toLocaleString()}
                                                {/* <p className="text-darkRed font-semibold line-through">
                                                    Rs. {product.price?.toLocaleString()}
                                                </p> */}
                                            </p>
                                            <div className="flex items-center gap-2 mt-3">
                                                <div className="flex items-center border overflow-hidden border-gray-300">
                                                    <button
                                                        onClick={() => handleIncreaseQuantity(product)}
                                                        className="w-7 h-7 flex cursor-pointer items-center border-r border-gray-300 justify-center text-[#23344E]  hover:bg-lightGray"
                                                    >
                                                        <FaPlus size={12} />
                                                    </button>
                                                    <span className="w-8 h-7 flex items-center justify-center border-r border-gray-300  text-black text-sm">
                                                        {product.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => decreaseQuantity(product._id)}
                                                        className="w-7 h-7 cursor-pointer flex items-center   justify-center text-[#23344E] hover:bg-lightGray"
                                                    >
                                                        <FaMinus className="cursor-pointer" size={12} />
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => handleRemove(product._id)}
                                                    className="text-red-500 cursor-pointer hover:text-red transition-colors"
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
                {/* {cartItems.length > 0 && ( */}
                <div className="sticky bottom-0 bg-white z-10 px-6 py-4 space-y-4">

                    <div className="flex justify-between items-center">
                        <span className="text-black font-medium text-base">Subtotal ({cartItems?.length} items)</span>
                        <span className="text-black font-semibold text-base">${subtotal.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                            <img src={shopping} alt="Shipping Protection" className="w-14 h-14" />
                            <div className=" flex flex-col">
                                <span className="text-black font-medium">Shipping protection</span>
                                <span className=" text-gray-500 pt-1 font-medium">$ 7.00</span>
                            </div>
                        </div>
                        <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-black relative transition">
                                <div className="w-5 h-5 bg-white rounded-full shadow-md transform peer-checked:translate-x-full transition absolute top-0.5 left-0.5" />
                            </div>
                        </label>
                    </div>
                    <p className="text-xs text-gray-500">
                        Have your order reshipped or refunded in case of mail theft. If not selected, Elizabetta denies any responsibility for theft or loss of packages where tracking shows delivered.
                    </p>
                    <Link to="/cart" onClick={handleClose}>
                        <Button
                            label={"Proceed to Checkout"}
                            className="block w-full  bg-[#c5a980] text-black text-center py-2.5 font-medium hover:bg-primary hover:text-black transition"
                        />
                    </Link>




                </div>
                {/* )} */}
            </div>
        </div>
    );
};

export default AddToCartSideMenu;