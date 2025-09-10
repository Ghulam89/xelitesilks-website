import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { Banner } from "../model/Banner.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// create banner
export const createBanner = catchAsyncError(async (req, res, next) => {
    try {
        if (!req.files?.image) {
            return res.status(400).json({
                status: "fail",
                message: "Banner image is required",
            });
        }

        const imagePath = `images/${req.files.image[0].filename}`.replace(/\\/g, '/');
        
        const data = {
            image: imagePath,
            videoLink: req.body.videoLink,
            description: req.body.description,
            imageAltText: req.body.imageAltText
        };
        
        const newBanner = await Banner.create(data);
        
        res.status(200).json({
            status: "success",
            message: "New banner created successfully!",
            data: newBanner,
        });

    } catch (error) {
     
        if (req.files?.image) {
            const filePath = path.join(__dirname, 'images', req.files.image[0].filename);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
        return next(error);
    }
});



// get banner by id
export const getBannerById = async (req, res, next) => {
    const id = req?.params.id;
    try {
        const data = await Banner.findById(id);

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


// Update banner by id
export const updateBanner = catchAsyncError(async (req, res, next) => {
    const id = req.params.id;
    
    try {
        const existingBanner = await Banner.findById(id);
        if (!existingBanner) {
            return res.status(404).json({
                status: "fail",
                message: "Banner not found",
            });
        }

        let updateData = {
            videoLink: req.body.videoLink || existingBanner.videoLink,
            description: req.body.description || existingBanner.description,
            imageAltText: req.body.imageAltText
        };

        if (req.files?.image) {
          
            const newImagePath = `images/${req.files.image[0].filename}`.replace(/\\/g, '/');
            updateData.image = newImagePath;
            
            if (existingBanner.image) {
                const oldImageName = existingBanner.image.split('/').pop();
                const oldImagePath = path.join(__dirname, 'images', oldImageName);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
        }

        const updatedBanner = await Banner.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            status: "success",
            message: "Banner updated successfully!",
            data: updatedBanner,
        });

    } catch (error) {
     
        if (req.files?.image) {
            const filePath = path.join(__dirname, 'images', req.files.image[0].filename);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
        return next(error);
    }
});

// Get All banners
export const getAllbanners = catchAsyncError(async (req, res, next) => {
    try {
        const users = await Banner.find();
        res.status(200).json({
            status: "success",
            data: users,
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            status: "fail",
            error: "Internal Server Error",
        });
    }
});

// delete banners
export const deleteBannerById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const delBanner = await Banner.findByIdAndDelete(id);
        if (!delBanner) {
            return res.json({ status: "fail", message: "Banner not Found" });
        }
        res.json({
            status: "success",
            message: "banner deleted successfully!",
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};



