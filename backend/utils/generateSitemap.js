import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from '../config/database.js';
import { getAllProducts } from '../controller/ProductController.js';
import { getAllCollections } from '../controller/CollectionController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateSitemap() {
//   try {
//     // Connect to database
//     await connectDB();
    
//     let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
// <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//   <!-- Static Pages -->
//   <url>
//     <loc>https://xelitesilks.com/</loc>
//     <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
//     <changefreq>daily</changefreq>
//     <priority>1.0</priority>
//   </url>
//   <url>
//     <loc>https://xelitesilks.com/about-us</loc>
//     <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
//     <changefreq>monthly</changefreq>
//     <priority>0.8</priority>
//   </url>
//   <url>
//     <loc>https://xelitesilks.com/contact-us</loc>
//     <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
//     <changefreq>monthly</changefreq>
//     <priority>0.7</priority>
//   </url>
//   <url>
//     <loc>https://xelitesilks.com/blogs</loc>
//     <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
//     <changefreq>weekly</changefreq>
//     <priority>0.8</priority>
//   </url>
//   <url>
//     <loc>https://xelitesilks.com/shop</loc>
//     <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
//     <changefreq>daily</changefreq>
//     <priority>0.9</priority>
//   </url>
//   <url>
//     <loc>https://xelitesilks.com/get-custom-quote</loc>
//     <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
//     <changefreq>monthly</changefreq>
//     <priority>0.8</priority>
//   </url>
//   <url>
//     <loc>https://xelitesilks.com/target-price</loc>
//     <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
//     <changefreq>monthly</changefreq>
//     <priority>0.7</priority>
//   </url>
//   <url>
//     <loc>https://xelitesilks.com/faqs</loc>
//     <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
//     <changefreq>monthly</changefreq>
//     <priority>0.6</priority>
//   </url>
//   <url>
//     <loc>https://xelitesilks.com/portfolio</loc>
//     <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
//     <changefreq>monthly</changefreq>
//     <priority>0.7</priority>
//   </url>
//   <url>
//     <loc>https://xelitesilks.com/reviews</loc>
//     <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
//     <changefreq>weekly</changefreq>
//     <priority>0.6</priority>
//   </url>
//   <url>
//     <loc>https://xelitesilks.com/privacy-policy</loc>
//     <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
//     <changefreq>yearly</changefreq>
//     <priority>0.3</priority>
//   </url>
//   <url>
//     <loc>https://xelitesilks.com/terms-and-conditions</loc>
//     <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
//     <changefreq>yearly</changefreq>
//     <priority>0.3</priority>
//   </url>
//   <url>
//     <loc>https://xelitesilks.com/shipping-policy</loc>
//     <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
//     <changefreq>yearly</changefreq>
//     <priority>0.3</priority>
//   </url>
//   <url>
//     <loc>https://xelitesilks.com/returns-refunds</loc>
//     <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
//     <changefreq>yearly</changefreq>
//     <priority>0.3</priority>
//   </url>`;

//     // Add categories (direct routes)
//     try {
//       const categories = await getAllCategories();
//       if (categories && categories.length > 0) {
//         categories.forEach(category => {
//           if (category.slug) {
//             sitemap += `
//   <url>
//     <loc>https://xelitesilks.com/category/${category.slug}</loc>
//     <lastmod>${category.updatedAt ? new Date(category.updatedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}</lastmod>
//     <changefreq>weekly</changefreq>
//     <priority>0.7</priority>
//   </url>`;
//           }
//         });
//       }
//     } catch (error) {
//       console.log("Error fetching categories for sitemap:", error);
//     }

//     // Add sub-categories (direct routes)
//     try {
//       const subCategories = await getAllSubCategories();
//       if (subCategories && subCategories.length > 0) {
//         subCategories.forEach(subCategory => {
//           if (subCategory.slug) {
//             sitemap += `
//   <url>
//     <loc>https://xelitesilks.com/sub-category/${subCategory.slug}</loc>
//     <lastmod>${subCategory.updatedAt ? new Date(subCategory.updatedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}</lastmod>
//     <changefreq>weekly</changefreq>
//     <priority>0.6</priority>
//   </url>`;
//           }
//         });
//       }
//     } catch (error) {
//       console.log("Error fetching sub-categories for sitemap:", error);
//     }

//     // Add products (direct routes)
//     try {
//       const products = await getAllProducts();
//       if (products && products.length > 0) {
//         products.forEach(product => {
//           if (product.slug) {
//             sitemap += `
//   <url>
//     <loc>https://xelitesilks.com/${product.slug}</loc>
//     <lastmod>${product.updatedAt ? new Date(product.updatedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}</lastmod>
//     <changefreq>weekly</changefreq>
//     <priority>0.8</priority>
//   </url>`;
//           }
//         });
//       }
//     } catch (error) {
//       console.log("Error fetching products for sitemap:", error);
//     }

//     // Add blogs (direct routes)
//     try {
//       const blogs = await getAllBlogs();
//       if (blogs && blogs.length > 0) {
//         blogs.forEach(blog => {
//           if (blog.slug) {
//             sitemap += `
//   <url>
//     <loc>https://xelitesilks.com/blog/${blog.slug}</loc>
//     <lastmod>${blog.updatedAt ? new Date(blog.updatedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}</lastmod>
//     <changefreq>monthly</changefreq>
//     <priority>0.6</priority>
//   </url>`;
//           }
//         });
//       }
//     } catch (error) {
//       console.log("Error fetching blogs for sitemap:", error);
//     }

//     sitemap += `
// </urlset>`;

//     // Write to frontend public directory
//     const sitemapPath = path.join(__dirname, '../../frontend/public/sitemap.xml');
//     fs.writeFileSync(sitemapPath, sitemap);
    
//     console.log('Sitemap generated successfully!');
//     console.log(`Total URLs in sitemap: ${sitemap.split('<url>').length - 1}`);
    
//     process.exit(0);
//   } catch (error) {
//     console.error("Error generating sitemap:", error);
//     process.exit(1);
//   }
}

// Run the script
generateSitemap(); 