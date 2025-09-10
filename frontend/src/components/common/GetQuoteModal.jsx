import { MdClose } from "react-icons/md";
import Input from "./Input";
import Button from "./Button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { BaseUrl } from "../../utils/BaseUrl";
import Modal from "./Modal";
import video from '../../assets/videos/getqoute.mp4';
const GetQuoteModal = ({ isModalOpen, setIsModalOpen, closeModal }) => {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [pageUrl, setPageUrl] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            setPageUrl(window.location.href);
        }
    }, []);
    const initialFormState = {
        name: "",
        email: "",
        companyName: "",
        phoneNumber: "",
        boxStyle: "",
        length: "",
        width: "",
        depth: "",
        unit: "Inches",
        stock: "Stock",
        colors: "Colors",
        printingSides: "Inside",
        quantity: "",
        addOns: "",
        image: null,
        description: "",
        pageUrl: pageUrl,

    };

    const [formData, setFormData] = useState(initialFormState);

    const validateStep1 = () => {
        return (
            formData.boxStyle &&
            formData.length &&
            formData.width &&
            formData.depth &&
            formData.unit &&
            formData.stock &&
            formData.colors &&
            formData.printingSides &&
            formData.quantity

        );
    };

    const validateStep2 = () => {
        return (
            formData.name &&
            formData.email
        );
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateStep2()) {
            alert("Please fill all required fields");
            return;
        }
        setIsLoading(true);
        try {
            const formDataToSend = new FormData();
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }

            const response = await axios.post(`${BaseUrl}/requestQuote/create`, formDataToSend);

            if (response.data.status === 'success') {
                toast.success(response.data.message)
                setIsLoading(false);
                setStep(1)
                setFormData(initialFormState);
                setIsModalOpen(false);
            } else {
                toast.error(response.data.message)
                setIsLoading(false);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
            setIsLoading(false);
        }
    };

    const nextStep = () => {
        if (step === 1 && !validateStep1()) {
            alert("Please fill all required fields in Product Specification");
            return;
        }
        setStep(step + 1);
    };

    const prevStep = () => setStep(step - 1);

    return (
        <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            className={"rounded-xl max-w-6xl w-[90%]"}
        >
            <div className=" p-3 bg-[#fbfaf7] overflow-y-auto">
                <div className="flex flex-col md:flex-row gap-5 h-full">

                    <div className="hidden lg:block md:w-5/12 lg:w-4/12 h-96">
                        <video
                            autoPlay
                            muted
                            playsInline
                            loop
                            className="w-full h-full object-cover"
                        >
                            <source
                                src={video}
                                type="video/mp4"
                            />
                        </video>
                    </div>

                    {/* Form Section */}
                    <div className="w-full md:w-12/12 lg:w-8/12 flex flex-col">
                        <div className="cursor-pointer flex justify-end">
                            <MdClose
                                onClick={() => setIsModalOpen(false)}
                                size={25}
                                className="text-gray-600 hover:text-gray-800"
                            />
                        </div>

                        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto pr-2">
                            {step === 2 && (
                                <div className="w-full">
                                    <h6 className="text-base md:text-lg font-semibold mb-4 text-gray-800">Personal Information</h6>

                                    <div className="grid w-full grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="w-full">
                                            <Input
                                                label="Name"
                                                star={"*"}
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Your Name"
                                                className="w-full border border-black bg-white text-sm p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>

                                        <div className="w-full">
                                            <Input
                                                label="Email"
                                                star={"*"}
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Your Email"
                                                className="w-full border border-black bg-white text-sm p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>

                                        <div className="w-full">
                                            <Input
                                                label="Company Name"
                                                name="companyName"
                                                value={formData.companyName}
                                                onChange={handleChange}
                                                placeholder="Company Name"
                                                className="w-full border border-black bg-white text-sm p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>

                                        <div className="w-full">
                                            <Input
                                                label="Phone Number"
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={handleChange}
                                                placeholder="Phone Number"
                                                className="w-full border border-black bg-white text-sm p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            />
                                        </div>
                                        <div>
                                            <div className=" mb-4">
                                                <p className=" text-lg text-gray-600">
                                                    <input checked type="checkbox" /> Have you filled all the information correctly?
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full flex flex-col sm:flex-row justify-end gap-4 mt-6">
                                        <Button
                                            type="button"
                                            onClick={prevStep}
                                            label="Previous"
                                            className="bg-gray-500 w-full sm:w-32 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
                                        />
                                        <Button
                                            type="submit"
                                            label={isLoading ? "Sending..." : "Send"}
                                            disabled={!validateStep2() || isLoading}
                                            className={`bg-[#4440E6] w-full sm:w-32 text-white py-3 px-4 rounded-lg hover:bg-[#3938b8] transition-colors text-sm font-medium ${!validateStep2() || isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                                }`}
                                        />
                                    </div>
                                </div>
                            )}

                            {step === 1 && (
                                <div className="">
                                    <h6 className="text-base md:text-lg font-semibold mb-4 text-gray-800">Product Specification</h6>

                                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                                        <div className="w-full">
                                            <Input
                                                label="Box Style"
                                                star={"*"}
                                                name="boxStyle"
                                                value={formData.boxStyle}
                                                onChange={handleChange}
                                                placeholder="Box Style"
                                                className="w-full border border-black bg-white text-sm p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>

                                        <div className="w-full">
                                            <Input
                                                label="Size (Length)"
                                                star={"*"}
                                                name="length"
                                                value={formData.length}
                                                onChange={handleChange}
                                                placeholder="Length"
                                                className="w-full border border-black bg-white text-sm p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>

                                        <div className="w-full">
                                            <Input
                                                label="Size (Width)"
                                                star={"*"}
                                                name="width"
                                                value={formData.width}
                                                onChange={handleChange}
                                                placeholder="width"
                                                className="w-full border border-black bg-white text-sm p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>

                                        <div className="w-full">
                                            <Input
                                                label="Size (Depth)"
                                                star={"*"}
                                                name="depth"
                                                value={formData.depth}
                                                onChange={handleChange}
                                                placeholder="Depth"
                                                className="w-full border border-black bg-white text-sm p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>

                                        <div className="w-full">
                                            <label
                                                htmlFor="Unit"
                                                className="block pb-1.5 text-gray-700 text-sm font-medium"
                                            >
                                                Unit <span className="text-red-600">*</span>
                                            </label>
                                            <select
                                                name="unit"
                                                value={formData.unit}
                                                onChange={handleChange}
                                                className="w-full border border-black bg-white text-sm p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            >
                                                <option>Inches</option>
                                                <option>mm</option>
                                                <option>cm</option>
                                            </select>
                                        </div>

                                        <div className="w-full">
                                            <label
                                                htmlFor="Stock"
                                                className="block pb-1.5 text-gray-700 text-sm font-medium"
                                            >
                                                Stock <span className="text-red-600">*</span>
                                            </label>
                                            <select
                                                name="stock"
                                                value={formData.stock}
                                                onChange={handleChange}
                                                className="w-full border border-black bg-white text-sm p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            >
                                                <option>Stock</option>
                                                <option>12pt Cardboard</option>
                                                <option>14pt Cardboard</option>
                                                <option>16pt Cardboard</option>
                                                <option>18pt Cardboard</option>
                                                <option>20pt Cardboard</option>
                                                <option>22pt Cardboard</option>
                                                <option>24pt Cardboard</option>
                                                <option>White SBS C1S C25</option>
                                                <option>Corrugated</option>
                                                <option>Rigid</option>
                                                <option>Kraft</option>
                                                <option>Linen</option>
                                            </select>
                                        </div>

                                        <div className="w-full">
                                            <label
                                                htmlFor="Colors"
                                                className="block pb-1.5 text-gray-700 text-sm font-medium"
                                            >
                                                Colors <span className="text-red-600">*</span>
                                            </label>
                                            <select
                                                name="colors"
                                                value={formData.colors}
                                                onChange={handleChange}
                                                className="w-full border border-black bg-white text-sm p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            >
                                                <option value={'Colors'}>Colors</option>
                                                <option value={'Plain (No Printing)'}>Plain (No Printing)</option>
                                                <option value={'1 Color'}>1 Color</option>
                                                <option value={'2 Color'}>2 Color</option>
                                                <option value={'3 Color'}>3 Color</option>
                                                <option value={'4 Color'}>4 Color</option>
                                                <option value={'4/1 Color'}>4/1 Color</option>
                                                <option value={'4/2 Color'}>4/1 Color</option>
                                                <option value={'4/3 Color'}>4/1 Color</option>
                                                <option value={'4/4 Color'}>4/1 Color</option>
                                            </select>
                                        </div>

                                        <div className="w-full">
                                            <label
                                                htmlFor="Printing Sides"
                                                className="block pb-1.5 text-gray-700 text-sm font-medium"
                                            >
                                                Printing Sides <span className="text-red-600">*</span>
                                            </label>
                                            <select
                                                name="printingSides"
                                                value={formData.printingSides}
                                                onChange={handleChange}
                                                className="w-full border border-black bg-white text-sm p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            >
                                                <option value={'Inside'}>Inside</option>
                                                <option value={'Outside'}>Outside</option>
                                                <option value={'2 Color'}>Both (Inside & Outside)</option>
                                            </select>
                                        </div>

                                        <div className="w-full">
                                            <Input
                                                label="Quantity"
                                                star={"*"}
                                                name="quantity"
                                                value={formData.quantity}
                                                onChange={handleChange}
                                                placeholder="Quantity"
                                                className="w-full border border-black bg-white text-sm p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                required
                                            />
                                        </div>

                                        <div className="w-full">
                                            <label
                                                htmlFor="Add-Ons"
                                                className="block pb-1.5 text-gray-700 text-sm font-medium"
                                            >
                                                Add-Ons
                                            </label>
                                            <select
                                                name="addOns"
                                                value={formData.addOns}
                                                onChange={handleChange}
                                                className="w-full border border-black bg-white text-sm p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="">Select an option</option>
                                                <option value={'Foiling'}>Foiling</option>
                                                <option value={'Spot UV'}>Spot UV</option>
                                                <option value={'Embossing'}>Embossing</option>
                                                <option value={'Debossing'}>Debossing</option>
                                                <option value={'handles'}>handles</option>
                                                <option value={'Inserts'}>Inserts</option>
                                                <option value={'Windows'}>Windows</option>
                                            </select>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label
                                                htmlFor="design_upload"
                                                className="block pb-1.5 text-gray-700 text-sm font-medium"
                                            >
                                                Upload Your Design, Max Size 5MB
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Allowed File Types: png, pdf, jpg, jpeg, webp
                                                </p>
                                            </label>
                                            <Input
                                                type="file"
                                                name="image"
                                                onChange={handleChange}
                                                className="border w-full bg-white rounded-lg border-black file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#4440E6] file:text-white hover:file:bg-[#3a36c7]"
                                                accept=".png,.pdf,.jpg,.jpeg,.webp"
                                            />
                                        </div>

                                        <div className="sm:col-span-2 lg:col-span-3">
                                            <label
                                                htmlFor="description"
                                                className="block pb-1.5 text-gray-700 text-sm font-medium"
                                            >
                                                Description
                                            </label>
                                            <textarea
                                                id="description"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                                rows={2}
                                                className="w-full border border-black bg-white text-sm p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Tell us the size / dimensions, material, finising, add-ons, and design preferences."
                                            ></textarea>
                                        </div>
                                    </div>

                                    <div className="w-full flex justify-end mt-5">
                                        <Button
                                            type="button"
                                            onClick={nextStep}
                                            label="Next"
                                            disabled={!validateStep1()}
                                            className={`bg-[#4440E6] w-full sm:w-32 text-white py-3 px-4 rounded-lg hover:bg-[#3938b8] transition-colors text-sm font-medium ${!validateStep1() ? 'opacity-50 cursor-not-allowed' : ''
                                                }`}
                                        />
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default GetQuoteModal;