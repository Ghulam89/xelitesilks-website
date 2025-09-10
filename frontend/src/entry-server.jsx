import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'

import { HelmetProvider } from 'react-helmet-async'
import axios from 'axios'
import { BaseUrl } from './utils/BaseUrl'
import { Provider } from 'react-redux'
import { store } from './store/store'

export async function render(url) {
  const normalizedUrl = url.startsWith('/') ? url : `/${url}`;
  const helmetContext = {};
  let serverData = null;
  let CategoryProducts = null;
  const cleanUrl = normalizedUrl.endsWith('/')
    ? normalizedUrl.slice(0, -1)
    : normalizedUrl;

  // Remove query parameters
  const baseUrl = cleanUrl.split('?')[0];
  try {
    if (baseUrl.startsWith('/category/')) {
      const slug = baseUrl.split('/')[2];
      const response = await axios.get(`${BaseUrl}/brands/get?slug=${slug}`);
      serverData = response?.data?.data;

    } else if (baseUrl.startsWith('/sub-category/')) {
      const slug = baseUrl.split('/')[2];
      const response = await axios.get(`${BaseUrl}/category/get?slug=${slug}`);
      const response2 = await axios.get(  `${BaseUrl}/products/categoryProducts/${response?.data?.data?._id}`);
      CategoryProducts = response2?.data?.data;
      serverData = response?.data?.data;
    } else if (baseUrl.split('/').length === 2 && baseUrl !== '/') {
      const slug = baseUrl.split('/')[1];
      const response = await axios.get(`${BaseUrl}/products/get?slug=${slug}`);
      serverData = response?.data?.data;
    } else if (baseUrl.startsWith('/blog/')) {
      const slug = baseUrl.split('/')[2];
      const response = await axios.get(`${BaseUrl}/blog/get?slug=${slug}`);
      serverData = response?.data?.data;
    }
  } catch (err) {
    helmetContext.helmet = {
      meta: { toString: () => '<meta name="robots" content="noindex" />' }
    };
  }
  const appHtml = renderToString(
    <>
    <HelmetProvider context={helmetContext}>
      <Provider store={store}>
        <StaticRouter location={normalizedUrl}>
          <App serverData={serverData} CategoryProducts={CategoryProducts} />
        </StaticRouter>
      </Provider>
    </HelmetProvider>
  </>
  );
  const { helmet } = helmetContext

  return {
    html: appHtml,
    helmet: {
      title: helmet?.title?.toString() || '',
      meta: helmet?.meta?.toString() || '',
      link: helmet?.link?.toString() || '',
      script: helmet?.script?.toString() || '',
    },
    
  };
}