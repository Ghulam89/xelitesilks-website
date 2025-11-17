
import { useLocation, useRoutes } from 'react-router-dom';
import WebsiteRoutes from './routes/WebsiteRoutes';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer/Footer';
import TopNav from './components/Header/TopNav';
import { useEffect } from 'react';
import Navbar from './components/Header/Navbar';

function App({ serverData, CategoryProducts }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const routes = WebsiteRoutes({ serverData, CategoryProducts });

  const element = useRoutes(routes);

  return (
    <>
      <ToastContainer />
       {/* hello world */}
      {/* <TopNav /> */}
      {/* <Navbar /> */}

      {element}
      {/* <Footer />  */}
    </>
  );
}


export default App;