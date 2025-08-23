import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/root-layout/root-layout';
import NotFoundPage from '../components/not-found-page/not-found-page';
import Home from '../components/home/home.tsx';

export const routesConfig = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [{ index: true, element: <Home /> }],
  },
];

const routes = createBrowserRouter(routesConfig);
export default routes;
