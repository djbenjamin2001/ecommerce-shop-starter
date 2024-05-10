import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Checkout from './pages/Checkoutpage';
import SupplierPage from './pages/Supplierpage';
import SupplierDetails from './pages/Supplierdetails';
import ContractsPage from './pages/ContractPage'; // Make sure the path is correct
import ClientPage from './pages/Clientpage';
import ClientDetails from './pages/ClientDetails';
import VideoGuide from './pages/Videoguidepage';
import Homepage from './pages/ClientHomepage';
import ProfilePage from './pages/Profilepage';
const App = () => {
  return (
    <Router>
      <div className='overflow-hidden flex flex-col min-h-screen'>
        <Header />
        <div className='flex-grow'>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/webshop' element={<Home />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/product/:id' element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/supplierpage" element={<SupplierPage />} />
            <Route path="/orders/:id" element={<SupplierDetails />} />
            <Route path="/contracts" element={<ContractsPage  />} />
            <Route path="/video" element={<VideoGuide  />} />
            <Route path="/clientpage" element={<ClientPage  />} />
            <Route path="/orders/:id" element={<ClientDetails />} />
          </Routes>
        </div>
        <Sidebar />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
