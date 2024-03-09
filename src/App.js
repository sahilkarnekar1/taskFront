import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Signup from './components/Signup';
import Signin from './components/Signin';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

function App() {
  const [searchQuery, setSearchQuery] = useState(''); // Step 1
  return (
    <Router>
      <div>
        <Navbar onSearch={setSearchQuery} />
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home searchQuery={searchQuery} /></ProtectedRoute>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
