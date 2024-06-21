import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Travel from './components/Travel/Travel';
import Aid from './components/Aid/Aid';
import LoginSignup from './components/LoginSignup/LoginSignup';
import Home from './components/Home/Home';
import Ghar from './components/SDG/Ghar';
import ProductsPage from './components/Material/Products';
import AppliancesPage from './components/HomeAppliances/Appliances';
import AcPage from './components/HomeAppliances/Ac';
import HeaterPage from './components/HomeAppliances/Heater';
import WaterHeaterPage from './components/HomeAppliances/Water-heater';
import LightingPage from './components/HomeAppliances/Lighting';
import MaterialsPage from './components/Material/MaterialsPage';
import Game from './components/Game/Game';
import ProtectedRoute from './ProtectedRoute'; 
import GameOfLife from './components/Game/GameOfLife';
import Simulation from './components/Schelling/Simulation';
import Profile from './components/Profile/Profile'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<LoginSignup />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path='/conway' element={<Game />} />
        <Route path='schseg' element={<Simulation />} />
        <Route path='/profile' element={<Profile />} />

        {/* Protected routes */}
        <Route path="/sdg" element={<ProtectedRoute element={<Ghar />} />} />
        <Route path="/travel" element={<ProtectedRoute element={<Travel />} />} />
        <Route path="/aid" element={<ProtectedRoute element={<Aid />} />} />
        <Route path="/material" element={<ProtectedRoute element={<MaterialsPage />} />} />
        <Route path="/home-appliances" element={<ProtectedRoute element={<AppliancesPage />} />} />
        <Route path="/appliances" element={<ProtectedRoute element={<AppliancesPage />} />} />
        <Route path="/ac" element={<ProtectedRoute element={<AcPage />} />} />
        <Route path="/heater" element={<ProtectedRoute element={<HeaterPage />} />} />
        <Route path="/water-heater" element={<ProtectedRoute element={<WaterHeaterPage />} />} />
        <Route path="/lighting" element={<ProtectedRoute element={<LightingPage />} />} />
        <Route path="/products" element={<ProtectedRoute element={<ProductsPage />} />} />
        {/* <Route path="/conway" element={<ProtectedRoute element={<Game />} />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
