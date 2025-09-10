import React from "react";
import { MdClose } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import { BaseUrl } from "../../utils/BaseUrl";
import axios from "axios";

const InstantQuoteModal = ({ isModalOpen, setIsModalOpen, closeModal }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    // phoneNumber: Yup.string()
    //   .matches(/^[0-9]+$/, "Must be only digits")
    //   .min(10, "Must be at least 10 digits")
    //   .required("Phone number is required"),
    // message: Yup.string().required("Message is required"),
    // image: Yup.mixed()
    //   .required("Image is required")
    //   .test(
    //     "fileSize",
    //     "File too large (max 5MB)",
    //     (value) => value && value.size <= 5 * 1024 * 1024
    //   )
    //   .test(
    //     "fileType",
    //     "Unsupported file format",
    //     (value) =>
    //       value &&
    //       ["image/png", "image/jpeg", "image/jpg", "image/webp", "application/pdf"].includes(
    //         value.type
    //       )
    //   ),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      message: "",
      image: null,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true)
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("phoneNumber", values.phoneNumber);
        formData.append("message", values.message);
        formData.append("image", values.image);
        formData.append("pageUrl", window.location.href);

        const response = await axios.post(`${BaseUrl}/instantQuote/create`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if(response?.data?.status==="success"){
         toast.success(response?.data?.message)
        }else{
          toast.error(response?.data?.message)
        }

        resetForm();
        setIsModalOpen(false);
      } catch (error) {
        toast.error(error?.response?.data?.message)
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal} className={"rounded-xl"}>
      <div className="p-5 overflow-y-auto ">
        <div className="cursor-pointer flex w-full justify-end">
          <MdClose
            onClick={() => {
              formik.resetForm();
              setIsModalOpen(false);
            }}
            size={25}
          />
        </div>
        <div className="bg-[#F7F7F7] rounded-[10px] flex flex-col items-center p-6">
          <h2 className="text-xl font-semibold mb-4">Get an Instant Quote</h2>

          <form onSubmit={formik.handleSubmit} className="w-full">
            <div className="flex flex-col w-full gap-3 justify-between">
              {/* Name Field */}
              <div className="w-full">
                <Input
                  label="Name"
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`rounded-[8px] w-full border-[#333333] border bg-[#fff] p-3 ${
                    formik.touched.name && formik.errors.name
                      ? "border-red-500"
                      : ""
                  }`}
                />
              </div>

              {formik.touched.name && formik.errors.name && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.name}
                  </div>
                )}
              {/* Email Field */}
              <div className="w-full">
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`rounded-[8px] w-full border-[#333333] border bg-[#fff] p-3 ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500"
                      : ""
                  }`}
                />
              </div>

              {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.email}
                  </div>
                )}

              {/* Phone Number Field */}
              <div className="w-full">
                <Input
                  label="Phone Number"
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`rounded-[8px] w-full border-[#333333] border bg-[#fff] p-3 ${
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                      ? "border-red-500"
                      : ""
                  }`}
                />
              </div>

              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.phoneNumber}
                  </div>
                )}

              {/* Message Field */}
              <div className="flex flex-col">
                <label
                  className="pb-1.5 flex text-[#333333] text-sm font-medium text-textColor"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  placeholder="Please share specific packaging details such as dimensions, materials, weight limits, and design preferences. We'll promptly provide you with a quote"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`rounded-[8px] w-full border-[#333333] border bg-[#fff] p-3 ${
                    formik.touched.message && formik.errors.message
                      ? "border-red-500"
                      : ""
                  }`}
                ></textarea>
                {formik.touched.message && formik.errors.message && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.message}
                  </div>
                )}
              </div>

              {/* File Upload Field */}
              <div className="w-full">
                <label
                  className="pb-1.5 flex text-[#333333] text-sm font-medium text-textColor"
                  htmlFor="image"
                >
                  Upload Your Design
                  <span className="text-xs text-gray-500 ml-1">
                    (Max Size 5MB, Allowed: png, pdf, jpg, jpeg, webp)
                  </span>
                </label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  onChange={(event) => {
                    formik.setFieldValue("image", event.currentTarget.files[0]);
                  }}
                  onBlur={formik.handleBlur}
                  className="border w-full rounded-lg bg-white border-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#4440E6] file:text-white hover:file:bg-[#3a36c7]"
                />
                {formik.touched.image && formik.errors.image && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.image}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <Button
                  type="submit"
                  label={
                    formik.isSubmitting ? "Submitting..." : "Get Instant Quote"
                  }
                  disabled={formik.isSubmitting || !formik.isValid}
                  className="bg-[#4440E6] text-white w-full py-2 rounded-lg font-medium disabled:opacity-50"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default InstantQuoteModal;