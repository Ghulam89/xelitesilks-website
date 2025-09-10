import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { RequestQuote } from "../model/RequestQuote.js";
import nodemailer from 'nodemailer';
import { adminTemplate, customerTemplate } from "../utils/emailTemplate.js";
import { detect } from 'detect-browser';
import { getClientIP } from "../utils/ipDetection.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "gm6681328@gmail.com",
    pass: "ptpatylqsrszlqtq", 
  },
  tls: {
    rejectUnauthorized: false 
  }
});

// create blog
export const createRequestQuote = catchAsyncError(async (req, res, next) => {
  const data = req.body;
let imagePath = null;

  try {

    if(req.files.image){
        imagePath = `images/${req.files.image[0].filename}`.replace(/\\/g, '/');
    }
 
    // Get client IP using utility function
    const clientIp = getClientIP(req);

    // Detect browser/device info
    const browserInfo = detect(req.headers['user-agent']);
    const deviceInfo = browserInfo
      ? `${browserInfo.name} ${browserInfo.version} on ${browserInfo.os}`
      : 'Unknown device';
    
    const quoteData = {
      image: imagePath,
      name: data?.name,
      email: data?.email,
      phoneNumber: data?.phoneNumber,
      companyName: data?.companyName,
      boxStyle: data?.boxStyle,
      length: data?.length,
      width: data?.width,
      depth: data?.depth,
      unit: data?.unit,
      quantity: data?.quantity,
      stock: data?.stock,
      color: data?.color,
      addons: data?.addons,
      message: data?.message,
      pageUrl: data?.pageUrl,
      device: deviceInfo,
      ip: clientIp,
    };

    const newRequestQuote = await RequestQuote.create(quoteData);

    const mailOptions = {
      from: 'gm6681328@gmail.com',
      to: data?.email,
      subject: 'Thank You for Your Quote Request - Umbrella Packaging',
      html: customerTemplate(data?.name)
    };

    const adminMailOptions = {
      from: 'gm6681328@gmail.com',
      to: data?.email,
      subject: `${data?.name} <${data?.email}> | inquiry@umbrellapackaging.com`,
      html: adminTemplate(quoteData)
    };  
    
    try {
      await transporter.sendMail(mailOptions);
      await transporter.sendMail(adminMailOptions);
    } catch (error) {
      
    }

    res.status(201).json({
      status: "success",
      message: "Request Quote created successfully and confirmation email sent!",
      data: newRequestQuote,
    });
  } catch (error) {
    
    if (req.files?.image) {
      fs.unlinkSync(path.join(__dirname, '..', req.files.image[0].path));
    }
    return next(error);
  }
});

// get blog by id
export const getRequestQuoteById = async (req, res, next) => {
  const id = req?.params.id;
  try {
    const data = await RequestQuote.findById(id);

    res.json({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      error: "Internal Server Error",
    });
  }
};
// update blog
export const updateRequestQuote = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  const requestQuoteId = req.params.id;
  
  const existingRequestQuote = await RequestQuote.findById(requestQuoteId);
  if (!existingRequestQuote) {
    return res.status(404).json({ 
      status: "fail",
      message: "Request quote not found" 
    });
  }

  try {
    let updateData = { ...data };
    if (req.files?.image) {
     
      if (existingRequestQuote.image) {
        const oldImagePath = path.join(
          __dirname, 
          '..', 
          'public', 
          existingRequestQuote.image.replace(process.env.BASEURL, '')
        );
        
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
     
      updateData.image = `images/${req.files.image[0].filename}`.replace(/\\/g, '/');
    }

    const updatedRequestQuote = await RequestQuote.findByIdAndUpdate(
      requestQuoteId, 
      updateData, 
      { new: true }
    );

    res.status(200).json({
      status: "success",
      data: updatedRequestQuote,
      message: "Request Quote updated successfully!",
    });
  } catch (error) {
   
    if (req.files?.image) {
      fs.unlinkSync(path.join(__dirname, '..', req.files.image[0].path));
    }
    return next(error);
  }
});


export const getAllRequestQuote = catchAsyncError(async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    const blogs = await RequestQuote.aggregate([
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit },
    ]);
    const totalRequestQuote = await RequestQuote.countDocuments();

    res.status(200).json({
      status: "success",
      data: blogs,
      pagination: {
        total: totalRequestQuote,
        page,
        limit,
        totalPages: Math.ceil(totalRequestQuote / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching blogs with pagination:", error);
    res.status(500).json({
      status: "fail",
      error: "Internal Server Error",
    });
  }
});



// delete blog
export const deleteRequestQuoteById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const deleteRequestQuote = await RequestQuote.findByIdAndDelete(id);
    if (!deleteRequestQuote) {
      return res.json({ status: "fail", message: "Blog not Found" });
    }
    res.json({
      status: "success",
      message: "Request Quote deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};






