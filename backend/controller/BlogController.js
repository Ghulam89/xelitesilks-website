import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { Blogs } from "../model/Blog.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
  import { JSDOM } from 'jsdom';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const processContentImages = (content) => {
  if (!content) return content;
  
  try {
    const dom = new JSDOM(`<!DOCTYPE html><body>${content}</body>`);
    const document = dom.window.document;
    
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      const src = img.getAttribute('src');
      
      if (!img.hasAttribute('alt')) {
        let altText = 'Blog image';
        
        if (src) {
          altText = src.split('/').pop()
            .replace(/\.[^/.]+$/, "") 
            .replace(/[-_]/g, ' ')   
            .replace(/\d+/g, '')       
            .replace(/\s+/g, ' ') 
            .trim();
        }
        
        img.setAttribute('alt', altText);
      }
      
      // Add loading lazy if missing
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
    });
    
    return document.body.innerHTML;
  } catch (error) {
    console.error('Error processing content images:', error);
    return content;
  } 
};



export const createBlog = catchAsyncError(async (req, res, next) => {
  try {
    if (!req.files?.image) {
      return res.status(400).json({
        status: "fail",
        message: "Featured image is required",
      });
    }

    const imagePath = `images/${req.files.image[0].filename}`.replace(/\\/g, '/');
      
      const processedContent = processContentImages(req.body.content);

       let qna = [];
     if (req.body.qna !== undefined) {
      try {
        qna = typeof req.body.qna === 'string' ? JSON.parse(req.body.qna) : req.body.qna;
      } catch (error) {
        console.error('Error parsing Q&A:', error);
      }
    }

    const blogData = {
      image: imagePath,
      content: processedContent, 
      processedContent: processedContent,
      title: req.body?.title,
      slug:req.body?.slug,
       metaTitle:req.body.metaTitle,
      metaDescription:req.body.metaDescription,
      keywords:req.body.keywords,
      robots:req.body.robots,
      shortDescription: req.body?.shortDescription,
      imageAltText: req.body.imageAltText || 
        req.files.image[0].originalname.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' '),
         qna: qna 
    };

    const newBlog = await Blogs.create(blogData);
    
    res.status(200).json({
      status: "success",
      message: "Blog created successfully!",
      data: {
        ...newBlog.toObject(),
        image: `${imagePath}`
      }
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


// In your backend routes
// Enhanced editor image upload
export const editorImageUpload = catchAsyncError(async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'No image uploaded' 
      });
    }

    const imagePath = `images/${req.file.filename}`.replace(/\\/g, '/');
    const fullUrl = `${process.env.BASEURL}/${imagePath}`;
    
    // Generate comprehensive alt text
    const altText = req.file.originalname
      .replace(/\.[^/.]+$/, "")  
      .replace(/[-_]/g, ' ')    
      .replace(/\s+/g, ' ')    
      .trim();

    res.status(200).json({
      success: true,
      url: fullUrl,
      alt: altText
    });
  } catch (error) {
    console.error('Error uploading editor image:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Image upload failed' 
    });
  }
});
export const getBlogById = catchAsyncError(async (req, res, next) => {
  const { id, slug } = req.query;

  if (!id && !slug) {
    return res.status(400).json({
      status: "fail",
      error: "Please provide either ID or Slug",
    });
  }

  try {
    let blog;
    if (id) {
      blog = await Blogs.findById(id);
    } else if (slug) {
      blog = await Blogs.findOne({ slug });
    }

    if (!blog) {
      return res.status(404).json({
        status: "fail",
        message: "Blog not found"
      });
    }

    const blogData = blog.toObject();
    if (blogData.image && !blogData.image.startsWith('http')) {
      blogData.image = `${blogData.image}`;
    }

    res.status(200).json({
      status: "success",
      data: blogData
    });
  } catch (error) {
    next(error);
  }
});

export const updateBlog = catchAsyncError(async (req, res, next) => {
  try {
    const blog = await Blogs.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ 
        status: "fail",
        message: "Blog not found" 
      });
    }
    const processedContent = processContentImages(req.body.content || blog.content);
     // Handle Q&A updates
    let qna = blog.qna; // Default to existing Q&A
    
    if (req.body.qna !== undefined) {
      try {
        // If qna is an empty array, string, or null, clear all Q&A
        if (req.body.qna === '' || req.body.qna === null || req.body.qna === '[]') {
          qna = [];
        } 
        // If qna is a string, parse it
        else if (typeof req.body.qna === 'string') {
          qna = JSON.parse(req.body.qna);
        } 
        // If qna is an array, use it directly
        else if (Array.isArray(req.body.qna)) {
          qna = req.body.qna;
        }
      } catch (error) {
        console.error('Error parsing Q&A:', error);
        // Keep existing qna if parsing fails
      }
    }
    const updateData = {
      content: processedContent,
      processedContent: processedContent,
      title: req.body?.title || blog.title, 
      slug: req.body?.slug, 
       metaTitle:req.body.metaTitle,
      metaDescription:req.body.metaDescription,
      keywords:req.body.keywords,
      robots:req.body.robots,
      shortDescription: req.body?.shortDescription || blog.shortDescription,
      imageAltText: req.body?.imageAltText || blog.imageAltText,
       qna: qna
    };

    if (req.files?.image) {
      const newImagePath = `images/${req.files.image[0].filename}`.replace(/\\/g, '/');
      updateData.image = newImagePath;
      
      if (blog.image) {
        const oldImageName = blog.image.split('/').pop();
        const oldImagePath = path.join(__dirname, 'images', oldImageName);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      
      if (!updateData.imageAltText) {
        updateData.imageAltText = req.files.image[0].originalname
          .replace(/\.[^/.]+$/, "")
          .replace(/[-_]/g, ' ');
      }
    }

    const updatedBlog = await Blogs.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    const responseData = updatedBlog.toObject();
    if (responseData.image && !responseData.image.startsWith('http')) {
      responseData.image = `${process.env.BASEURL}/${responseData.image}`;
    }

    res.status(200).json({
      status: "success",
      data: responseData,
      message: "Blog updated successfully!",
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

// Get all blogs with pagination and URL handling
export const getAllBlogs = catchAsyncError(async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
     const searchQuery = req.query.search || '';

  const filter = {};
    if (searchQuery) {
      filter.$or = [
        { title: { $regex: searchQuery, $options: 'i' } },
        { content: { $regex: searchQuery, $options: 'i' } },
        { tags: { $regex: searchQuery, $options: 'i' } }
      ];
    }
    const [blogs, totalBlogs] = await Promise.all([
      Blogs.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Blogs.countDocuments()
    ]);

    // Process image URLs
    const processedBlogs = blogs.map(blog => ({
      ...blog,
      image: blog.image.startsWith('http') ? blog.image : `${blog.image}`
    }));

    res.status(200).json({
      status: "success",
      data: processedBlogs,
      pagination: {
        total: totalBlogs,
        page,
        limit,
        totalPages: Math.ceil(totalBlogs / limit),
      },
    });
  } catch (error) {
    next(error);
  }
});

// Delete blog with image cleanup
export const deleteBlogById = catchAsyncError(async (req, res, next) => {
  try {
    const blog = await Blogs.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ 
        status: "fail", 
        message: "Blog not found" 
      });
    }

    // Delete associated image
    if (blog.image) {
      const imageName = blog.image.split('/').pop();
      const imagePath = path.join(__dirname, 'images', imageName);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({
      status: "success",
      message: "Blog deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
});

// Function for sitemap generation
export const getAllBlogsForSitemap = async () => {
  try {
    const blogs = await Blogs.find().select('slug updatedAt');
    return blogs;
  } catch (error) {
    console.error("Error fetching blogs for sitemap:", error);
    return [];
  }
};