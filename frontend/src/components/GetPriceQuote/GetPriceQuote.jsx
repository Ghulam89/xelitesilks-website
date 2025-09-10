import React, { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { toast } from "react-toastify";
import { BaseUrl } from "../../utils/BaseUrl";
import axios from "axios";

const GetPriceQuote = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);


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
    description: ""
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
    <div className="sm:max-w-6xl max-w-[95%] mx-auto py-7">
      <div className="bg-[#F7F7F7] rounded-lg p-4 md:p-6 w-full">
          <h2 className="sm:text-[35px] text-[25px]   text-center   font-sans   font-[600] text-[#333333] ">
          Get Price Quote
        </h2>


        <form onSubmit={handleSubmit}>

          {step === 2 && (
            <div className="pt-3.5">
              <strong className=" text-lg text-[#333333] mb-4">Personal Information</strong>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="w-full">
                  <Input
                    label="Name"
                    star={"*"}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
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
                    className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
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
                    className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
                  />
                </div>

                <div className="w-full">
                  <Input
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
                  />
                </div>
              </div>


              <div className="w-full flex justify-end gap-5 mt-6 md:mt-8">
                <Button
                  type="button"
                  onClick={prevStep}
                  label="Previous"
                  className="bg-gray-500 w-full sm:w-40 text-white py-2.5 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                />
                <Button
                  type="submit"
                  label={isLoading ? "Sending..." : "Send"}
                  disabled={!validateStep2() || isLoading}
                  className={`bg-[#4440E6] w-full sm:w-40 text-white py-2.5 px-4 rounded-lg hover:bg-[#3938b8] transition-colors ${!validateStep2() || isLoading ? 'opacity-100  bg-[#4440E6] cursor-not-allowed' : ''
                    }`}
                />
              </div>
            </div>
          )}


          {step === 1 && (
            <div className="pt-3.5">
              <strong className=" text-lg text-[#333333] mb-4">Product Specification</strong>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <div className="w-full">
                  <Input
                    label="Box Style"
                    star={"*"}
                    name="boxStyle"
                    value={formData.boxStyle}
                    onChange={handleChange}
                    placeholder="Box Style"
                    className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
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
                    className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
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
                    className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
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
                    className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
                    required
                  />
                </div>

                <div className="w-full">

                  <label
                    htmlFor="Unit"
                    className="  pb-1 flex  text-[#333333] text-sm font-medium   text-textColor"
                  >
                    Unit
                    <strong className=" text-red-600 m-0 pl-1">*</strong>
                  </label>
                  <select name="unit" value={formData.unit}
                    onChange={handleChange} className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
                    required
                  >
                    <option>Inches</option>
                    <option>mm</option>
                    <option>cm</option>
                  </select>
                </div>

                {/* <div className="w-full">
                  <Input
                    label="Stock"
                    star={"*"}
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="Stock"
                    className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
                    required
                  />
                </div> */}


                <div className="w-full">

                  <label
                    htmlFor="Stock"
                    className="  pb-1 flex  text-[#333333] text-sm font-medium   text-textColor"
                  >
                    Stock
                      <strong className=" text-red-600 m-0 pl-1">*</strong>
                  </label>
                  <select name="stock" value={formData.stock}
                    onChange={handleChange} className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
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
                    className="  pb-1 flex  text-[#333333] text-sm font-medium   text-textColor"
                  >
                    Colors
                      <strong className=" text-red-600 m-0 pl-1">*</strong>
                  </label>
                  <select name="colors" value={formData.colors}
                    onChange={handleChange} className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
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
                    className="  pb-1 flex  text-[#333333] text-sm font-medium   text-textColor"
                  >
                    Printing Sides
                      <strong className=" text-red-600 m-0 pl-1">*</strong>
                  </label>
                  <select name="printingSides" value={formData.printingSides}
                    onChange={handleChange} className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
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
                    className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
                    required
                  />
                </div>



                <div className="w-full">

                  <label
                    htmlFor="Add-Ons"
                    className="  pb-1 flex  text-[#333333] text-sm font-medium   text-textColor"
                  >
                    Add-Ons
                    <strong className=" text-red-600 m-0 pl-1">*</strong>
                  </label>
                  <select name="addOns" value={formData.addOns}
                    onChange={handleChange} className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
                    required
                  >
                    <option selected></option>
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
                    className="block pb-1.5 text-[#333333] text-sm md:text-base font-medium"
                  >
                    Upload Your Design, Max Size 5MB
                    <p className="flex flex-wrap gap-0.5 text-xs md:text-sm mt-1">
                      Allowed File Types:
                      <span className="font-semibold"> png, pdf, jpg, jpeg, webp</span>
                    </p>
                  </label>
                  <Input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    className="border w-full bg-white rounded-lg border-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:opacity-100 file:bg-[#4440E6] file:text-white hover:file:bg-[#3a36c7]"
                    accept=".png,.pdf,.jpg,.jpeg,.webp"
                  />
                </div>

                <div className="sm:col-span-2 lg:col-span-3">
                  <label
                    htmlFor="description"
                    className="block pb-1.5 text-[#333333] text-sm md:text-base font-medium"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-[#333333] bg-white text-xs md:text-sm p-2.5 rounded-lg"
                    placeholder="Tell us the size / dimensions, material, finising, add-ons, and design preferences."
                    required
                  ></textarea>
                </div>
              </div>



              <div className="w-full flex justify-between mt-6 md:mt-8">
                <div className="text-xs text-gray-500">

                </div>
                <Button
                  type="button"
                  onClick={nextStep}
                  label="Next"
                  disabled={!validateStep1()}
                  className={`bg-[#4440E6] w-full sm:w-40 text-white py-2.5 px-4 rounded-lg hover:bg-[#3938b8] transition-colors ${!validateStep1() ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default GetPriceQuote;