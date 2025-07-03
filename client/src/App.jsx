// client/src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Items from './pages/Items';
import Variants from './pages/Variants';
import Inventory from './pages/Inventory';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shopify/products" element={<Products />} />
        <Route path="/shopify/variants" element={<Variants />} />
        <Route path="/shopify/inventory" element={<Inventory />} />
        <Route path="/bc/items" element={<Items />} />
      </Routes>
    </>
  );
}



export default App;
