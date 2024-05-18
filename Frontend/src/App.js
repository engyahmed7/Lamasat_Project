import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';

import 'react-toastify/dist/ReactToastify.css';
import GetOffer from './pages/GetOffer';
import { ToastContainer } from 'react-toastify';
import About from './pages/About';
import Login from './pages/admin/Login';
import HomeAdmin from './pages/admin/HomeAdmin';
import AddAdmin from './pages/admin/AddAdmin';
import AddProject from './pages/admin/AddProject';
import SingleProject from './pages/SingleProject';
import { hasCookie } from 'cookies-next';
import Projects from './pages/admin/Projects';
import Admins from './pages/admin/Admins';
import AuthCallback from './components/AuthCallback';
import EditProject from './pages/admin/EditProject';

function App() {
  const token = hasCookie('access_token');

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={1000}
      />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/project/:id"
          element={<SingleProject />}
        />
        <Route
          path="/get-offer"
          element={<GetOffer />}
        />
        <Route
          path="/about"
          element={<About />}
        />
        {/* Admin Routes */}
        <Route
          path="/auth/callback"
          element={<AuthCallback />}
        />
        <Route
          path="/admin/login"
          element={token ? <Navigate to="/admin" /> : <Login />}
        />
        <Route
          path="/admin/"
          element={token ? <HomeAdmin /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/projects"
          element={token ? <Projects /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/admins"
          element={token ? <Admins /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/add-admin"
          element={token ? <AddAdmin /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/add-project"
          element={token ? <AddProject /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/edit-project/:id"
          element={token ? <EditProject /> : <Navigate to="/" />}
        />
        <Route
          path="/*"
          element={<Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
