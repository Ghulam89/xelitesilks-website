import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { ContactUs } from "../model/ContactUs.js";
// contact us create

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const create = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  
  try {
    
    const imagePath = `images/${req.files.image[0].filename}`.replace(/\\/g, '/');
    const contactData = {
      image: imagePath,
      name: data?.name,
      email: data?.email,
      phoneNumber: data?.phoneNumber,
      companyName: data?.companyName,
      message: data?.message,
      pageUrl: data?.pageUrl,
    };

    const newContact = await ContactUs.create(contactData);


    res.status(201).json({
      status: "success",
      message: "Your request has been sent to our team successfully",
      data: newContact,
    });
  } catch (error) {
 
  }
});



 


// Get All Contact
export const getAllContact = catchAsyncError(async (req, res, next) => {
  try {
    const contacts = await ContactUs.find();
    res.status(200).json({
      status: "success",
      data: contacts,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      status: "fail",
      error: "Internal Server Error",
    });
  }
});
// delet Contact us
export const deleteContactById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const delContact = await ContactUs.findByIdAndDelete(id);
    if (!delContact) {
      return res.json({ status: "fail", message: "Contact us not Found" });
    }
    res.json({
      status: "success",
      message: "User deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};




