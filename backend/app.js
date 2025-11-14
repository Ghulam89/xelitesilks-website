import express from "express";
import { connectDB } from "./config/database.js";
import ErrorMiddleware from "./middleware/Error.js";
import cors from "cors";
import ContactusRouter from "./routes/contactusrouter.js";
import blogRouter from "./routes/blogRouter.js";
import FaqRouter from "./routes/FaqRouter.js";
import adminRoute from "./routes/AdminRouter.js";
import productRouter from "./routes/ProductRouter.js";
import collectionRouter from "./routes/CollectionRouter.js";
import checkoutRouter from "./routes/CheckoutRouter.js";
import userRoute from "./routes/userRoute.js";
import ratingRoute from "./routes/RatingRouter.js";
import subscribeRouter from "./routes/SubscribeRouter.js";
import requestQuoteRouter from "./routes/RequestQuote.js";
import instantQuoteRouter from "./routes/InstantQuote.js";
import sitemapRouter from "./routes/sitemapRouter.js";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SSR/Frontend imports
import fs from 'node:fs/promises';

// Connect to database
connectDB();
const app = express();

// Static files and images
app.use(express.static("static"));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Backend API routes
app.use("/collections", collectionRouter);
app.use("/user", userRoute);
app.use("/contactus", ContactusRouter);
app.use("/blog", blogRouter);
app.use("/faq", FaqRouter);
app.use("/admin", adminRoute);
app.use("/products", productRouter);
app.use("/checkout", checkoutRouter);
app.use("/rating", ratingRoute);
app.use("/subscribe", subscribeRouter);
app.use("/requestQuote", requestQuoteRouter);
app.use("/instantQuote", instantQuoteRouter);
app.use("/", sitemapRouter);

// Simple API test route
app.get("/apis", async (req, res) => {
  res.send("App Is Running backend!");
});

// Error middleware for APIs
app.use(ErrorMiddleware);

// ================= SSR/Frontend optimization =================
const isProduction = process.env.NODE_ENV === 'production';
const base = process.env.BASE || '/';

// Cache for production template and render function
let productionTemplate = '';
let productionRender = null;
let vite = null;

// Preload production assets in production mode
if (isProduction) {
  try {
    const templatePath = path.join(__dirname, '../frontend/dist/client/index.html');
    const serverEntryPath = path.join(__dirname, '../frontend/dist/server/entry-server.js');
    
    // Load assets in parallel
    const [template, serverModule] = await Promise.all([
      fs.readFile(templatePath, 'utf-8'),
      import(serverEntryPath)
    ]);
    
    productionTemplate = template;
    productionRender = serverModule.render;
    
    console.log('Production assets preloaded successfully');
  } catch (error) {
    console.error('Failed to preload production assets:', error);
    // Don't crash the server, but log the error
  }
} else {
  // Development mode - use Vite
  try {
    const { createServer } = await import('vite');
    vite = await createServer({
      server: { middlewareMode: true },
      appType: 'custom',
      base,
      root: path.join(__dirname, '../frontend'),
    });
    app.use(vite.middlewares);
  } catch (error) {
    console.error('Failed to start Vite:', error);
  }
}

// In production, serve static files with caching headers rsdsd
if (isProduction) {
  try {
    const compression = (await import('compression')).default;
    const sirv = (await import('sirv')).default;
    app.use(compression());
    app.use(base, sirv(path.join(__dirname, '../frontend/dist/client'), {
      extensions: [],
      maxAge: 31536000, // 1 year
      immutable: true
    }));
  } catch (error) {
    console.error('Failed to set up static file serving:', error);
  }
}


app.use('*', async (req, res, next) => {
  const startTime = Date.now();
  const url = req.originalUrl.replace(base, '') || '/';
  
  if (url.startsWith('/api/') || 
      url.startsWith('/_vite') || 
      url.includes('.') && !url.endsWith('/')) {
    return next();
  }
  

  
  let template, render;
  let rendered = { html: '', helmet: {}, serverData: {} };
  
  try {
    if (!isProduction && vite) {
      // Development mode
      try {
        template = await fs.readFile(
          path.join(__dirname, '../frontend/index.html'), 
          'utf-8'
        );
        
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('../frontend/src/entry-server.jsx')).render;
      } catch (error) {
        console.error('Vite development error:', error);
        // return sendErrorResponse(res, 'Development server error');
      }
    } else if (isProduction && productionTemplate && productionRender) {
      // Production mode
      template = productionTemplate;
      render = productionRender;
    } else {
      // Server not ready
      // return sendErrorResponse(res, 'Server not ready yet');
    }
    
    const renderPromise = render(url);
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('SSR timeout')), 2000)
    );
    
    // Race between render and timeout
    rendered = await Promise.race([renderPromise, timeoutPromise]);
    
    const html = template
      .replace(
        '<!--app-head-->',
        `\n${rendered.helmet?.title || ''}\n${rendered.helmet?.meta || ''}\n${rendered.helmet?.link || ''}\n${rendered.helmet?.script || ''}\n`
      )
      .replace('<!--app-html-->', rendered.html || '')
      .replace(
        '<!--server-data-->', 
        `<script>window.__SERVER_DATA__ = ${JSON.stringify(rendered.serverData || {})}</script>`
      );
    
   
    
    res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
    console.log(`SSR completed for ${url}: ${Date.now() - startTime}ms`);
    
  } catch (e) {
    if (e.message === 'SSR timeout') {
      console.error(`SSR timeout for ${url}: ${Date.now() - startTime}ms`);
      
      if (template) {
        const fallbackHtml = template
          .replace('<!--app-head-->', '')
          .replace('<!--app-html-->', '<div id="app"></div>')
          .replace('<!--server-data-->', '<script>window.__SERVER_DATA__ = {}</script>');
        
        res.status(200).set({ 'Content-Type': 'text/html' }).send(fallbackHtml);
      } else {
        // sendErrorResponse(res, 'SSR timeout and no template available');
      }
    } else {
      console.error('SSR Error:', e.stack);
      // sendErrorResponse(res, 'Server rendering error');
    }
  }
});

// function sendErrorResponse(res, message) {
//   res.status(500).send(`
//     <!DOCTYPE html>
//     <html>
//       <head>
//         <title>Error</title>
//         <style>
//           body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
//           h1 { color: #d32f2f; }
//         </style>
//       </head>
//       <body>
//         <h1>Something went wrong</h1>
//         <p>${message}</p>
//         <p>Please try again later.</p>
//       </body>
//     </html>
//   `);
// }

const PORT = process.env.PORT || 9000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT} in dev mode`);
});
