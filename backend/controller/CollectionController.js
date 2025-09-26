import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { Collections } from "../model/Collection.js";
export const createCollection = catchAsyncError(async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      status: "fail",
      message: "Collection name is required",
    });
  }
  try {
    const collectionData = {
      name: req.body.name,
      description: req.body.description,
      slug: req.body.slug,
      metaTitle: req.body.metaTitle,
      metaDescription: req.body.metaDescription,
      keywords: req.body.keywords,
      robots: req.body.robots,
    };

    const newCollection = await Collections.create(collectionData);

    res.status(201).json({
      status: "success",
      message: "Collection created successfully!",
      data: newCollection,
    });
  } catch (error) {

    return next(error);
  }
});

export const getCollectionById = async (req, res, next) => {
  const { id, slug } = req.query;

  if (!id && !slug) {
    return res.status(400).json({
      status: "fail",
      error: "Please provide either ID or Slug",
    });
  }

  try {
    let collection;
    if (id) {
      collection = await Collections.findById(id);
    } else if (slug) {
      collection = await Collections.findOne({ slug });
    }

    if (!collection) {
      return res.status(404).json({
        status: "fail",
        error: "Collection not found",
      });
    }

    res.json({
      status: "success",
      data: collection,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      error: "Internal Server Error",
    });
  }
};

export const updateCollection = catchAsyncError(async (req, res, next) => {
  const collectionId = req.params.id;
  const { name, description, slug, metaTitle, metaDescription, keywords, robots } = req.body;

  console.log(req.body);


  const existingCollection = await Collections.findById(collectionId);
  if (!existingCollection) {
    return res.status(404).json({
      status: "fail",
      message: "Collection not found"
    });
  }
  if (name && name !== existingCollection.name) {
    const nameExists = await Collections.findOne({ name });

    if (nameExists) {
      return res.status(409).json({
        status: "fail",
        message: "Collection with this name already exists!",
      });
    }
  }

  const updateData = {
    name: name || existingCollection.name,
    description: description,
    slug: slug,
    metaTitle: metaTitle,
    metaDescription: metaDescription,
    keywords: keywords,
    robots: robots,
  };


  try {


    const updatedCollection = await Collections.findByIdAndUpdate(
      collectionId,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: "success",
      data: updatedCollection,
      message: "Collection updated successfully!",
    });

  } catch (error) {


    return next(error);
  }
});

export const getAllCollection = async (req, res, next) => {
  try {
    const { page = 1, limit = 4, search = '', all = false } = req.query;
    if (all === 'true') {
      const collections = await Collections.find({});

      return res.status(200).json({
        status: "success",
        data: collections,
        totalCollections: collections.length,
      });
    }

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const collections = await Collections.find({});

    const totalCollections = await Collections.countDocuments({
      $or: [{ name: { $regex: search, $options: 'i' } }],
    });

    res.status(200).json({
      status: "success",
      data: collections,
      totalCollections,
      pagination: {
        total: totalCollections,
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        totalPages: Math.ceil(totalCollections / parseInt(limit, 10)),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCollectionById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const delCollections = await Collections.findByIdAndDelete(id);
    if (!delCollections) {
      return res.json({ status: "fail", message: "Collection not Found" });
    }
    res.json({
      status: "success",
      message: "Collection deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
