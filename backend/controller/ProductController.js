
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { Brands } from "../model/Brand.js";
import { Products } from "../model/Product.js";
import { MidCategory } from "../model/MidCategory.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from "mongoose";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


   // Improved formatFileName function
  const formatFileName = (fileName) => {
    if (!fileName) return '';
    
    // Remove file extension
    let formatted = fileName.replace(/\.[^/.]+$/, '');
    
    // Replace all special characters (dashes, underscores) with spaces
    formatted = formatted.replace(/[_-]/g, ' ');
    
    // Remove any remaining special characters except spaces and letters
    formatted = formatted.replace(/[^\w\s]/gi, '');
    
    // Trim whitespace and capitalize each word
    formatted = formatted
      .trim()
      .split(/\s+/)
      .map(word => 
        word.length > 0 
          ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() 
          : ''
      )
      .join(' ');
    
    return formatted;
  };

export const createProducts = catchAsyncError(async (req, res, next) => {
  const {
    name,
    slug,
    metaTitle,
      metaDescription,
      keywords,
      robots,
    actualPrice,
    size,
    description,
    bannerTitle,
    bannerContent,
    brandId,
    categoryId,
    bannerImageAltText
  } = req.body;

  if (!req.files || !req.files['images'] || !req.files['bannerImage']) {
    return res.status(400).json({
      status: "fail",
      message: "Both product images (field name: 'images') and banner image (field name: 'bannerImage') are required",
    });
  }


 

  const existingProduct = await Products.findOne({ name });
  if (existingProduct) {
    if (req.files['images']) {
      req.files['images'].forEach(image => {
        if (fs.existsSync(image.path)) {
          fs.unlinkSync(image.path);
        }
      });
    }
    if (req.files['bannerImage']) {
      const bannerPath = req.files['bannerImage'][0].path;
      if (fs.existsSync(bannerPath)) {
        fs.unlinkSync(bannerPath);
      }
    }

    return res.status(409).json({
      status: "fail",
      message: "Product with this name already exists",
    });
  }

  try {
    const productImages = Array.isArray(req.files['images'])
      ? req.files['images']
      : [req.files['images']];

    const images = productImages.map(image => ({
      url: `images/${image.filename}`.replace(/\\/g, '/'),
      altText: formatFileName(image.originalname)
    }));

    const bannerImageFile = Array.isArray(req.files['bannerImage'])
      ? req.files['bannerImage'][0]
      : req.files['bannerImage'];

    const bannerPath = `images/${bannerImageFile.filename}`.replace(/\\/g, '/');

    const productData = {
      name,
      slug,
       metaTitle,
      metaDescription,
      keywords,
      robots,
      actualPrice,
      size,
      description,
      bannerTitle,
      bannerContent,
      images,
      bannerImage: bannerPath,
      bannerImageAltText,
      brandId,
      categoryId,
    };

    const newProduct = await Products.create(productData);

    res.status(201).json({
      status: "success",
      message: "Product created successfully!",
      data: newProduct,
    });
  } catch (error) {
    if (req.files['images']) {
      req.files['images'].forEach(image => {
        fs.unlinkSync(path.join(__dirname, '..', image.path));
      });
    }
    if (req.files['bannerImage']) {
      const bannerImageFile = Array.isArray(req.files['bannerImage'])
        ? req.files['bannerImage'][0]
        : req.files['bannerImage'];
      fs.unlinkSync(path.join(__dirname, '..', bannerImageFile.path));
    }
    return next(error);
  }
});

export const getBrandProductsByCategory = catchAsyncError(async (req, res, next) => {
  const brandId = req.params.brandId;

  try {
    const brand = await Brands.findById(brandId);
    if (!brand) {
      return res.status(404).json({
        status: "fail",
        message: "Brand not found",
      });
    }
    const productsByCategory = await Products.aggregate([
       {
        $match: {
          brandId: new mongoose.Types.ObjectId(brandId)
        }
      },
      {
        $lookup: {
          from: "midcategories",
          localField: "categoryId",
          foreignField: "_id",
          as: "categoryInfo"
        }
      },
      {
        $unwind: {
          path: "$categoryInfo",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id: "$categoryInfo._id",
          categoryName: { $first: "$categoryInfo.title" },
          categoryImage: { $first: "$categoryInfo.image" },
          categorySlug: { $first: "$categoryInfo.slug" },
          products: {
            $push: {
              _id: "$_id",
              name: "$name",
              slug: "$slug",
              price: "$price",
              images: "$images",
              actualPrice: "$actualPrice",
              size: "$size",
              description: "$description",

            }
          }
        }
      },
      {
        $match: {
          _id: { $ne: null }
        }
      },
      {
        $project: {
          _id: 1,
          categoryName: 1,
          categoryImage: 1,
          categorySlug: 1,
          products: 1,
          productCount: { $size: "$products" }
        }
      },
      {
        $sort: { categoryName: 1 }
      }
    ]);

    res.status(200).json({
      status: "success",
      data: {
        brand: {
          _id: brand._id,
          name: brand.name,
          image: brand.image,
          slug: brand.slug,
        },
        categories: productsByCategory
      }
    });

  } catch (error) {
    next(error);
  }
});


export const getRelatedProducts = catchAsyncError(async (req, res, next) => {
  const productSlug = req.query.slug;

  try {
    // 1. Find the main product by slug
    const mainProduct = await Products.findOne({ slug: productSlug });
    if (!mainProduct) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    const relatedProducts = await Products.find({
      _id: { $ne: mainProduct._id },
      $or: [
        { categoryId: mainProduct.categoryId },
        { brandId: mainProduct.brandId }, 
      ],
    })
      .limit(8) 
      .sort({ createdAt: -1 }); 

    res.status(200).json({
      status: "success",
      data: {
        relatedProducts,
      },
    });
  } catch (error) {
    next(error);
  }
});

export const getProductsByCategory = catchAsyncError(async (req, res, next) => {
  const categoryId = req.params.categoryId;
  const page = parseInt(req.query.page) || 1;
  const limit = 12;

  try {

    const category = await MidCategory.findById(categoryId);

    if (!category) {

      return res.status(404).json({
        status: "fail",
        message: "Category not found",
      });
    }

    console.log('Found category:', category.name);

    const skip = (page - 1) * limit;

    const queryConditions = {
      $or: [
        { category: categoryId },
        { midCategory: categoryId },
        { categoryId: categoryId }
      ]
    };


    const products = await Products.find(queryConditions)
      .skip(skip)
      .limit(limit)
      .lean();


    const totalProducts = await Products.countDocuments(queryConditions);
    const totalPages = Math.ceil(totalProducts / limit);

    res.status(200).json({
      status: "success",
      results: products.length,
      currentPage: page,
      totalPages: totalPages,
      totalProducts: totalProducts,
      data: products
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",

    });
  }
});

export const getProductsById = async (req, res, next) => {
  const { id, slug } = req.query;

  if (!id && !slug) {
    return res.status(400).json({
      status: "fail",
      error: "Please provide either ID or Slug",
    });
  }

  try {
    let query;
    if (id) {
      query = Products.findById(id); 
    } else if (slug) {
      query = Products.findOne({ slug }); 
    }

    // Always populate categoryId and brandId
    query = query.populate("categoryId","_id title slug").populate("brandId","_id name slug");

    const data = await query.exec();

    if (!data) {
      return res.status(404).json({
        status: "fail",
        error: "Product not found",
      });
    }

    res.json({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      error: "Internal Server Error",
    });
  }
};

export const updateProducts = catchAsyncError(async (req, res, next) => {
  const productId = req.params.id;
  
  try {
    // Get the current product
    const currentProduct = await Products.findById(productId);
    if (!currentProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Parse the existing images data from the request
    const existingImages = req.body.existingImages 
      ? JSON.parse(req.body.existingImages)
      : currentProduct.images;

    // Initialize update data with non-image fields
    const updateData = {
      ...req.body,
      // Remove image-related fields that we'll handle separately
      images: undefined,
      bannerImage: undefined,
      existingImages: undefined
    };

    // Handle images - both existing and new
    let updatedImages = [];

    // 1. Process existing images that should remain
    if (existingImages && existingImages.length > 0) {
      updatedImages = existingImages.map(img => ({
        url: img.url,
        altText: img.altText || formatFileName(img.originalPath)
      }));
    }

    // 2. Add new images if any were uploaded
    if (req.files && req.files['images']) {
      const newImages = Array.isArray(req.files['images'])
        ? req.files['images']
        : [req.files['images']];

      const uploadedImages = newImages.map(image => ({
        url: `images/${image.filename}`.replace(/\\/g, '/'),
        altText: req.body.imagesAltTexts?.[updatedImages.length] || formatFileName(image.originalname),
        originalPath: image.originalname
      }));

      updatedImages = [...updatedImages, ...uploadedImages];
    }

    // Only update images if we have changes
    if (updatedImages.length > 0) {
      updateData.images = updatedImages;
    }

    // Handle banner image updates
    if (req.files && req.files['bannerImage']) {
      const bannerImageFile = req.files['bannerImage'][0] || req.files['bannerImage'];
      updateData.bannerImage = `images/${bannerImageFile.filename}`.replace(/\\/g, '/');
      updateData.bannerImageAltText = req.body.bannerImageAltText || formatFileName(bannerImageFile.originalname);
    } else if (req.body.bannerImageAltText) {
      // Only update alt text if banner image wasn't changed
      updateData.bannerImageAltText = req.body.bannerImageAltText;
    }

    // Perform the update
    const updatedProduct = await Products.findByIdAndUpdate(
      productId, 
      updateData, 
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: "success",
      data: updatedProduct,
      message: "Product updated successfully!",
    });
  } catch (error) {
    // Clean up any uploaded files if error occurs
    if (req.files) {
      Object.values(req.files).forEach(fileArray => {
        if (Array.isArray(fileArray)) {
          fileArray.forEach(file => {
            if (fs.existsSync(file.path)) {
              fs.unlinkSync(file.path);
            }
          });
        } else if (fs.existsSync(fileArray.path)) {
          fs.unlinkSync(fileArray.path);
        }
      });
    }
    next(error);
  }
});

export const getAllProducts = catchAsyncError(async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const perPage = parseInt(req.query.perPage, 10) || 15;
    const skip = (page - 1) * perPage;
    const sortOption = getSortOption(req.query.sort);
    let filter = {};
    if (req.query.categoryId) {
      filter['categoryId'] = req.query.categoryId;
    } else if (req.query.categoryTitle) {
      filter['categoryId'] = await Category.findOne({
        title: new RegExp(req.query.categoryTitle, "i")
      }).select('_id');
    }

    if (req.query.brandId) {
      filter['brandId'] = req.query.brandId;
    } else if (req.query.brandName) {
      filter['brandId'] = await Brands.findOne({
        name: new RegExp(req.query.brandName, "i")
      }).select('_id');
    }

    if (req.query.name) {
      filter.name = new RegExp(req.query.name, "i");
    }
    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) filter.price.$gte = parseFloat(req.query.minPrice);
      if (req.query.maxPrice) filter.price.$lte = parseFloat(req.query.maxPrice);
    }

    if (req.query.status) {
      filter.status = req.query.status;
    }

    const products = await Products.find(filter)
      .populate({
        path: "categoryId",
        select: "title slug"
      })
      .populate({
        path: "brandId",
        select: "name slug"
      })
      .sort(sortOption)
      .skip(skip)
      .limit(perPage);

    const totalProducts = await Products.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / perPage);

    res.status(200).json({
      status: "success",
      data: products,
      totalProducts: totalProducts,
      pagination: {
        page,
        perPage,
        totalPages,
        
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      status: "fail",
      error: "Internal Server Error",
      message: error.message
    });
  }
});

export const searchProduct = catchAsyncError(async (req, res, next) => {
  const { name } = req.query;

  try {
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const products = await Products.find({
      name: { $regex: name, $options: "i" },
    });

    res.status(200).json({ data: products, status: "success" });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Function for sitemap generation
export const getAllProductsForSitemap = async () => {
  try {
    const products = await Products.find().select('slug updatedAt');
    return products;
  } catch (error) {
    console.error("Error fetching products for sitemap:", error);
    return [];
  }
};

const getSortOption = (sort) => {
  switch (sort) {
    case "releaseDate-asc":
      return { createdAt: 1 };
    case "releaseDate-desc":
      return { createdAt: -1 };
    case "price-asc":
      return { discountPrice: 1 };
    case "price-desc":
      return { discountPrice: -1 };
    default:
      return { createdAt: -1 };
  }
};


export const deleteproductsById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const delProducts = await Products.findByIdAndDelete(id);
    if (!delProducts) {
      return res.json({ status: "fail", message: "Product not Found" });
    }
    res.json({
      status: "success",
      message: "Product deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};



