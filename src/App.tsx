import router from './router';
import { RouterProvider } from 'react-router-dom';
import HeaderBar from './components/HeaderBar/HeaderBar';
import NavigationBar from './components/NavigationBar/NavigationBar';
import { Helmet } from 'react-helmet-async';
function App() {
  return (
    <div className="container text-lg font-medium">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
