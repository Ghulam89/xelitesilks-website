import express from "express";
import { connectDB } from "./config/database.js";
import ErrorMiddleware from "./middleware/Error.js";
import cors from "cors";
import bannerRouter from "./routes/bannerRoute.js";
import ContactusRouter from "./routes/contactusrouter.js";
import blogRouter from "./routes/blogRouter.js";
import FaqRouter from "./routes/FaqRouter.js";
import adminRoute from "./routes/AdminRouter.js";
import subcategoryRouter from "./routes/SubCategory.js";
import productRouter from "./routes/ProductRouter.js";
import brandRouter from "./routes/BrandRouter.js";
import checkoutRouter from "./routes/CheckoutRouter.js";
import userRoute from "./routes/userRoute.js";
import categoryRouter from "./routes/MidCategoryRouter.js";
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
app.use("/brands", brandRouter);
app.use("/user", userRoute);
app.use("/banner", bannerRouter);
app.use("/contactus", ContactusRouter);
app.use("/blog", blogRouter);
app.use("/faq", FaqRouter);
app.use("/admin", adminRoute);
app.use("/category", categoryRouter);
app.use("/subcategory", subcategoryRouter);
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

// ================= SSR/Frontend logic =================
const isProduction = process.env.NODE_ENV === 'production';
const base = process.env.BASE || '/';
let templateHtml = '';
if (isProduction) {
  templateHtml = await fs.readFile(path.join(__dirname, '../frontend/dist/client/index.html'), 'utf-8');
}

let vite;
if (!isProduction) {
  const { createServer } = await import('vite');
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
    root: path.join(__dirname, '../frontend'),
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import('compression')).default;
  const sirv = (await import('sirv')).default;
  app.use(compression());
  app.use(base, sirv(path.join(__dirname, '../frontend/dist/client'), { extensions: [] }));
}

// SSR middleware (must be last)
app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '') || '/';
    let template;
    let render;
    if (!isProduction) {
      template = await fs.readFile(path.join(__dirname, '../frontend/index.html'), 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render;
    } else {
      template = templateHtml;
      render = (await import(path.join(__dirname, '../frontend/dist/server/entry-server.js'))).render;
    }
    const rendered = await render(url);
    const html = template
      .replace(
        '<!--app-head-->',
        `\n${rendered.helmet.title}\n${rendered.helmet.meta}\n${rendered.helmet.link}\n${rendered.helmet.script}\n`
      )
      .replace('<!--app-html-->', rendered.html)
      .replace('<!--server-data-->', `<script>window.__SERVER_DATA__ = ${JSON.stringify(rendered.serverData || {})}</script>`);
    res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
  } catch (e) {
    vite?.ssrFixStacktrace?.(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});
const PORT = process.env.PORT || 9000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT} in dev mode`);
});
