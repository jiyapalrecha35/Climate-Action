import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MaterialNavbar from './Nav';
import ProductsPage from './Products.js';
import MaterialsPage from './MaterialsPage.js';

function App() {
  return (
    <Router>
      <div>
        <MaterialNavbar />
        <Routes>
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/materials" element={<MaterialsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
