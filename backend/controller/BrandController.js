import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { Brands } from "../model/Brand.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createBrand = catchAsyncError(async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      status: "fail",
      message: "Category name is required",
    });
  }

  if (!req.files?.image || !req.files?.bannerImage) {
    return res.status(400).json({
      status: "fail",
      message: "Both image and banner image are required",
    });
  }

  const existingBrand = await Brands.findOne({ name });
  if (existingBrand) {
    if (req.files?.image) {
      const imagePath = req.files.image[0].path;
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    if (req.files?.bannerImage) {
      const bannerPath = req.files.bannerImage[0].path;
      if (fs.existsSync(bannerPath)) {
        fs.unlinkSync(bannerPath);
      }
    }

    return res.status(409).json({
      status: "fail",
      message: "Category with this name already exists",
    });

  }

  const formatAltText = (filename) => {
    return filename.replace(/\.[^/.]+$/, "").replace(/-/g, " ");
  };
  try {

    const imagePath = `images/${req.files.image[0].originalname}`.replace(/\\/g, '/');
    const bannerPath = `images/${req.files.bannerImage[0].originalname}`.replace(/\\/g, '/');
    const brandData = {
      image: imagePath,
      bannerImage: bannerPath,
      name: req.body.name,
      bgColor: req.body.bgColor,
      content: req.body.content,
      bannerAltText: req.body.bannerAltText,
      imageAltText: req.body.imageAltText,
      slug: req.body.slug,
      metaTitle: req.body.metaTitle,
      metaDescription: req.body.metaDescription,
      keywords: req.body.keywords,
      robots: req.body.robots,
    };

    const newBrand = await Brands.create(brandData);

    res.status(201).json({
      status: "success",
      message: "Category created successfully!",
      data: newBrand,
    });
  } catch (error) {
    if (req.files?.image) {
      fs.unlinkSync(path.join(__dirname, '..', req.files.image[0].path));
    }
    if (req.files?.bannerImage) {
      fs.unlinkSync(path.join(__dirname, '..', req.files.bannerImage[0].path));
    }
    return next(error);
  }
});



export const getBrandById = async (req, res, next) => {
  const { id, slug } = req.query;

  if (!id && !slug) {
    return res.status(400).json({
      status: "fail",
      error: "Please provide either ID or Slug",
    });
  }

  try {
    let brand;
    if (id) {
      brand = await Brands.findById(id); 
    } else if (slug) {
      brand = await Brands.findOne({ slug });
    }

    if (!brand) {
      return res.status(404).json({
        status: "fail",
        error: "Brand not found",
      });
    }

    res.json({
      status: "success",
      data: brand,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      error: "Internal Server Error",
    });
  }
};


export const updateBrand = catchAsyncError(async (req, res, next) => {
  const brandId = req.params.id;
  const { name, bgColor, content, bannerAltText, imageAltText, slug, metaTitle, metaDescription, keywords, robots } = req.body;

  console.log(req.body);


  const existingBrand = await Brands.findById(brandId);
  if (!existingBrand) {
    return res.status(404).json({
      status: "fail",
      message: "Brand not found"
    });
  }
  console.log(existingBrand);
  if (name && name !== existingBrand.name) {
    const nameExists = await Brands.findOne({ name });

    if (nameExists) {
      return res.status(409).json({
        status: "fail",
        message: "Brand with this name already exists!",
      });
    }
  }

  const updateData = {
    name: name || existingBrand.name,
    bgColor: bgColor,
    content: content,
    bannerAltText: bannerAltText,
    imageAltText: imageAltText,
    slug: slug,
    metaTitle: metaTitle,
    metaDescription: metaDescription,
    keywords: keywords,
    robots: robots,
  };


  try {
    if (req.files?.image) {
      updateData.image = `images/${req.files.image[0].filename}`.replace(/\\/g, '/');
    }

    if (req.files?.bannerImage) {
      updateData.bannerImage = `images/${req.files.bannerImage[0].filename}`.replace(/\\/g, '/');
    }

    const updatedBrand = await Brands.findByIdAndUpdate(
      brandId,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: "success",
      data: updatedBrand,
      message: "Brand updated successfully!",
    });

  } catch (error) {

    if (req.files?.image) {
      fs.unlinkSync(path.join(__dirname, '..', 'images', 'images', req.files.image[0].filename));
    }
    if (req.files?.bannerImage) {
      fs.unlinkSync(path.join(__dirname, '..', 'images', 'images', req.files.bannerImage[0].filename));
    }
    return next(error);
  }
});

export const getAllBrand = async (req, res, next) => {
  try {
    const { page = 1, limit = 4, search = '', all = false } = req.query;
    if (all === 'true') {
      const brands = await Brands.aggregate([
        {
          $match: {
            $or: [{ name: { $regex: search, $options: 'i' } }],
          },
        },
        {
          $lookup: {
            from: "midcategories",
            localField: "_id",
            foreignField: "brandId",
            as: "midcategories",
          },
        },
        {
          $project: {
            name: 1,
            image: 1,
            imageAltText: 1,
            bannerImage: 1,
            bannerAltText: 1,
            bgColor: 1,
            slug: 1,
            metaTitle: 1,
            metaDescription: 1,
            keywords: 1,
            robots: 1,
            content: 1,
            createdAt: 1,
            status: 1,
            midcategories: 1,
          },
        },
      ]);

      return res.status(200).json({
        status: "success",
        data: brands,
        totalBrands: brands.length,
      });
    }

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const brands = await Brands.aggregate([
      {
        $match: {
          $or: [{ name: { $regex: search, $options: 'i' } }],
        },
      },
      {
        $lookup: {
          from: "midcategories",
          localField: "_id",
          foreignField: "brandId",
          as: "midcategories",
        },
      },
      {
        $project: {
          name: 1,
          image: 1,
          imageAltText: 1,
          bannerImage: 1,
          bannerAltText: 1,
          bgColor: 1,
          content: 1,
          createdAt: 1,
          slug: 1,
          metaTitle: 1,
          metaDescription: 1,
          keywords: 1,
          robots: 1,
          status: 1,
          midcategories: 1,
        },
      },
      { $skip: skip },
      { $limit: parseInt(limit, 10) },
    ]);

    const totalBrands = await Brands.countDocuments({
      $or: [{ name: { $regex: search, $options: 'i' } }],
    });

    res.status(200).json({
      status: "success",
      data: brands,
      totalBrands,
      pagination: {
        total: totalBrands,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        totalPages: Math.ceil(totalBrands / parseInt(limit, 10)),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBrandById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const delBrands = await Brands.findByIdAndDelete(id);
    if (!delBrands) {
      return res.json({ status: "fail", message: "Category not Found" });
    }
    res.json({
      status: "success",
      message: "Category deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
